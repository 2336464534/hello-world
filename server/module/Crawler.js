
const originRequest = require('request')
const iconv = require('iconv-lite')
const cherrio = require('cheerio')

function requestTxt(uri, callback) {
  const option = {
    encoding: null
  }
  originRequest(uri, option, callback)
}

function handleCrawer(request, response) {
  const { url, method, headers } = request
  requestTxt(`https://www.81zw.com/book/47470/`, function (err, res, body) {
    const $ = cherrio.load(body);
    const arrs = []
    const arr = $('#list dl').children('dd').find('a').map((i, v) => {
      arrs.push($(v).text().concat(':', $(v).attr('href')))
    })
    const ids = arrs.map(v => v.split('/')[3].split('.')[0])
    const curr = url.split('=')[1]

    const reqUrl = `https://www.81zw.com/book/47470/${ids[curr]}.html`;
    requestTxt(reqUrl, function (err, res, body) {
      const $ = cherrio.load(body);
      const title = $(".bookname h1").text()
      const content = $("#content").text()
      response.writeHead(200, {
        'Content-Type': 'application/json'
      })
      // : ''.concat('=============', title, '=============', content)
      response.end(JSON.stringify({
        title: title,
        content: content
      }))
    })
  })
}

module.exports = {
  handleCrawer
}
