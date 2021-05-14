<template>
  <div>
    <article id="markdown-body" class="markdown-body" style="text-align:left" v-html="content"></article>
  </div>
</template>
<script>
  import 'github-markdown-css/github-markdown.css' //导入
  export default {
    name: 'MainContent',
    props: ['content'],
    data() {
      return {
      };
    },
  }

</script>
<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    /* max-width: 980px; */
    /* padding: 45px; */
    max-width: 98%;
    margin: 0 auto;
    box-shadow: 2px 4px 6px gray;
    padding-left: 20px;
    padding-right: 15px;
    padding-top: 40px;
    padding-bottom: 45px;
    margin-bottom: 100px
  }

  /* github使用的是这个   根据自己的进行调整 */
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 15px 30px;
  }

</style>
