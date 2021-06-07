<template>

  <div class="header" :class="{'header-scrolled':scrollFlag}">
    <div class="header-enditCenter">
      <!-- 自定制logo -->
      <div class="header-logo" :class="{'header-logo-scrolled':scrollFlag}">
        <span class="header-logo-icon">
          <!-- <img src="/static/images/page_header.jpg"/> -->
        </span>
        <span class="text">
          菩提花
        </span>
      </div>

      <div class="menus_items">
        <div class="menus_item">
          <!-- 使用 router-link 组件来导航. -->
          <router-link to="/front" active-class="_active">首页</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/documentSystem">文档系统</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/leaveMessage">留言</router-link>
        </div>
        <div class="menus_item">
          <router-link to="/about">关于</router-link>
        </div>
        <div class="menus_item userInfo">
          <div class="alarm">
            <i class="iconfont">&#xe6f3;</i>
            <div class="iconRight" v-html="unReadNum" v-if="unReadNum>0">
            </div>
          </div>
        </div>
        <div class="menus_item userInfo">
          <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg" />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "commonHeader",
    data() {
      return {
        scrollFlag: false,
        unReadNum: 0,
        websocket: {},
        messages: []
      }
    },
    methods: {
      handleScroll() {
        let _this = this;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop);
        if (scrollTop) {
          _this.scrollFlag = true;
        } else {
          _this.scrollFlag = false;
        }
      },
      // websocket
      initWebSocket() {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage() {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage() {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage(event) {
        // 根据服务器推送的消息做自己的业务处理
        let msg = JSON.parse(event.data);
        this.initMessage();
        console.log('服务端返回：' + msg)
        this.$notify({
          title: '消息',
          dangerouslyUseHTMLString: true,
          message: msg.title,
          duration: 5000,
          type: 'success',
          customClass: 'notifyClass'
        });
      },
      setOncloseMessage() {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload() {
        this.closeWebSocket()
      },
      closeWebSocket() {
        if (Object.keys(this.websocket) > 0) {
          this.websocket.close()
        }
      },
      initMessage() {
        this.axios.get("/front/messageController/messages").then((response) => {
            this.messages = response;
            this.unReadNum = this.messages.length;
          },
          (error) => {
            console.log(error);
          })
      }
    },

    computed: {},

    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      let user = JSON.parse(sessionStorage.getItem("user"));
      // websocket
      if ('WebSocket' in window && user != undefined) {
        this.websocket = new WebSocket('ws://localhost:8001/websocket/' + user.account);
        this.initMessage();
        this.initWebSocket()
      }

    },

    beforeDestroy() {
      this.onbeforeunload();
    },

  }

</script>
<style>
  @import "../../../static/css/header.css";

  .iconfont {
    font-size: 22px;
    color: #369;
  }

  .userInfo {
    width: 40px;
    height: 40px;
  }

  .userInfo:hover {
    background-color: #30313375;
  }

  .userInfo img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  /* 图片旋转 */
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .userInfo img:hover {
    animation: rotation 1.4s linear infinite;
  }

  /* 未读消息数 */
  .alarm {
    position: relative;
  }

  .iconRight {
    position: absolute;
    color: white;
    font-size: 14px;
    background-color: red;
    width: 20px;
    height: 20px;
    line-height: 20px;
    left: 80%;
    top: -12px;
    text-align: center;
    -webkit-border-radius: 24px;
    border-radius: 24px;
  }

  .el-notification {
    top: 3.5rem !important;
    background-color: #3c41e659 !important;
  }

  .el-notification__content {
    color: #369;
  }

  .msg-comment {
    color: #00dcff;
  }
  .el-notification__title{
    color: darkorange
  }

</style>
