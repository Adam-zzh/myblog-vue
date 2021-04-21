<template>
  <div id="app">
    <!-- <commonHeader></commonHeader> -->

    <!-- <commonFront></commonFront>
    <router-view>
    </router-view> -->

    <publishBlog></publishBlog>
    <!-- <commonFooter></commonFooter> -->
  </div>
</template>

<script>
  import commonHeader from '@/components/common/header';
  import commonFooter from '@/components/common/footer';
  import commonFront from '@/components/front';
  import publishBlog from '@/components/publishBlog/publishBlog'

  export default {
    name: 'App',
    components: {
      'commonHeader': commonHeader,
      'commonFooter': commonFooter,
      'commonFront': commonFront,
      'publishBlog': publishBlog,
    },
    data() {
      return {
      }
    },

    computed: {
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

</script>

<style>
  @import "../static/css/common.css";
  @import url('./common/font/font.css');

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

</style>
