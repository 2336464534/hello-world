<template>
  <div id="app">
    <el-container class="h100">
      <el-header style="padding: 0">
        <el-menu
          mode="horizontal"
          :collapse="isCollapse"
          @select="handleSelect"
          :default-active="defaultActive"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单</span>
            </template>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item-group title="其它">
              <el-menu-item index="/about" path="/about">小说爬虫 </el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">个人中心</template>
              <el-menu-item index="1-4-1">我的</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/config">
            <i class="el-icon-menu"></i>
            <span slot="title">系统管理</span>
          </el-menu-item>
        </el-menu>
        <el-dropdown @command="handleDropdown" style="position: absolute; right: 0; top: 18px;">
          <span style="margin-right: 15px; color: #fff;font-size: 16px;">登陆用户</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
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
  data() {
    return {
      isCollapse: false,
      defaultActive: location.pathname,
      hasToken: localStorage.getItem('token')
    };
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index);
    },
    handleDropdown(command) {
      switch (command) {
        case "info":
          break;
        case "loginout":
          localStorage.removeItem("token");
          this.$router.push({ path: "/login" });
          break;
      }
    },
  },
};
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
