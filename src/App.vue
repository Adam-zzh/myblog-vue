<template>
  <div id="app">
    <commonHeader></commonHeader>
    <!-- <commonHeader></commonHeader>
    <transition>
      <router-view class="myblog-center"></router-view>
    </transition>
    <commonFooter></commonFooter>
    <login :modelShow="login_isShow"></login> -->

    <blogDetail></blogDetail>
    <commonFooter></commonFooter>
   
  </div>
</template>

<script>
  import commonHeader from '@/components/common/header';
  import commonFooter from '@/components/common/footer';
  import login from '@/components/login/login';
  import blogDetail from '@/components/front/blogDetail/blogDetail';
  import publishBlog from '@/components/publishBlog/publishBlog';

  export default {
    name: 'App',
    components: {
      'commonHeader': commonHeader,
      'commonFooter': commonFooter,
      login,
      blogDetail,
      publishBlog
    },
    data() {
      return {
        login_isShow: false
      }
    },
    computed: {},
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

</script>


<style>
  @import "../static/css/common.css";
  @import url('./common/font/font.css');
  /* @import url('./assets/threejs/css/style.css'); */

  canvas {
    position: fixed;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    opacity: revert;
    -ms-scroll-snap-x: revert;
    aspect-ratio: auto 1500 / 1500;
  }
 

  /* 轮播图  */
  .swiper-carouse {
    height: 25rem;
    overflow: hidden;
    position: relative;
  }

  img.swiper-img {
    width: 100%;
  }

  .app-main {
    width: 100%;
    height: auto;
    /*控制子节点垂直居中 */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .clearfix::after {
    display: table;
    content: " ";
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .myblog-center {
    min-height: calc(100vh - 8.6rem);
  }

  canvas {
    position: fixed;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    opacity: revert;
    -ms-scroll-snap-x: revert;
  }

</style>
