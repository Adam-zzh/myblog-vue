<template>
  <div id="blog-detail">
    <div class="bg">
    </div>
    <div class="main">
      <div class="catalog">
      </div>
      <div class="article">
        <MainContent :content="aaa"></MainContent>
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
        aaa: `<h1><a id="_0"></a>这是一级标题</h1> <blockquote> <p>这是引用的内容</p> <blockquote> <p>这是引用的内容</p> </blockquote> </blockquote> <hr /> <p><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwallpaperm.cmcm.com%2Fb958279ae636bb8c89cb29086dc59332.jpg&amp;refer=http%3A%2F%2Fwallpaperm.cmcm.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1623565102&amp;t=321dfe5ddcf95c938648eefd01f524f3" alt="meinv" title="美女" /></p> <table> <thead> <tr> <th>姓名</th> <th style="text-align:center">技能</th> <th style="text-align:right">排行</th> </tr> </thead> <tbody> <tr> <td>刘备</td> <td style="text-align:center">哭</td> <td style="text-align:right">大哥</td> </tr> <tr> <td>关羽</td> <td style="text-align:center">打</td> <td style="text-align:right">二哥</td> </tr> <tr> <td>张飞</td> <td style="text-align:center">骂</td> <td style="text-align:right">三弟</td> </tr> </tbody> </table> <pre><div class="hljs"><code class="lang-java"> 代码... 代码... 代码... </code></div></pre> <h2><a id="_20"></a>这是二级标题</h2> <h3><a id="_21"></a>这是三级标题</h3> <h4><a id="_22"></a>这是四级标题</h4> <h5><a id="_23"></a>这是五级标题</h5> <h6><a id="_24"></a>这是六级标题</h6>`
      }
    },
    components: {
      MainContent
    },
    methods: {},
    mounted() {

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
    padding: 20px;
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

</style>
