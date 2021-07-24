const router = require('koa-router')()
const query = require('../model/index.js')

// router.prefix('/users')

router.get('/base/skill/readAll', async (ctx, next) => {
  const res = await query(`SELECT * FROM user`)
  ctx.body = {
    code: 1,
    data: {
      res
    }
  }
})

module.exports = router
