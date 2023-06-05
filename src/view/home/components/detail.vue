<template>
  <div id="detail">
    <div class="bg">
    </div>
    <div class="main">
      <div id="catalog" class="catalog" v-html="catalog">
      </div>
      <div class="article">
        <div class="title" v-html="article.title"></div>
        <div class="lineDescription">
          <h4 class="blog-date" v-html="article.date"></h4>
          <h4 class="blog-view">
            <label>创建时间：</label>
            <span class="viewNum">{{article.creTime | dateStr('YYYY-MM-DD')}}</span>
          </h4>
          <h4 class="blog-view">
            <label>浏览量：</label>
            <span class="viewNum" v-html="article.viewNum || 0"></span>
          </h4>
          <h4 class="blog-likes">
            <label>点赞数：{{article.likeNum || 0}}</label>
            <span class="likeNum" v-html="article.likeNum"></span>
          </h4>
          <h4 class="blog-tag">
            <label>标签：</label>
            <span class="tags">
              <li v-for="(item, index) in article.labels" :key="index">
                {{ item }}&nbsp;&nbsp;
              </li>
            </span>
          </h4>
          <h4 class="blog-type">
            <label>类别：</label>
            <span class="types">
              <li v-for="(item, index) in article.types" :key="index">
                {{ item }}&nbsp;&nbsp;
              </li>
            </span>
          </h4>
        </div>
        <!--markdown文本-->
        <div class="markdown-body">
          <article id="markdown-body" class="markdown-body" style="text-align:left" v-html="content"></article>
        </div>
      </div>
      <div class="sidebar">
        <div id="blogComment">
          <h4>{{totalComment}}条评论</h4>
          <div class="commentContents">
            <div class="commentContent" v-for="(item, index) in comments">
              <div class="outerComment" @click="setPidAndTargetId(item.id, item.sourceId, index+1)"
                   :class="activeClassIndex == index+1 ? 'activeClass':''">
                <div class="header">
                  <img :src="item.userIcon" class="comment-img" width="30px" height="30px">
                  <span class="userName firstFont" v-html="item.sourceName"></span>
                </div>
                <div class="content secondFont" v-html="item.content">
                </div>
              </div>
              <div class="innerComment" v-for="(item1, index1) in item.children" :key="index1"
                   @click="setPidAndTargetId(item1.id, item1.sourceId, ''+(index+1)+(index1+1))"
                   :class="activeClassIndex == ''+(index+1)+(index1+1) ? 'activeClass':''">
                <div class="header">
                  <img :src="item1.userIcon" class="comment-img" width="30px" height="30px">
                  <span class="userName thirdFont" v-html="item1.sourceName"></span>
                  <span class="toUser userName thirdFont" v-if="item1.targetName && item1.targetName!=item1.sourceName" style="padding-left: 8px;margin: 0px;">➡
              {{item1.targetName}}</span>
                </div>
                <div class="content forthFont" v-html="item1.content">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="publishComment">
          <el-input type="textarea" placeholder="写个评论吧，可以推给对应的用户ଘ(੭ˊᵕˋ)੭" v-model="commentContent" maxlength="30"
                    show-word-limit>
          </el-input>
          <el-button type="success" icon="el-icon-message" circle style="margin-left: 10px;" @click="publishComment"></el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
    import MainContent from './blog-content';
    import MainComment from './blog-comment';
    import {
        dateFormat
    } from '../../util/dateUtil'

    export default {
        data() {
            return {
                article: {},
                catalog: "",
                commentContent: ""
            }
        },
        components: {
            MainContent, MainComment
        },
        filters: {
            dateStr(value) {
                return dateFormat(value);
            }
        },
        methods: {
            createCatalog() {
                //创建导读
                // let markDown = document.getElementById("markdown-body");
                let catalog = "";
                const nodes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
                let temp = document.createElement("div");
                temp.innerHTML = this.article.content;
                catalog += `<div style="margin-bottom: 10px;">导读</div>`;
                temp.childNodes.forEach((e, index) => {
                    if (nodes.includes(e.nodeName)) {
                        let li_paddL = Number(e.nodeName.substring(1, 2)) * 16 + 'px';
                        let a_fontSize = 20 * (1 - 0.05 * Number(e.nodeName.substring(1, 2))) + 'px';
                        let _href = e.childNodes[0].id;
                        catalog += `<div style="padding-left: ${li_paddL}; margin-bottom: 8px;"><a href="#${_href}" style="font-size: ${a_fontSize};">${e.textContent}</a></div>`
                    }
                })
                this.catalog = catalog;
            },
            initDetail(){
                let id = this.$route.params.articleId
                this.axios
                    .get('/font/articleController/public/article/'+id)
                    .then((response) => {
                        this.article = response.data

                        this.createCatalog();
                    }).catch(error => {
                    console.log(error)
                })
            },
            publishComment(){
                this.$refs.comment.publishComment(this.commentContent, this.article.id);
                this.commentContent = "";
            }
        },
        mounted() {
            this.initDetail();
        }
    }

</script>
<style lang="scss">
  @import "static/css/home.scss";
</style>
