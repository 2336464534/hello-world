<template>
<div>
  <label for="loginName">
  </label>
  <input type="text" id="loginName" placeholder="输入用户名" v-model="name" />
  <label for="loginPass">
  </label>
  <input type="password" id="loginPass" placeholder="输入密码" v-model="pass" />
  <button @click="handleLogin">登陆</button>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      name: 'ice',
      pass: '123'
    }
  },
  methods: {
    handleLogin() {
      console.log(this.name, this.pass)
    }
  },
};
</script>
