<template>
  <div id="blog-message">
    <div class="messages">
      <div class="nav">
        <el-radio-group v-model="type">
          <el-radio :label="0" @click.native="load(0)">评论</el-radio>
          <el-radio :label="1" @click.native="load(1)">留言</el-radio>
          <el-radio :label="2" @click.native="load(2)">点赞</el-radio>
          <el-radio :label="3" @click.native="load(3)">系统</el-radio>
        </el-radio-group>
      </div>
      <div class="infinite-list msg-labels" v-infinite-scroll="scrollLoad" style="overflow:auto">
        <div class="infinite-list-item msg-label" v-for="(item, index) of messages">
          <div class="redCycle" v-if="!item.ifRead"></div>
          <div class="left">
            <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg" class="userImg" />
          </div>
          <div class="right">
            <h3 class="title" v-html="item.title"></h3>
            <div class="content" v-html="item.content">
            </div>
            <h3 class="bottom">
              {{item.creTime | dateStr('YYYY-MM-DD')}}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    dateFormat
  } from '../util/dateUtil.js';

  export default {
    data() {
      return {
        type: 0,
        messages: [],
        page: 1,
        pageSize: 3
      }
    },
    filters: {
      dateStr(value) {
        return dateFormat(value);
      }
    },
    methods: {
      load(typeParam) {
        let that = this;
        let baseParam = {
          "page": this.page,
          "pageSize": this.pageSize
        }
        if(typeParam != undefined){
          this.type =  Number(typeParam)
        }else{
          this.type =  Number(this.$route.query.type || 0)
        }
        this.axios.post(`/front/messageController/messagesByType/${this.type}`, baseParam).then((response) => {
            this.messages = response.list;
          },
          (error) => {
            console.log(error);
          })
      },
      scrollLoad(){
        let baseParam = {
          "page": this.page,
          "pageSize": this.pageSize
        }
        this.axios.post(`/front/messageController/messagesByType/${this.type}`, baseParam).then((response) => {
            this.messages = response.list;
          },
          (error) => {
            console.log(error);
          })
      }
    },
    mounted() {
      this.load();
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
    background-color: #3c41e6e0 !important;
    margin-top: 20px;
    /* box-shadow: -3px 5px 5px #333; */
    box-shadow: -3px 2px 4px 0 #333;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
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
    margin: 0 40px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .msg-labels .msg-label .right {
    width: calc(100% - 40px);
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
    font-size: 18px;
    color: orange;
  }

  .msg-label .right .content {
    text-indent: 2rem;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, .1);
    padding: 10px;
    color: yellow;
  }
  .msg-label .right .title .msg-comment{
    color: orange;
  }

  .msg-label .right .bottom {
    font-size: 14px;
    color: burlywood;
  }

  .userImg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

</style>
