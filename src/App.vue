<template>
  <div id="app">
   <top></top>
    <transition>
        <router-view class="panel"></router-view>
    </transition>
    <bottom></bottom>
  </div>
</template>

<script>
  import top from '@/components/common/header';
  import bottom from '@/components/common/footer';

  export default {
    name: 'App',
    components: {
      'top': top,
      'bottom': bottom
    },
    data() {
      return {
        login_isShow: true
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

<style lang="scss">
  @import "static/css/common.scss";
</style>
