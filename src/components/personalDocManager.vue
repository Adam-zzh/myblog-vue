<template>
  <div>
    <el-container>
      <el-aside :class="hideSideClass">
        <left @renderTitle="setTitle" v-show="!collapse"></left>
      </el-aside>
      <el-main style="position: relative;">
        <el-radio-group v-model="collapse" style="margin-bottom: 20px;">
          <i v-show="!collapse" class="el-icon-s-fold expandBtn" @click="changeState(true)"></i>
          <i v-show="collapse" class="el-icon-s-unfold" @click="changeState(false)"></i>
        </el-radio-group>
        <right :title="title"></right>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import docLeft from './document/left'
  import docRight from './document/right'

  export default {
    data() {
      return {
        collapse: false,
        title: "菩提花",
        hideSideClass:""
      }
    },
    components: {
      'left': docLeft,
      'right': docRight
    },
    methods: {
      setTitle(title) {
        this.title = title.label;
      },
      changeState(flag){
        this.collapse = flag;
        if(this.collapse){
            this.hideSideClass = "hideSideClass";
        }else{
            this.hideSideClass = "";
        }
      }
    },
  }

</script>
<style scoped>
  .el-radio-group {
    position: absolute;
    font-size: 20px;
    margin-left: 0;
    left: 2px;
    top: 0;
  }

  .el-aside {
    border-right: 1px solid #ccc;
    height: 100%;
    min-height: calc(100vh - 8.6rem) !important;
  }

  .hideSideClass{
      width: 0px !important;
  }
</style>
