import Vue from "vue"
import Router from "vue-router"
import store from '../store/index'
import routes from '../router'

Vue.use(Router)
let router = new Router({
  routes,
  mode: 'history',
  // 全局配置激活路由的class类名，处与活跃（动态）就会用上这个类名
  linkActiveClass: 'active'
})

// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
if (localStorage.getItem("token")) {
  store.commit("login/setToken", localStorage.getItem("token"));
  // this.$store.dispatch('login/getToken');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.nonRequiresAuth)) {
    next();
    return;
  }
  if (!localStorage.token) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
    /*// 没有token就调用后端接口，跳转地址
    getAddress().then((res) => {
      if (res.data.code === 200) {
        location.href = res.data.data.redirectUri
      }
    })*/
  } else {
    next()
  }
})
export default router
