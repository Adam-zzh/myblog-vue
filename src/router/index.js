import vue from 'vue'
import vueRouter from 'vue-router'
import commonFront from '@/components/front';
import publishBlog from '@/components/publishBlog/publishBlog'
import personalDocManager from '@/components/personalDocManager.vue'
import login from '@/components/login/login.vue'
import leaveMessage from '@/components/leaveMessage/leaveMessage';
import blogDetail from '@/components/front/blogDetail/blogDetail';

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
      path: '/blogDetail',
      name: 'blogDetail',
      component: blogDetail
    },
    {
      path: '/leaveMessage',
      name: 'leaveMessage',
      component: leaveMessage
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
