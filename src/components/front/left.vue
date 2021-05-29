<template>
  <div id="front-left">
    <div class="left article-list">
      <div class="article" v-for="(item,key) in list" ::key="key">
        <router-link :to="{ name: 'blogDetail', params: { articleId: item.id }}">
          <div class="datebg">
            <span class="day">{{item.date}}</span>
            <span>{{item.month}}月</span>
            <span>{{item.year}}</span>
          </div>

          <h2 class="article-title">
            {{item.title}}
          </h2>
          <div class="article-lable">
            <label>标签：</label>
            <span class="article-lable-type" v-for="item1 in item.labels">
              <dt>{{item1}}</dt>
            </span>
          </div>
          <div class="content" v-html="item.content"></div>
          <div class="bottom">
            <h3 class="cretime">{{item.creTime | dateStr('YYYY-MM-DD')}}</h3>
            <h3 class="comment">42条评论</h3>
            <h3 class="view">{{item.viewNum || 0}}次阅读</h3>
            <h3 class="like">{{item.likeNum || 0}}人点赞</h3>
          </div>
        </router-link>
      </div>
    </div>
    <!-- layout="total, sizes, prev, pager, next, jumper" -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[5,10, 20, 50]" :page-size="pageSize" :pager-count="5"
        layout="total,sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    dateFormat
  } from '../util/dateUtil'

  export default {
    name: "left",
    data() {
      return {
        pageSize: 10,
        list: [],
        currentPage: 1,
        totalPage: 1,
        totalCount: 2
      }
    },
    filters:{
      dateStr(value){
        return dateFormat(value);
      }
    },
    mounted() {
      this.initArticel(this.pageSize, this.currentPage);
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.initArticel(val, 1)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.initArticel(this.pageSize, val)
      },
      initArticel(n1, n2) {
        var _that = this
        let baseParam = {
          "page": n2,
          "pageSize": n1,
        }
        this.axios
          .post('/front/articleController/articles', baseParam)
          .then((response) => {
            this.list = response.list
            this.totalCount = response.total
          }).catch(error => {
            console.log(error)
          })
      }
    },
  }

</script>
<style scoped>
  @import url("../../../static/css/left.css");

</style>
