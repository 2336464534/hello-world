<template>
<div>
  <label for="loginName">
  </label>
  <input type="text" id="loginName" placeholder="输入用户名" v-model="name" />
  <label for="loginPass">
  </label>
  <input type="password" id="loginPass" placeholder="输入密码" v-model="pass" />
  <input type="text" placeholder="请输入验证码" v-model="captcha">
  <img :src="'/api/base/captcha?timeCode='+currDate" alt="" @click="getCurrDate" srcset="">
  <button @click="handleLogin">登陆</button>
  <button><a href="/api/github/login">github</a></button>
</div>
</template>

<script>
import axios from 'axios'
import {setCookie} from '../util'

export default {
  name: 'Login',
  data() {
    return {
      name: 'ice',
      pass: '123456',
      captcha: '',
      currDate: new Date().valueOf(),
    }
  },
  created() {
    this.axios.get('/api/base/captcha').then(res=>{
      console.log(res)
    })
  },
  methods: {
    getCurrDate(){
      this.currDate = new Date().valueOf()
    },
    handleLogin() {
      console.log(this.name, this.pass)
      axios
        .post(`/api/login`, {name: this.name, password: this.pass, captcha: this.captcha})
        .then((res) => res.data).then(res=>{
          if(res.code === 1){
            if(res.data.token){
              setCookie('token', res.data.token, 3)
              localStorage.setItem('token', res.data.token)
              this.$router.push('/')
            }
            // else {
            //   this.$message.error(`${res.data.errMsg}`);
            // }
          }else {
            this.currDate = new Date()
          }
        })
    }
  },
};
</script>
