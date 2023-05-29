import commonFront from '@/components/front';
import publishBlog from '@/components/publishBlog/publishBlog'
import personalDocManager from '@/components/personalDocManager.vue'
import login from '@/components/login/login.vue'
import leaveMessage from '@/components/leaveMessage/leaveMessage';
import blogDetail from '@/components/front/blogDetail/blogDetail';
import message from '@/components/message/message';
import uploader from '@/components/upload/upload.vue';

let routes = [{
  path: '/',
  name: '首页',
  component: commonFront,
  meta: {
    nonRequiresAuth: true
  }
}, {
  path: '/login',
  name: '登陆',
  component: login,
  meta: {
    nonRequiresAuth: true
  }
}, {
  path: '/front',
  name: '首页',
  component: commonFront,
  meta: {
    nonRequiresAuth: true
  }
},
  {
    path: '/publishBlog',
    name: '发布文章',
    component: publishBlog,
  },
  {
    path: '/blogDetail/:articleId',
    name: '文章详细',
    component: blogDetail
  },
  {
    path: '/leaveMessage',
    name: '留言',
    component: leaveMessage
  },
  {
    path: '/documentSystem',
    name: '文档系统',
    component: personalDocManager
  },
  {
    path: '/login',
    name: '登陆',
    component: login
  },
  {
    path: '/message',
    name: '信息',
    component: message,
  },
  {
    path: '/upload',
    name: '上传',
    component: uploader
  },
]

export default {
  routes
}
