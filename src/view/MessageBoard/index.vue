<template>
  <div class="editCenter">
    <div id="leaveMessage">
      <el-form :model="leaveMessage" :rules="rules" ref="leaveMessage">
        <a id="_1">
          <h3>留言板</h3>
        </a>
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
                          :codeStyle="toolbars.codeStyle" v-model="leaveMessage.content"
                          :placeholder="placeholder" class="myTextArea" :ishljs="true" />
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

      <a :href="'#_'+hrefPos" style="display: none;" v-click="date">{{date}}</a>

      <div class="showLeaveMsg">
        <el-divider>全部留言</el-divider>
        <div class="infinite-list" v-infinite-scroll="loadLefMsg" style="overflow:auto">
          <div v-for="(item, index) of leaveMessages" ::key="index" class="infinite-list-item lefMsg-item">
            <div class="lefMsg-top">
              <div class="left">
                <a :id="'_'+item.id">
                  <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg"
                       class="lefMsg-userIcon" />
                </a>
              </div>
              <div class="right">
                <h4 class="lefMsg-userName">{{item.sourceName}}</h4>
                <h4 class="lefMsg-label">
                  <span class="lefMsg-date">{{item.creTime | dateStr('YYYY-MM-DD')}} </span>
                  <span class="lefMsg-type">{{item.typeName}}</span>
                </h4>
              </div>
            </div>
            <MainContent :content="item.content"></MainContent>
            <div class="lefMsg-bottom"><a href="javascript:void(0)" @click="reply(item)"
                                          v-if="userName != item.sourceName">回复</a></div>
            <!-- 存在回复内容 -->
            <div v-for="(item1, index) of item.children" class="lefMsg-item-children" v-if="item.children">
              <div class="lefMsg-top">
                <div class="left">
                  <a :id="'_'+item1.id">
                    <img src="https://img1.baidu.com/it/u=2063594679,659410345&fm=26&fmt=auto&gp=0.jpg"
                         class="lefMsg-userIcon" />
                  </a>
                </div>
                <div class="right">
                  <h4 class="lefMsg-userName">
                    {{item1.sourceName}}
                    <span class="lefMsg-targetName" v-if="item1.targetName">
                      → {{item1.targetName}}
                    </span>
                  </h4>
                  <h4 class="lefMsg-label">
                    <span class="lefMsg-date">{{item1.creTime | dateStr('YYYY-MM-DD')}} </span>
                    <span class="lefMsg-type">{{item1.typeName}}</span>
                  </h4>
                </div>
              </div>
              <MainContent :content="item1.content"></MainContent>
              <div class="lefMsg-bottom"><a href="javascript:void(0)" @click="reply(item1)"
                                            v-if="userName != item1.sourceName">回复</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import MainContent from '../font/blogDetail/blog-content.vue';
    import {
        dateFormat
    } from '../util/dateUtil.js';
    export default {
        data() {
            return {
                userName: JSON.parse(sessionStorage.getItem('user')).userName,
                date: null,
                hrefPos: '1',
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
                    codeStyle: 'atelier-cave-dark',
                    code: true,
                    autofocus: true
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
                leaveMessages: [],
                page: 1,
                pageSize: 3,
                placeholder: '你是我一生只会遇见一次的惊喜 ...'
            }
        },
        directives: {
            click: {
                update(el,binding) {
                    if (binding.value != binding.oldValue) {
                        el.click();
                    }
                }
            }
        },
        components: {
            MainContent
        },
        filters: {
            dateStr(value) {
                return dateFormat(value);
            }
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
                            .post("/font/leaveMessage/leaveMessage", this.leaveMessage)
                            .then((response) => {
                                this.$message({
                                    showClose: true,
                                    message: '留言成功',
                                    type: 'success'
                                });
                                this.placeholder = "你是我一生只会遇见一次的惊喜 ..."
                                this.loadLefMsg();
                                this.hrefPos = response.data.id
                                this.date = new Date();
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
            },
            loadLefMsg() {
                let baseParam = {
                    "page": this.page,
                    "pageSize": this.pageSize
                }
                this.axios.post(`/front/leaveMessage/public/leaveMessageList`, baseParam).then((response) => {
                        this.leaveMessages = response.list;
                    },
                    (error) => {
                        console.log(error);
                    })
            },
            reply(item) {
                this.leaveMessage.targetId = item.sourceId;
                this.leaveMessage.pid = item.id;
                this.placeholder = "回复" + item.sourceName + "的留言";
                this.toolbars.autofocus = true
                this.date = new Date();
            }
        },
        mounted() {
            this.loadLefMsg();
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

  #leaveMessage .lefMsg-item .lefMsg-item-children {
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
