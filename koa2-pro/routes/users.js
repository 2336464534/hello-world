const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', async (ctx, next) => {
  console.log(ctx,'111111')
  // const res = await query('SELECT * FROM user')
  console.log(res)
  const res = '123'
  ctx.body = {res}
})

module.exports = router
