<template>

  <div class="header" :class="{'header-scrolled':scrollFlag}">
    <div class="header-enditCenter">
      <!-- 自定制logo -->
      <div class="header-logo" :class="{'header-logo-scrolled':scrollFlag}">
        <span class="header-logo-icon">
          <!-- <img src="/static/images/page_header.jpg"/> -->
        </span>
        <span class="text">
          small hua
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
          <router-link to="/proposal">反馈建议</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/about">关于</router-link>
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

</style>
