<template>
  <div id="pth-blog">
    <div class="blog-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input type="text" placeholder="请输入文章标题" v-model="text" maxlength="20" show-word-limit clearable
            size="medium" />
        </el-col>
        <el-col :span="8">
          <div class="blog-title-right">
            <!-- 发布弹出框 START -->
            <el-popover placement="bottom" width="28rem" trigger="click" title="发布文章" class="publish-popver">
              <div class="publish-popver-content">
                <dt>分类</dt>
                <div class="publish-type">
                  <dl>生活感悟</dl>
                  <dl>游戏天地</dl>
                  <dl>数学天地</dl>
                  <dl>java</dl>
                  <dl>前端</dl>

                  <dl>生活感悟</dl>
                  <dl>游戏天地</dl>
                  <dl>数学天地</dl>
                  <dl>java</dl>
                  <dl>前端</dl>

                  <dl>生活感悟</dl>
                  <dl>游戏天地</dl>
                  <dl>数学天地</dl>
                  <dl>java</dl>
                  <dl>前端</dl>
                </div>

                <dt>标签</dt>
                <div class="publish-label">
                  <el-row :gutter="20">
                    <el-col :span="8" v-for="(item, index) in list" :key="index">
                      <el-input placeholder="标签" v-model="list[index]" clearable>
                      </el-input>
                    </el-col>
                    <el-col :span="8">
                      <el-button type="info" plain @click="addInput">添加标签</el-button>
                    </el-col>
                  </el-row>
                  </el-input>

                </div>
                <div id="publish-popver-button">
                  <el-button type="primary" plain>确定并发布</el-button>
                </div>
              </div>
              <el-button type="primary" slot="reference" class="publish-button"> <span
                  class="iconfont icon-publish "></span> 发布文章</el-button>
            </el-popover>
            <!-- 发布弹出框 end-->
          </div>
        </el-col>
      </el-row>
    </div>



    <div class="blog-content">
      <div class="blog-edit">
        <my-editor style='height: 42rem;' v-model='content' :disabled='wangDisabled'></my-editor>
      </div>
      <div class="blog-edit-preview" style="height: 42rem;">
        <div class="blog-edit-preview-head"></div>
        <div class="blog-edit-preview-content" v-html='wangValue' style="border-bottom: 1px solid #c9d8db;"></div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import myEditor from '../util/editor/wang-editor';

  export default {
    name: "publishBlog",
    components: {
      myEditor
    },
    data() {
      return {
        content: '',
        wangDisabled: false,
        text: '',
        list: []
      }
    },
    methods: {
      addInput() {
        this.list.push("");
      }

    }
  }

</script>
<style>
  @import url(../../../static/css/publishBlog.css);

</style>
