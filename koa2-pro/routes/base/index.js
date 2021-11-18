const router = require('koa-router')()
const sign = require('../../controller/wx/index')

// router.prefix('/users')

router.get('/base/demo', async (ctx, next) => {
//   ctx.body = {
//     code: 1,
//     data: {
//       name: 'test'
//     }
//   }
  try {
    //获取当前url
    let url =
      ctx.request.protocol + '://' + ctx.request.host + ctx.request.originalUrl;
    if (ctx.query.url) {
      url = ctx.query.url;
    }
    ctx.body = await sign(url);
  } catch (e) {
    console.log(e);
  }
  await next();
})

module.exports = router
