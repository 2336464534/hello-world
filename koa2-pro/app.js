const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const redisStore = require('koa-redis') //redis存储
const redis = require('redis')

const jwt = require('jsonwebtoken'); // token
const jwtAuth = require('koa-jwt') // 验证token

const redisClient = redis.createClient(6379, '121.4.246.84')
// const redisClient = redis.createClient(6379, 'localhost')
// const redisClient = redis.createClient('redis://47.102.143.107:6379', { auth_pass: '123456' })
const wrapper = require('co-redis') // promise版
const client = wrapper(redisClient)

const index = require('./routes/index')
const users = require('./routes/users')
const oauth = require('./routes/oauth')
const statistics = require('./routes/statistics')

// error handler
onerror(app)

// session 加密
app.keys = ['some secret']
// 配置项
const SESS_CONFIG = {
  key: 'ice:sess',
  maxAge: 86400000,
  httpOnly: true, // 仅服务器可以修改
  signed: true, // 签名
  store: redisStore({ redisClient }), // 存储方式
}
app.use(session(SESS_CONFIG, app))
// redis 客户端 
app.use(async (ctx, next) => {
  const keys = await client.keys('*')
  keys.forEach(async key => {
    // console.log(await client.get(key), '------')
  });
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') return
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  // ctx.body = `第${n}次访问`
  await next()
  console.log(ctx.session)
})

// session鉴权
// app.use(async (ctx, next) => {
//   if (ctx.url.indexOf('login') > -1) {
//     await next()
//   } else {
//     if (!ctx.session.userInfo) {
//       ctx.body = {
//         message: '登陆失败'
//       }
//     } else {
//       await next()
//     }
//   }
// })

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(oauth.routes(), oauth.allowedMethods())
app.use(statistics.routes(), statistics.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
