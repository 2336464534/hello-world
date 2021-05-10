
const axios = require('axios')
const querystring = require('querystring')
const router = require('koa-router')()
const query = require('../model/index.js')
const secret = require('../config/default.js')

const config = {
    client_id: '4265ac98f387fb8aa66d',
    client_secret: '0b603e70f8618be020ba680841ee6cf5559bd2ce'
}

router.get('/github/login', async (ctx) => {
    var dataStr = (new Date()).valueOf();
    //重定向到认证接口,并配置参数
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;

    //转发到授权服务器
    ctx.redirect(path);
})
router.get('/github/callback', async (ctx) => {
    console.log('callback..')
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    let res = await axios.post('https://github.com/login/oauth/access_token', params)
    const access_token = querystring.parse(res.data).access_token
    // res = await axios.get('https://api.github.com/user?access_token=' + access_token, {headers:{Authorization:'token '+access_token}})
    res = await axios.get('https://api.github.com/user', { headers: { Authorization: 'token ' + access_token } })
    const value = `"${res.data.name}","123456", "${res.data.email}","${res.data.html_url}","${res.data.id}","${res.data.avatar_url}" `;
    const prev = `\`name\`, \`password\`, \`sgithublinkemail\`, \`sgithublinkurl\`, \`iguthublinkid\`,\`avatar_url\``;
    await query(`INSERT INTO user ( ${prev} ) VALUES (${value})`)
    ctx.redirect(`http://localhost:8080/?clientid=${res.data.id}`)
})



module.exports = router