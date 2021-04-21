<template>
  <div id="front-left">
    <div class="left article-list">
      <div class="article">
        <div class="datebg">
          <span class="day">30</span>
          <span>4月</span>
          <span>2010</span>
        </div>

        <h2 class="article-title">
          如何测试 React Hooks ?
        </h2>
        <div class="article-lable">
          <span class="article-lable-type">
            <dt>标签:</dt>
            <dd>react</dd>
            <dd>js</dd>
            <dd>java</dd>
          </span>
          <span class="article-lable-comment">
            评论:
          </span>
        </div>
        <div class="article-content">
          我是内容......
        </div>
        <div class="article-footer">
          <a>
            <span class="article-footer-left">继续阅读:</span>
            <span class="article-footer-right">如何测试 React Hooks?</span>
          </a>
        </div>
      </div>

      <div class="article">
        <div class="datebg">
          <span class="day">30</span>
          <span>4月</span>
          <span>2010</span>
        </div>
        <h2 class="article-title">
          如何测试 React Hooks ?
        </h2>
        <div class="article-lable">
          <span class="article-lable-type">
            <dt>标签:</dt>
            <dd>react</dd>
            <dd>js</dd>
            <dd>java</dd>
          </span>
          <span class="article-lable-comment">
            评论:
          </span>
        </div>
        <div class="article-content">
          我是内容......
        </div>
        <div class="article-footer">
          <a>
            <span class="article-footer-left">继续阅读:</span>
            <span class="article-footer-right">如何测试 React Hooks?</span>
          </a>
        </div>
      </div>

      <div class="article">
        <div class="datebg">
          <span class="day">30</span>
          <span>4月</span>
          <span>2010</span>
        </div>
        <h2 class="article-title">
          如何测试 React Hooks ?
        </h2>
        <div class="article-lable">
          <span class="article-lable-type">
            <dt>标签:</dt>
            <dd>react</dd>
            <dd>js</dd>
            <dd>java</dd>
          </span>
          <span class="article-lable-comment">
            评论:
          </span>
        </div>
        <div class="article-content">
          我是内容......
        </div>
        <div class="article-footer">
          <a>
            <span class="article-footer-left">继续阅读:</span>
            <span class="article-footer-right">如何测试 React Hooks?</span>
          </a>
        </div>
      </div>
    </div>

    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 50]"
        :page-size="15"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: "left",
    data() {
      return {
        currentPage: 2
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }

</script>
<style scoped>
  @import url("../../../static/css/left.css");
</style>
