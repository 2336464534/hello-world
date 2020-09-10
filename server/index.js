


const http = require('http')
const hostname = '0.0.0.0';
const port = 3000;
const fs = require('fs')
const {handleCrawer} = require('./module/Crawler')

const server = http.createServer((request, response) => {
  const { url, method, headers } = request
  if (request.url === '/favicon.ico') { return } else if (url === '/' && method === 'GET') {
    // 静态页面服务
    fs.readFile('index.html', (err, data) => {
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    // Ajax服务
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.end(JSON.stringify({
      name: 'ice'
    }))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // 图片文件服务
    fs.createReadStream('./' + url).pipe(response)
  } else if (method === 'GET' && url.indexOf('/txt')>-1) {
    handleCrawer(request, response)
  }

})
server.listen(port, hostname)