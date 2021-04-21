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

import Axios from 'axios';
import './assets/fonts/iconfont.css';


Vue.config.productionTip = false

// Vue.component('paginate', Paginate)
//使用插件
Vue.use(vuex)
Vue.use(vueSwiper)  
Vue.use(ElementUI);


Vue.prototype.$ajax = Axios;

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
