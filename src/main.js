// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vuex from 'vuex'
import router from './router'

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

// makedown编辑器
import mavonEditor from 'mavon-editor';

//文件上传组件
import uploader from 'vue-simple-uploader'
//qs.stringify()将对象 序列化成URL的形式，以&进行拼接
import qs from 'qs'


//全局为axios添加request和response的拦截器。用于jwt token验证
import http from '../http'

// alibaba 字体
import './assets/fonts/iconfont.css';

// import VModal from 'vue-js-modal'

Vue.config.productionTip = false

// Vue.component('paginate', Paginate)
//使用插件
Vue.use(vuex)
Vue.use(vueSwiper)  
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
Vue.use(uploader)
Vue.use(qs)

// Vue.use(VModal)

// 配置axios请求基本地址
// axios.defaults.baseURL = 'http://localhost:8021'
//前后端分离 跨域 sessionid保持一致

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // * 对于需要auth的路径
      // * 没有token信息，redirect to login
      if (!localStorage.token) {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
})


const store = new vuex.Store({
  state: {
    tittle: "文章",
    count: 0
  },
  mutations:{
      increment(state){
        state.count ++
      }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  router,
  template: '<App/>'
})
