const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const koaBody = require('koa-body');
const static = require('koa-static');

var join = require('path').join;

const app = new Koa();

/* 
  koa-body 对应的API及使用 看这篇文章 http://www.ptbird.cn/koa-body.html
  或者看 github上的官网 https://github.com/dlau/koa-body
*/
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
        multipart: true // 是否支持 multipart-formdate 的表单
    }
}));

const uploadUrl = "http://localhost:9000/static/upload";
// 上传文件
router.post('/upload', (ctx) => {

    var file = ctx.request.files.file;
    console.log(ctx.request);
    // 读取文件流
    var fileReader = fs.createReadStream(ctx.request.files.file.path);
    console.log(fileReader);
    console.log(process.cwd())
    const filePath = path.join(__dirname, '../public/upload/');
    // 组装成绝对路径
    const fileResource = filePath + `${file.name}`;

    const writeStream = fs.createWriteStream(fileResource);
    // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
    if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, (err) => {
            if (err) {
                throw new Error(err);
            } else {
                fileReader.pipe(writeStream);
                ctx.body = {
                    // url: uploadUrl + `/${file.name}`,
                    code: 0,
                    message: '上传成功'
                };
            }
        });
    } else {
        fileReader.pipe(writeStream);
        ctx.body = {
            // url: uploadUrl + `/${file.name}`,
            code: 0,
            message: '上传成功'
        };
    }
});

router.get('/getUploadList', async ctx=>{
    const res = await getJsonFiles(path.join(__dirname, '../public/upload'))
    // const res = await getJsonFiles('../public/upload')
    ctx.body = res
})

function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(pth){
        let files = fs.readdirSync(pth);
        files.forEach(function (item, index) {
            let fPath = join(pth,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    console.log(jsonFiles);
    const replacepath = path.join(__dirname, '../public')
    return jsonFiles.map(v=>v.replace(replacepath, ''))
}
module.exports = router