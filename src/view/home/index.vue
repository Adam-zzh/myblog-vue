<template>
  <div id="home">
    <div class="bg-front">
    </div>
    <div id="main">
      <div id="left">
        <div class="article-list">
          <div class="article" v-for="(item,key) in grid.list" ::key="key">
            <router-link :to="{ name: 'blogDetail', params: { articleId: item.id }}">
              <div class="dateTag">
                <span class="day">{{item.date}}</span>
                <span>{{item.month}}月</span>
                <span>{{item.year}}</span>
              </div>
              <h2 class="article-title">
                {{item.title}}
              </h2>
              <div class="article-label-list">
                <label>标签：</label>
                <span class="article-label" v-for="item1 in item.labels">
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
        <div class="pagination-custom">
          <el-pagination :page-size="grid.size" :total="grid.total" :current-page="grid.index"
                         :page-sizes="[10, 15, 20, 30]" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </div>
      </div>

      <div id="right">
        <div class="right-item">
          <dd>联系我</dd>
          <div class="right-item-content">
            <dl><a href="javascript:void(0)">微信</a></dl>
            <dl><a href="javascript:void(0)">QQ</a></dl>
          </div>
        </div>
        <div class="right-item">
          <dd>分类目录</dd>
          <div>
            <dl v-for="(item, index) in formData.types">
              <a href="javascript:void(0)" :class="searchParam.typeActiveIndex == index ? 'rightPanel-active':''"
                 @click="setActiveIndex('typeActiveIndex', index)">{{item}}</a>
            </dl>
          </div>
        </div>
        <div class="right-item">
          <dd>标签云集</dd>
          <div class="right-item-content">
            <dl v-for="(item, index) in formData.labels">
              <a href="javascript:void(0)" :class="searchParam.labelActiveIndex == index ? 'rightPanel-active':''"
                 @click="setActiveIndex('labelActiveIndex',index)">{{item}}</a>
            </dl>
          </div>
        </div>
        <div class="right-item">
          <dd>文章归档</dd>
          <div class="right-item-content">
            <el-date-picker v-model="searchParam.timeRange" type="datetimerange" align="center"
                            start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" :unlink-panels="true"
                            :default-time="['00:00:00', '23:59:59']" :style="{ width: '100%' }">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'home',
        components: {},
        data() {
            return {
                grid: {list: [], index: 1, size: 10, total: 0, query: {}},
                searchParam:{
                    typeActiveIndex: -1,
                    labelActiveIndex: -1,
                    timeRange:[]
                },
                formData:{types:['zzh'], labels:['pth']}
            }
        },
        computed: {},
        mounted() {
        },
        methods: {
            search(){

            },
            handleSizeChange(val) {
                // 分页控件触发
                this.grid.size = val;
                this.search();
            },
            handleCurrentChange(val) {
                // 分页控件触发
                this.grid.index = val;
                this.search();
            },
            setActiveIndex(prop, index){
                if (this.searchParam[prop] == index) {
                    this.searchParam[prop] = -1;
                } else {
                    this.searchParam[prop] = index;
                }
                this.search();
            },
        }
    }

</script>
<style lang="scss">
  @import "static/css/home.scss";

  .bg-front {
    background: url('/static/images/personal/boy.png') top center no-repeat;
    background-size: cover;
    background-size: cover;
    width: 100%;
    height: 30rem;
  }
</style>
