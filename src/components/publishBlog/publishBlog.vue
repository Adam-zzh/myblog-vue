<template>
  <div id="pth-blog">
    <div class="blog-title">
      <el-form :model="article" :rules="rules" ref="publishBlog">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="title">
              <el-input type="text" placeholder="请输入文章标题" v-model="article.title" maxlength="20" show-word-limit
                clearable size="medium" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="blog-title-right">
              <!-- 发布弹出框 START -->
              <el-popover placement="bottom" width="28rem" trigger="click" title="发布文章" ref="publishPopver"
                popper-class="publish-popver">
                <div class="publish-popver-content" style="width: 28rem;">
                  <dt>标签</dt>
                  <div class="publish-label">
                    <el-row :gutter="10" style="margin: 0;">
                      <el-form-item prop="articleLabels">
                        <el-col :span="8" v-for="(item, index) in article.articleLabels" :key="index">
                          <el-input placeholder="标签" v-model="item.value" clearable v-if="item.ifHand=='1'" />
                          <el-cascader :options="options" v-if="item.ifHand=='0'" clearable :show-all-levels="false" @click.native="renderLabel" 
                          @change="item.labelId =  $event[$event.length-1]">
                            <template slot-scope="{ node, data }">
                              <span>{{ data.label }}</span>
                              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                            </template>
                          </el-cascader>
                        </el-col>
                      </el-form-item>
                      <el-col :span="10" class="popover-addTags">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            添加标签<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="addInput('1')">自定义标签</el-dropdown-item>
                            <el-dropdown-item @click.native="addInput('0')">下拉选标签</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                    </el-input>

                  </div>
                  <div id="publish-popver-button">
                    <el-button type="primary" plain @click="publishArticle('publishBlog')">确定并发布</el-button>
                  </div>
                </div>
                <el-button type="primary" slot="reference" class="publish-button">
                  <span class="iconfont icon-publish "></span> 发布文章
                </el-button>
              </el-popover>
              <!-- 发布弹出框 end-->
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="blog-content">
      <mavon-editor :toolbars="toolbars" @imgAdd="handleEditorImgAdd" @imgDel="handleEditorImgDel" @change="change"
        ref=md />
    </div>
  </div>
  </div>
</template>
<script>
  import {
    isInteger,
    isNotNull
  } from '../util/validateUtil';

  export default {
    name: "publishBlog",
    components: {
      // myEditor
    },
    data() {
      return {
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: false, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        article: {
          content: "",
          title: "",
          articleLabels: []
        },
        options: [],
        rules: {
          content: [{
            required: true,
            message: '请输入文章内容',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入文章标题',
            trigger: 'blur'
          }],
          articleLabels: [{
            required: true,
            message: '请添加至少一个标签',
            trigger: 'blur'
          }, {
            validator: isNotNull,
            trigger: 'blur'
          }]
        }

      }
    },
    methods: {
      addInput(ifHand) {
        console.log(ifHand)
        this.article.articleLabels.push({
          ifHand
        });
      },
      handleEditorImgAdd(pos, $file) {
        //makedown添加图片
        var formdata = new FormData();
        formdata.append('file', $file);
        // this.$axios
        //   .post("http://localhost:8000/blogs/image/upload/", formdata)
        //   .then(res => {
        //     var url = res.data.data;
        //     this.$refs.md.$img2Url(pos, url); //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
        //   });
      },
      handleEditorImgDel() {
        //makedown删除图片
      },
      change(value, render) {
        // this.article.blogMdContent = value;
        this.article.content = render;

      },
      publishArticle(formData) {
        if (this.article.content == '') {
          this.$message({
            showClose: true,
            message: '请填写文章内容',
            type: 'error'
          });

          return false;
        }
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
              .post("/front/articleController/saveOrUpdArticle", this.article)
              .then((response) => {
                this.$message({
                  showClose: true,
                  message: '发布成功',
                  type: 'success'
                });
                this.$refs.publishPopver.doClose();
              })
              .catch((response) => {
                this.$message({
                  showClose: true,
                  message: '发布失败',
                  type: 'error'
                });
              })
          }
        });
      },
      renderLabel() {
        this.axios
          .get("/front/labelController/labels")
          .then((response) => {
            this.options = response.data;
          })
          .catch((err) => {
            console.log(err)
          })
      }

    }
  }

</script>
<style>
  @import url(../../../static/css/publishBlog.css);
  @import 'mavon-editor/dist/css/index.css';

  .blog-title {
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }

  #pth-blog {
    height: calc(100vh - 8.6rem);
  }

  .markdown-body {
    width: 100vw;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .popover-addTags {
    border: 1px solid #ccc;
    margin: 0 !important;
    padding: 10px 0 10px 15px !important;
    border-radius: 5px;
  }

</style>
