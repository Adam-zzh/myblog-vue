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
            <label>浏览量：</label>
            <span class="viewNum" v-html="article.viewNum"></span>
          </h4>
          <h4 class="blog-likes">
            <label>点赞数：</label>
            <span class="likeNum" v-html="article.likeNum"></span>
          </h4>
          <h4 class="blog-tag">
            <label>标签：</label>
            <span class="tag">
              <li v-for="(item, index) in article.tags" :key="index">
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
      </div>
    </div>

  </div>
</template>
<script>
  import MainContent from './blog-content';
  export default {
    data() {
      return {
        article: {
          content: `<h1><a id="_0"></a>这是一级标题</h1> <blockquote> <p>这是引用的内容</p> <blockquote> <p>这是引用的内容</p> </blockquote> </blockquote> <hr /> <p><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwallpaperm.cmcm.com%2Fb958279ae636bb8c89cb29086dc59332.jpg&amp;refer=http%3A%2F%2Fwallpaperm.cmcm.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1623565102&amp;t=321dfe5ddcf95c938648eefd01f524f3" alt="meinv" title="美女" /></p> <table> <thead> <tr> <th>姓名</th> <th style="text-align:center">技能</th> <th style="text-align:right">排行</th> </tr> </thead> <tbody> <tr> <td>刘备</td> <td style="text-align:center">哭</td> <td style="text-align:right">大哥</td> </tr> <tr> <td>关羽</td> <td style="text-align:center">打</td> <td style="text-align:right">二哥</td> </tr> <tr> <td>张飞</td> <td style="text-align:center">骂</td> <td style="text-align:right">三弟</td> </tr> </tbody> </table> <pre><div class="hljs"><code class="lang-java"> 代码... 代码... 代码... </code></div></pre> <h2><a id="_20"></a>这是二级标题</h2> <h3><a id="_21"></a>这是三级标题</h3> <h4><a id="_22"></a>这是四级标题</h4> <h5><a id="_23"></a>这是五级标题</h5> <h6><a id="_24"></a>这是六级标题</h6>`,
          title: "吾将上下而求索",
          date: "2021-05-14",
          viewNum: 888,
          likeNum: 66,
          tags: ['java', 'js'],
          types: ["生活分享", "技术栈"]
        }
      }
    },
    components: {
      MainContent
    },
    methods: {
      createCatalog() {
        let markDown = document.getElementById("markdown-body");
        let catalog = document.getElementById('catalog');
        const nodes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
        let _h1 = document.createElement("div");
        _h1.textContent = "导读"
        _h1.style.marginBottom = "10px"
        _h1.fontSize = "20px"
        catalog.appendChild(_h1);
        markDown.childNodes.forEach((e, index) => {
          if (nodes.includes(e.nodeName)) {
            let _href = e.childNodes[0].id;
            let li = document.createElement("div");
            li.style.paddingLeft = Number(e.nodeName.substring(1, 2)) * 16 + 'px';
            li.style.marginBottom = '8px';
            let a = document.createElement('a');
            a.href = '#' + _href;
            a.style.fontSize = 20 * (1 - 0.05 * Number(e.nodeName.substring(1, 2))) + 'px';
            a.innerHTML = e.textContent;
            li.appendChild(a);
            console.log(li)
            catalog.appendChild(li);
          }
        })
      }
    },
    mounted() {
      this.createCatalog();
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
    overflow: visible;
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
