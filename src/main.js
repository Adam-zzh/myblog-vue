import Vue from 'vue'
import App from './App'
import vuex from 'vuex'
import vueSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mavonEditor from 'mavon-editor'; // makedown编辑器
import uploader from 'vue-simple-uploader'; //文件上传组件
import qs from 'qs'; //qs.stringify()将对象 序列化成URL的形式，以&进行拼接

import router from './setting/router'
import store from './store'

// alibaba 字体
import './assets/fonts/iconfont.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'
import 'github-markdown-css/github-markdown.css'

Vue.config.productionTip = false

//使用插件
Vue.use(vuex)
Vue.use(vueSwiper)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
Vue.use(uploader)
Vue.use(qs)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
