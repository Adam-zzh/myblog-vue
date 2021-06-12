<template>
  <div class="editCenter">
    <div id="leaveMessage">
      <el-form :model="leaveMessage" :rules="rules" ref="leaveMessage">
        <h3>留言板</h3>
        <div class="row">
          <label><em>* </em>类别：</label>
          <el-radio-group v-model="leaveMessage.type" v-for="(item,index) of types" ::key="index">
            <el-radio :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
        <div class="message">
          <el-form-item prop="content">
            <label style="text-align: left; width: 100%;display: block;text-align: left;">
              <label><em>* </em>留言内容：</label>
            </label>
            <mavon-editor :subfield="toolbars.subfield" :toolbarsFlag="toolbars.toolbarsFlag"
              :codeStyle="toolbars.codeStyle" v-model="leaveMessage.content" placeholder="你是我一生只会遇见一次的惊喜 ..."
              class="myTextArea" />
          </el-form-item>
        </div>
        <el-form-item prop="concat">
          <div class="row">
            <label><em>* </em>联系方式：</label>
            <el-input v-model="leaveMessage.concat" placeholder="请输入联系方式" clearable></el-input>
          </div>
        </el-form-item>
        <div class="form-submit">
          <el-button type="primary" size="medium" class="submitButton" @click="publishLeaveMsg('leaveMessage')">提交留言
          </el-button>
        </div>
      </el-form>

      <div class="showLeaveMsg">
        <el-divider>全部留言</el-divider>

        <div class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <div v-for="(item, index) of leaveMessages" class="infinite-list-item lefMsg-item">
            <div class="lefMsg-top">
              <div class="left">
                <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg"
                  class="lefMsg-userIcon" />
              </div>
              <div class="right">
                <h4 class="lefMsg-userName">菩提花</h4>
                <h4 class="lefMsg-label">
                  <span class="lefMsg-date">2021-06-07 </span>
                  <span class="lefMsg-type">交个朋友</span>
                </h4>
              </div>
            </div>
            <MainContent :content="item.content"></MainContent>
            <div class="lefMsg-bottom"><a href="javascript:void(0)">回复</a></div>

            <!-- 存在回复内容 -->
            <div v-for="(item1, index) of item.children" class="lefMsg-item-children" v-if="item.children">
              <div class="lefMsg-top">
                <div class="left">
                  <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg"
                    class="lefMsg-userIcon" />
                </div>
                <div class="right">
                  <h4 class="lefMsg-userName">菩提花</h4>
                  <h4 class="lefMsg-label">
                    <span class="lefMsg-date">2021-06-07 </span>
                    <span class="lefMsg-type">交个朋友</span>
                  </h4>
                </div>
              </div>
              <MainContent :content="item.content"></MainContent>
              <div class="lefMsg-bottom"><a href="javascript:void(0)">回复</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MainContent from '../front/blogDetail/blog-content.vue';
  export default {
    data() {
      return {
        types: [{
          id: '1',
          value: '1',
          label: '产品建议'
        }, {
          id: '2',
          value: '2',
          label: '系统缺陷'
        }, {
          id: '3',
          value: '3',
          label: '交个朋友'
        }, {
          id: '4',
          value: '4',
          label: '其他'
        }],
        toolbars: {
          toolbarsFlag: false,
          subfield: false, // 单双栏模式
          codeStyle: 'tomorrow-night',
          code: true
        },
        leaveMessage: {
          type: '1',
          concat: '',
          targetId: 0,
          pid: 0,
          content: ''
        },
        rules: {
          content: [{
            required: true,
            message: '请输入留言内容',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择留言类型',
            trigger: 'blur'
          }],
          concat: [{
            required: true,
            message: '请输入联系方式',
            trigger: 'blur'
          }]
        },
        leaveMessages: [{
          type: '1',
          typeName: '产品建议',
          concat: '',
          targetId: 0,
          pid: 0,
          content: '我是内容',
          children: [{
            type: '1',
            typeName: '产品建议',
            concat: '',
            targetId: 0,
            pid: 0,
            content: '我是内容'
          }]
        }]
      }
    },
    components: {
      MainContent
    },
    methods: {
      publishLeaveMsg(formData) {
        this.$refs[formData].validate((valid) => {
          if (!valid) {
            this.$message({
              showClose: true,
              message: '请填写完整表单',
              type: 'error'
            });
            return false;
          } else {
            //发布文章
            this.axios
              .post("/front/leaveMessage/leaveMessage", this.leaveMessage)
              .then((response) => {
                this.$message({
                  showClose: true,
                  message: '留言成功',
                  type: 'success'
                });
              })
              .catch((error) => {
                this.$message({
                  showClose: true,
                  message: '留言失败',
                  type: 'error'
                });
              })
          }
        });
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
    padding: 20px 160px;
    min-height: calc(100vh - 8.6rem);
    overflow-y: scroll;
  }

  #leaveMessage .el-radio {
    padding: 0px 10px;
    line-height: 40px;
    height: 40px;
    box-sizing: border-box;
  }

  #leaveMessage .myTextArea {
    min-height: 180px;
    background-image: url(https://cdn.jsdelivr.net/gh/AiriShiraga/AiriShiraga/favicon.jpg);
    background-size: 160px, 160px;
    background-repeat: no-repeat;
    background-position: right bottom;
    resize: vertical;
    z-index: 9999;
  }

  #leaveMessage .submitButton {
    margin: 20px;
  }

  #leaveMessage .lefMsg-item {
    padding: 10px;
    border: 1px solid floralwhite;
    box-shadow: 0 0 4px rgba(0, 0, 0, .5);
    background-color: #3c41e6e0;
    margin-bottom: 10px;
  }

  #leaveMessage .lefMsg-item .lefMsg-item-children{
    padding: 5px 20px;
    border: 1px solid floralwhite;
    background-color: #befdcc2e;
    margin: 10px 0;
    margin-left: 30px;
  }

  #leaveMessage .lefMsg-userIcon {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  #leaveMessage .lefMsg-top .lefMsg-userName {
    height: 30px;
    line-height: 30px;
  }

  #leaveMessage .lefMsg-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  #leaveMessage .lefMsg-bottom a {
    display: block;
    height: 20px;
    line-height: 20px;
    text-align: right;
    padding-top: 10px;
    padding-right: 10px;
    font-size: 14px;
  }

  #leaveMessage .lefMsg-top .right {
    min-height: 60px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #leaveMessage .lefMsg-top .lefMsg-label {
    font-size: 14px;

  }

  #leaveMessage .lefMsg-top .lefMsg-date,
  #leaveMessage .lefMsg-top .lefMsg-type {
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }

  #leaveMessage .lefMsg-top h4 {
    margin: 0;
    padding: 0;
    text-align: left;
  }

  #leaveMessage .row {
    display: flex;
    justify-content: flex-start;
    height: 40px !important;
    line-height: 40px !important;
  }

  #leaveMessage .row label {
    max-width: 100px;
    min-width: 80px;
    text-align: left;
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

</style>
