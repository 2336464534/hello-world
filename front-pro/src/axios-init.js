
import axios from 'axios'
import {Notification} from 'element-ui'
import router from './router'

const config = {
  BASE_HOST: '/api/',
  TOKEN_HOST: '/api/token/'
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("token");
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      console.log(response)
      if(response.data.code === 0){
        Notification.error({
          message: response.data.data && response.data.data.errMsg
        })
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status === 401) {
      Notification.warning({
        message: "登陆信息已过期，请重新登陆！"
      })
      router.push({
        path:'/login'
      })
    }else{
      if(error.response.status === 500){
        Notification.error({
          message: "服务器内部错误，无法完成请求！"
        })
      }else if(error.response.status === 504){
        Notification.error({
          message: "获取服务器数据超时！"
        })
      }
    }
  }
)

export default axios