<template>
  <div id="front">
    <!-- <div class="swiper-carouse">
      <swiper :options="swiperOption" class="swiper-container clearFloat" ref="mySwiper">
        slides
        <swiper-slide class="swiper-item" v-for="(item, index) of banners" :key="index">
          <img class="swiper-img" :src="item" alt="" />
        </swiper-slide>
        Optional controls ,显示小点
        <div class="swiper-pagination" slot="pagination" v-if="banners.length > 1"></div>
        左右切换
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div> -->
    <div class="bg-front">

    </div>
    <div class="app-main">
      <commonMain></commonMain>
    </div>
  </div>
</template>
<script>
  import commonMain from '@/components/front/main'
  export default {
    name: 'App',
    components: {
      commonMain
    },
    data() {
      return {
        // banners: ['/static/images/8.jpg', '/static/images/9.jpg', '/static/images/11.jpg', '/static/images/12.jpg'],
        // swiperOption: {
        //   // 参数选项,显示小点
        //   pagination: ".swiper-pagination",
        //   paginationClickable: true,
        //   //修改swiper自己或子元素时，自动初始化swiper 
        //   observer: true,
        //   //修改swiper的父元素时，自动初始化swiper 
        //   observeParents: true,
        //   //循环
        //   loop: true,
        //   //每张播放时长3秒，自动播放 (官方已经将autoplay单独的分离了出来，需要单独引入)
        //   autoplay: {
        //     disableOnInteraction: false,
        //     delay: 2000
        //   },
        //   // 用户操作swiper之后，是否禁止autoplay
        //   autoplayDisableOnInteraction: false,
        //   //滑动速度
        //   speed: 1000,
        //   // delay:1000
        //   prevButton: ".swiper-button-prev",
        //   nextButton: ".swiper-button-next",
        // }
      }
    },

    computed: {
      swiper() {
        // return this.$refs.mySwiper.swiper
      }
    },

    mounted() {
      // this.swiper.slideTo(3, 1000, true)
    }
  }

</script>
<style>
  /* #front{
   background-color: #2c3e50; 
} */
  .bg-front {
    background: url('/static/images/personal/boy.png') top center no-repeat;
    background-size: cover;
    background-size: cover;
    width: 100%;
    height: 30rem;
  }

</style>
