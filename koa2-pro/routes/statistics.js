const router = require('koa-router')()


router.get('/statistics', function (ctx, next) {
    const n = ctx.session.count || 0
    ctx.body = `第${n}次访问`
})

module.exports = router