<template>
  <div id="blog-message">
    <div class="messages">
      <div class="nav">
        <el-radio-group v-model="radio">
          <el-radio :label="0">评论</el-radio>
          <el-radio :label="1">留言</el-radio>
          <el-radio :label="2">点赞</el-radio>
          <el-radio :label="3">系统</el-radio>
        </el-radio-group>
      </div>
      <div class="infinite-list msg-labels" v-infinite-scroll="load" style="overflow:auto">
          <div class="infinite-list-item msg-label" v-for="i in count">
            <div class="redCycle" v-if="ifRead"></div>
            <div class="left">
              <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg" class="userImg" />
            </div>
            <div class="right">
              <h3 class="title">大帝评论了你的文章 zzh来拜访了</h3>
              <div class="content">
                你的作品数据较昨天有所变化，赶紧来创作者中心看一下；现在体验专栏新功能还有大额京东卡拿，
                点击查看：https://sourl.co/WrZWpx ；app用户请升级最新版本应用后在我的页面查看哟！
              </div>
              <h3 class="bottom">
                2021-05-06
              </h3>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        radio: 0,
        ifRead: 1,
        count: 5
      }
    },
    methods: {
      load() {
        // this.count += 2
      }
    },
  }

</script>
<style>
  #blog-message {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #blog-message .messages {
    width: 60%;
    height: calc(100vh - 8.6rem);
    /* box-shadow: -3px 5px 5px #888888; */
    border: 1px solid #333;
    padding: 10px 60px;
  }

  #blog-message .msg-labels::-webkit-scrollbar {
    display: none !important;
  }

  .msg-labels {
    /* margin: 20px 0; */
    height: calc(100% - 40px);
  }

  .msg-labels .msg-label {
    position: relative;
    width: 100%;
    height: 170px;
    min-height: 150px;
    max-height: 300px;
    background-color: #800080c4;
    margin-top: 20px;
    /* box-shadow: -3px 5px 5px #333; */
    box-shadow: -3px 2px 4px 0 #333;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }

  .msg-labels .msg-label .redCycle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 5px;
    top: 10px;
    left: 10px;
  }

  .msg-labels .msg-label .left {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .msg-labels .msg-label .right {
    padding: 10px 20px;
    padding-left: 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .msg-labels .msg-label h3 {
    margin: 0;
    padding: 0;
  }

  .msg-label .right .title {
    font-size: 20px;
  }

  .msg-label .right .content {
    text-indent: 2rem;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, .1);
    padding: 10px;
  }

  .msg-label .right .bottom {
    font-size: 14px;
  }

  .userImg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

</style>
