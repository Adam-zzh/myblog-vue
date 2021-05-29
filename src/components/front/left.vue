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
          <div class="content">为了方便大家查看进度，我创建了一个看板方便大家查看 看板链接:开发进度 | Trello 简单介绍
            方便大家查看进度，我创建了一个看板方便大家查看 看板链接:开发进度 | Trello 简单介绍方便大家查看进度，我创建了一个看板方便大家查看 看板链接:开发进度 | Trello 简单介绍 </div>
          <div class="bottom">
            <h3 class="cretime">2021-03-08</h3>
            <h3 class="comment">42条评论</h3>
            <h3 class="view">1000次阅读</h3>
            <h3 class="like">10人点赞</h3>
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
