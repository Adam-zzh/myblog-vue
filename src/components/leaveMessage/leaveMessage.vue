<template>
  <div class="editCenter">
    <div id="leaveMessage">
      <h3>留言板</h3>
      <div class="row">
        <label><em>* </em>类别：</label>
        <ul>
          <li v-for="(item,index) of types" ::key="index">
            <el-button type="primary" plain v-html="item.name" id="item.id"></el-button>
          </li>
        </ul>
      </div>
      <div class="message">
        <label
          style="text-align: left; width: 100%;display: block;text-align: left; padding-left: 60px;margin-bottom: 10px;">
          <em>* </em>留言内容：
        </label>
        <mavon-editor :subfield="toolbars.subfield" :toolbarsFlag="toolbars.toolbarsFlag"
          :codeStyle="toolbars.codeStyle" v-model="leaveMessage.message" placeholder="你是我一生只会遇见一次的惊喜 ..."
          class="myTextArea" />
      </div>
      <div class="row">
        <label style="margin-left: 10px;">联系方式：</label>
        <ul style="justify-content: flex-start;">
          <li>
            <el-input v-model="leaveMessage.concat" placeholder="请输入内容"></el-input>
          </li>
        </ul>
      </div>
      <div class="form-submit">
        <el-button type="primary" size="medium" class="submitButton">提交留言</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        types: [{
          id: '1',
          name: '产品建议'
        }, {
          id: '2',
          name: '系统缺陷'
        }, {
          id: '3',
          name: '交个朋友'
        }, {
          id: '4',
          name: '其他'
        }],
        toolbars: {
          toolbarsFlag: false,
          subfield: false, // 单双栏模式
          codeStyle: 'tomorrow-night',
          code: true
        },

        leaveMessage: {
          message: '',
          concat: '1561231115',
        }
      }
    },
  }

</script>
<style>
  #leaveMessage {
    color: wheat;
    width: 60%;
    box-shadow: 5px 5px 10px #888;
    /* background: tomato; */
    background: #ff6347c7;
    font-size: 16px;
    padding: 20px 100px;
    min-height: calc(100vh - 8.6rem);
    overflow-y: scroll;
  }

  #leaveMessage .myTextArea {
    margin: 0 60px;
    min-height: 180px;
    background-image: url(https://cdn.jsdelivr.net/gh/AiriShiraga/AiriShiraga/favicon.jpg);
    background-size: 160px, 160px;
    background-repeat: no-repeat;
    background-position: right bottom;
    resize: vertical;
    z-index: 9999;
  }

  #leaveMessage .row label {
    text-align: right;
  }

  #leaveMessage .submitButton {
    margin: 20px;
  }

  #leaveMessage .row ul {
    width: 75%;
    padding: 0 10px;
  }


  #leaveMessage h3 {
    margin: 0;
    padding: 0;
    font-size: 20px;
    margin-block-start: 0;
    margin-block-end: 10px;
  }

  #leaveMessage em {
    color: red;
  }

  #leaveMessage li {
    list-style-type: none;
  }

  #leaveMessage .row {
    display: flex;
    height: 75px;
    line-height: 75px;
    justify-content: center;
  }

  #leaveMessage .row ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }

</style>
