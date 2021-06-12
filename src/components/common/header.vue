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
            <el-popover placement="bottom" title="" width="250" trigger="hover" popper-class="popoverBackB">
              <div class="message-title" v-for="(item, index) of messages" @click="opendialog(item)">
                <div class="left"><img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg"
                    class="userImg" /></div>
                <div class="right" v-html="item.title"></div>
              </div>
              <div class="queryMore">
                <a href="javascript:void(0)" @click="openMessage"
                  style="color: yellowgreen; padding-top: 10px;display: block;">查看更多>></a>
              </div>
              <div slot="reference"><i class="iconfont">&#xe6f3;</i></div>
            </el-popover>
            <div class="iconRight" v-html="unReadNum" v-if="unReadNum>0">
            </div>
          </div>
        </div>
        <div class="menus_item userInfo">
          <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg" class="userImg" />
        </div>
      </div>
    </div>

    <!-- 点击消息 展示详细信息框 -->
    <el-dialog title="消息" :visible.sync="dialogVisible" width="30%" class="hearDialog">
      <div class="dialog-message">
        <div class="left">
          <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg" class="userImg" />
        </div>
        <div class="right">
          <span class="title" v-html="message.title"></span>
          <MainContent :content="message.content"></MainContent>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import MainContent from '../front/blogDetail/blog-content.vue';
  export default {
    name: "commonHeader",
    data() {
      return {
        scrollFlag: false,
        unReadNum: 0,
        websocket: {},
        messages: [],
        message: {},
        dialogVisible: false
      }
    },
    components: {
      MainContent
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
            console.log(this.messages)
          },
          (error) => {
            console.log(error);
          })
      },
      openMessage() {
        this.$router.push({
          path: '/message',
          query: {
            "type": 0
          }
        });
      },
      opendialog(message) {
        this.message = message
        this.dialogVisible = true
        this.axios.put("/front/messageController/message/" + message.id).then((response) => {
            if (response.code == '200') {
              this.initMessage();
            }
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

  .userImg {
    width: 40px !important;
    height: 40px !important;
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

  .el-notification__title {
    color: darkorange
  }

  .message-title {
    min-height: 60px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    background-color: #3c41e659 !important;
    margin-top: 10px;
  }

  .message-title .left {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }

  .message-title .right {
    height: 100%;
    text-align: left;
    text-indent: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    margin-left: 10px;
    margin-right: 10px;
  }

  /* 设置popover背景色 */
  .popoverBackB {
    /* #303133是el-tooltip的背景色 */
    background: rgba(0, 0, 0, .5) !important;
    color: yellowgreen;
  }

  .popoverBackB .popper__arrow::after {
    /* 注意：placement位置不同，下面的属性不同 */
    border-bottom-color: #3c41e659 !important;
  }

  /* 设置消息对话框样式 */
  .header .el-dialog__header,
  .header .el-dialog__body {
    background-color: #473ce6 !important;
  }

  .header .el-dialog__body {
    padding: 0 20px !important;
    padding-bottom: 30px !important;
  }

  .header .el-dialog__title {
    color: orange;
  }

  .header .dialog-message {
    display: flex;
    justify-content: flex-start;
  }

  .header .dialog-message .left {
    margin: 10px 10px;
  }
  .header .dialog-message .right {
    width: calc(100% - 10px);
  }

  .header .dialog-message .title {
    display: block;
    color: #00dcff;
    margin: 5px 10px 5px;
    text-align: left;
    text-indent: 5px;
  }

  .header .dialog-message .markdown-body {
    color: yellow;
  }

</style>
