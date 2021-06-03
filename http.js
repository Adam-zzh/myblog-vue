import router from './src/router/index'
import axios from 'axios';

axios.defaults.withCredentials = true

// * http request 拦截器
axios.interceptors.request.use(
  config => {
    // * 判断是否存在token，如果存在的话，则每个http header都加上token
    // * token会在登录之后存储在本地
    if (localStorage.token) {
      config.headers["Authorization"] = `Bearer ${localStorage.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// * http response 拦截器
axios.interceptors.response.use(
  response => {
    let data = response.data;
    // * 如果code是401 表示token未认证(后端定义的错误码)
    // * 跳转到login
    if (data.code === 401) {
      console.log(this.$router)
      router.replace('/login')
    }else{
      return data;
    }
    return Promise.reject(data);
  },
  error => {
    return Promise.reject(error);
  });
