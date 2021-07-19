import vue from 'vue'
import vueRouter from 'vue-router'
import commonFront from '@/components/front';
import publishBlog from '@/components/publishBlog/publishBlog'
import personalDocManager from '@/components/personalDocManager.vue'
import login from '@/components/login/login.vue'
import leaveMessage from '@/components/leaveMessage/leaveMessage';
import blogDetail from '@/components/front/blogDetail/blogDetail';
import message from '@/components/message/message';
import uploader from '@/components/upload/upload.vue';

vue.use(vueRouter)

export default new vueRouter({
  routes: [{
      path: '/',
      component: commonFront
    }, {
      path: '/login',
      component: login
    },{
      path: '/front',
      name: 'front',
      component: commonFront
    },
    {
      path: '/publishBlog',
      name: 'publishBlog',
      component: publishBlog,
      meta: {
        requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/blogDetail/:articleId',
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
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: uploader
    },
  ]
})
