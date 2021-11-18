// const config = require('./config');
const got = require('got');
const sha1 = require('sha1');
 async function sign(url) {
  let sig = {},
    noncestr = 'noncestr',
    timestamp = Math.floor(Date.now() / 1000),
    jsapi_ticket;
  if (false && cache.get('ticket')) {
    jsapi_ticket = cache.get('ticket');
    sig = {
      appId: 'wxe6edda86422ada24',
      noncestr: noncestr,
      timestamp: timestamp,
      url: url,
      jsapi_ticket: jsapi_ticket,
      signature: sha1(
        'jsapi_ticket=' +
          jsapi_ticket +
          '&noncestr=' +
          noncestr +
          '&timestamp=' +
          timestamp +
          '&url=' +
          url
      ),
    };
  } else {
    // 获取 token
    let tokenRes = await got('https://api.weixin.qq.com/cgi-bin/token' +
        '?grant_type=' +
        'client_credential' +
        '&appid=' +
        'wxe6edda86422ada24' +
        '&secret=' +
        '49ed9a68d99d052fa6732590663565b4');
        console.log(tokenRes)

    tokenRes = JSON.parse(tokenRes.body);

    // 获取 ticket
    let ticketRes = await got('https://api.weixin.qq.com/cgi-bin/ticket/getticket' +
        '?access_token=' +
        tokenRes.access_token +
        '&type=jsapi');
    var ticketMap = JSON.parse(ticketRes.body);
    // 加入缓存
    // cache.put('ticket', ticketMap.ticket, config.cache_duration);
    sig = {
      appId: 'wxe6edda86422ada24', //config.appid,
      noncestr: noncestr,
      timestamp: timestamp,
      url: url,
      jsapi_ticket: ticketMap.ticket,
      signature: sha1(
        'jsapi_ticket=' +
          ticketMap.ticket +
          '&noncestr=' +
          noncestr +
          '&timestamp=' +
          timestamp +
          '&url=' +
          url
      ),
    };
  }
  return sig;
}

module.exports = sign