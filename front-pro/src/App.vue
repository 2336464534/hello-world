<template>
<div id="app">
  <el-container class="h100">
    <el-aside class="h100" style="background-color:#545c64">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>菜单</span>
          </template>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item-group title="其它">
            <el-menu-item index="/about" path="/about">小说爬虫
            </el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">个人中心</template>
            <el-menu-item index="1-4-1">我的</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">系统管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="h100">
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <router-view class="view three" name="login"></router-view>
</div>
</template>

<script>
export default {
  methods: {
    handleSelect(index, path) {
      console.log(index, path, this.$router.push(path))
      this.$router.push(index)
    }
  },
}
</script>

<style>
html,
body {
  position: relative;
  margin: 0;
  height: 100%;
}

.h100 {
  height: 100% !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
