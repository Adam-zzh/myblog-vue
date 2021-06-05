<template>

  <div class="header" :class="{'header-scrolled':scrollFlag}">
    <div class="header-enditCenter">
      <!-- 自定制logo -->
      <div class="header-logo" :class="{'header-logo-scrolled':scrollFlag}">
        <span class="header-logo-icon">
          <!-- <img src="/static/images/page_header.jpg"/> -->
        </span>
        <span class="text">
          菩提花
        </span>
      </div>

      <div class="menus_items">
        <div class="menus_item">
          <!-- 使用 router-link 组件来导航. -->
          <router-link to="/front" active-class="_active">首页</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/documentSystem">文档系统</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/leaveMessage">留言</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/about">关于</router-link>
        </div>
        <div class="menus_item userInfo">
          <div class="alarm">
            <i class="iconfont">&#xe6f3;</i>
            <div class="iconRight" v-html="unReadNum" v-if="unReadNum>0">
            </div>
          </div>
        </div>
        <div class="menus_item userInfo">
          <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "commonHeader",
    data() {
      return {
        scrollFlag: false,
        unReadNum: 5
      }
    },
    methods: {
      handleScroll() {
        let _this = this;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop);
        if (scrollTop) {
          _this.scrollFlag = true;
        } else {
          _this.scrollFlag = false;
        }
      }
    },

    computed: {
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    }

  }

</script>
<style scoped>
  @import "../../../static/css/header.css";

  .iconfont {
    font-size: 22px;
    color: #369;
  }

  .userInfo {
    width: 40px;
    height: 40px;
  }

  .userInfo:hover {
    background-color: #30313375;
  }

  .userInfo img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  /* 图片旋转 */
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .userInfo img:hover {
    animation: rotation 1.4s linear infinite;
  }

  /* 未读消息数 */
  .alarm {
    position: relative;
  }

  .iconRight {
    position: absolute;
    color: white;
    font-size: 14px;
    background-color: red;
    width: 20px;
    height: 20px;
    line-height: 20px;
    left: 80%;
    top: -12px;
    text-align: center;
    -webkit-border-radius: 24px;
    border-radius: 24px;
  }

</style>
