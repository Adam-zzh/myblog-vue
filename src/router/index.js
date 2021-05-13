import vue from 'vue'
import vueRouter from 'vue-router'
import commonFront from '@/components/front';
import publishBlog from '@/components/publishBlog/publishBlog'
import personalDocManager from '@/components/personalDocManager.vue'
import login from '@/components/login/login.vue'

vue.use(vueRouter)

export default new vueRouter({
  routes: [{
      path: '/',
      component: commonFront
    }, {
      path: '/front',
      name: 'front',
      component: commonFront
    },
    {
      path: '/publishBlog',
      name: 'publishBlog',
      component: publishBlog
    },
    {
      path: '/documentSystem',
      name: 'documentSystem',
      component: personalDocManager
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
