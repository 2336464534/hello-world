const router = require('koa-router')()
const query = require('../model/index.js')
const UUID = require('uuidjs')
const fs = require('fs')

const jwt = require('jsonwebtoken'); // token
const jwtAuth = require('koa-jwt') // 验证token
const secret = require('../config/default.js')

// const svgCaptcha = require('svg-captcha')
const svgCaptcha = require('svg-captcha')

router.post('/login', async (ctx, next) => {
  const { request: { body } } = ctx;
  
  const { name, password, captcha } = body
  console.log(captcha!=ctx.session.captcha)

  if(captcha != ctx.session.captcha) {
    ctx.body = {
      code: 0,
      data: {
        errMsg: `验证码错误！`
      }
    }
  }else {
    const res = await query(`SELECT * FROM user WHERE NAME='${name}'`)
    if (res.length) {
      if (password === res[0].password) {
        ctx.session.userinfo = res[0].id;
        // ctx.cookies.set('token', jwt.sign({
        //   data: res.id,
        //   exp: Math.floor(Date.now() / 1000 + 60 * 60)
        // }, secret), { maxAge: 720000 })
        ctx.body = {
          code: 1,
          data: {
            tokenKey: new Date().valueOf(),
            token: jwt.sign({
              data: res[0].id,
              exp: Math.floor(Date.now() / 1000 + 60 * 60), // ? JWT的过期时间
              iat: Math.floor(Date.now() / 1000) - 30, // ? JWT的签发时间
              // nbf: Date.now(), // ? JWT生效的开始时间
              // jti: UUID.generate()
            }, secret)
          }
        }
      } else {
        ctx.body = {
          code: 1,
          data: {
            errMsg: `密码错误！`
          }
        }
      }
    } else {
      ctx.body = {
        code: 0,
        data: {
          errMsg: `用户名错误！`
        }
      }
    }
  }
})

router.post('/loginout', async (ctx, next) => {
  delete ctx.session.userinfo
  ctx.cookies.set('cookie1', '', { signed: false, maxAge: 0 })
  ctx.body = {
    code: 1,
    data: {}
  }
})

router.get('/base/captcha', async(ctx, next)=>{
  const code = svgCaptcha.create({ 
    // 翻转颜色 
    inverse: false, 
    // 字体大小 
    fontSize: 36, 
    // 噪声线条数 
    noise: 2, 
    // 宽度 
    width: 80, 
    // 高度 
    height: 30, 
   })
   ctx.session["captcha"] = code.text.toLowerCase();
   ctx.set("Content-Type", 'image/svg+xml')
   ctx.body = code.data;
})

router.post('/token/user',
  // 鉴权(只依赖密钥)
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = {
      userinfo: ctx.state.user.data
    }
  })

router.get('/users', async (ctx, next) => {
  const res = await query('SELECT * FROM user')
  ctx.body = {
    data: res.map(v => ({ name: v.name, id: v.id })),
    userinfo: ctx.session.userinfo
  }
})

module.exports = router
