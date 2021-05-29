<template>
  <div id="blog-detail">
    <div class="bg">
    </div>
    <div class="main">
      <div id="catalog" class="catalog">
      </div>
      <div class="article">
        <div class="title" v-html="article.title"></div>
        <div class="baseData">
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
        <MainContent :content="article.content"></MainContent>
      </div>
      <div class="navigation">
          <MainComment></MainComment>
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
        catalog: ""
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
        let markDown = document.getElementById("markdown-body");
        let catalog = document.getElementById("catalog");
        // let catalog = "";
        const nodes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
        let _h1 = document.createElement("div");
        _h1.textContent = "导读"
        _h1.style.marginBottom = "10px"
        _h1.fontSize = "20px"
        catalog.appendChild(_h1);
        // catalog += `<div style="margin-bottom:10px;font-size:20px">导读</div>`
        markDown.childNodes.forEach((e, index) => {
          if (nodes.includes(e.nodeName)) {
            // let li_paddL = Number(e.nodeName.substring(1, 2)) * 16 + 'px';
            // let a_fontSize = 20 * (1 - 0.05 * Number(e.nodeName.substring(1, 2))) + 'px';
            let _href = e.childNodes[0].id;
            let li = document.createElement("div");
            li.style.paddingLeft = Number(e.nodeName.substring(1, 2)) * 16 + 'px';
            li.style.marginBottom = '8px';
            let a = document.createElement('a');
            a.href = '#' + _href;
            a.style.fontSize = 20 * (1 - 0.05 * Number(e.nodeName.substring(1, 2))) + 'px';
            a.innerHTML = e.textContent;
            li.appendChild(a);
            // catalog += `<div style="padding-left: ${li_paddL}; margin-bottom: 8px;"><a href="#_20" style="font-size: ${a_fontSize};">${e.textContent}</a></div>`
            // catalog.appendChild(li);
          }
        })
        console.log( catalog)
      },
      initDetail(){
        let id = this.$route.params.articleId
        this.axios
          .get('/front/articleController/article/'+id)
          .then((response) => {
            this.article = response.data
            this.createCatalog();
          }).catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.initDetail();
    }
  }

</script>
<style>
  #blog-detail {
    color: blanchedalmond;
    overflow-y: scroll;
    min-height: 100vh;
  }

  #blog-detail .bg {
    background: url('/static/images/personal/boy.png') top center no-repeat;
    background-size: cover;
    background-size: cover;
    width: 100%;
    height: 20rem;
  }

  #blog-detail .main {
    height: calc(100vh - 8.6rem - 20px);
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #blog-detail .catalog {
    background-color: blueviolet;
    width: 360px;
    height: 100%;
    border: 1px solid #232323;
    padding-top: 20px;
    padding-left: 10px;
    text-align: left;
    max-height: 600px;
    overflow: scroll;
    border-radius: 6px;
    margin-left: 20px;
    margin-right: 20px;
  }

  #blog-detail .article {
    background-color: rgb(76, 43, 226);
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-left: 1px;
    padding-right: 1px;
    padding: 20px;
    border: 1px solid #232323;
  }

  #blog-detail .navigation {
    background-color: yellowgreen;
    width: 360px;
    height: 100%;
    overflow: scroll;
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid #232323;
  }

  .article .baseData{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }

  #blog-detail .baseData li{
      list-style-type: none;
      /* float: left; */
      display: inline-block;
  }

  .baseData .type, .baseData .tag{
    display: inline-block;
  }
  

</style>
