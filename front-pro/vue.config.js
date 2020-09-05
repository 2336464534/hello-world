module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 要代理的域名
        changeOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': '' // 这个是定义要访问的路径，名字随便写
        }
      }
    }
  },
  publicPath: '/ice/'
}