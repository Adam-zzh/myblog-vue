<template>
  <div id="blogComment">
    <h4>{{totalComment}}条评论</h4>
    <div class="commentContents">
      <div class="commentContent" v-for="(item, index) in comments">
        <div class="outerComment" @click="setPidAndTargetId(item.id, item.sourceId, index+1)"
          :class="activeClassIndex == index+1 ? 'activeClass':''">
          <div class="header">
            <img :src="item.userIcon" class="commnet-img" width="30px" height="30px">
            <span class="userName firstFont" v-html="item.sourceName"></span>
          </div>
          <div class="content secondtFont" v-html="item.content">
          </div>
        </div>
        <div class="innerComment" v-for="(item1, index1) in item.children" :key="index1"
          @click="setPidAndTargetId(item1.id, item1.sourceId, ''+(index+1)+(index1+1))"
          :class="activeClassIndex == ''+(index+1)+(index1+1) ? 'activeClass':''">
          <div class="header">
            <img :src="item1.userIcon" class="commnet-img" width="30px" height="30px">
            <span class="userName thirdFont" v-html="item1.sourceName"></span>
           
            <span class="toUser userName thirdFont" v-if="item1.targetName && item1.targetName!=item1.sourceName" style="padding-left: 8px;margin: 0px;">➡
              {{item1.targetName}}</span>
          </div>
          <div class="content forthFont" v-html="item1.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeClassIndex: -1,
        totalComment: 100,
        comments: [],
        comment: {
          sourceId: 0,
          targetId: 0,
          pid: 0,
          content: "",
          articleId: 0,
          likeNums: 0
        }
      }
    },

    mounted() {
      this.inintComments();
    },

    methods: {
      publishComment(commentContent, articleId) {
        this.comment.content = commentContent;
        this.comment.articleId = articleId;
        this.axios.post("/front/commentController/comment", this.comment).then((response) => {
            if (response.code == '200') {
              this.inintComments();
              this.$message({
                showClose: true,
                message: "发布成功",
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: error.message,
                type: 'error'
              });
            }
          },
          (error) => {
            this.$message({
              showClose: true,
              message: '发布失败',
              type: 'error'
            });
          })
      },
      setPidAndTargetId(pid, targetId, activeClassIndex) {

        if (this.activeClassIndex == activeClassIndex) {
          this.activeClassIndex = -1
        } else {
          this.activeClassIndex = activeClassIndex;
        }

        if (this.activeClassIndex != -1) {
          this.comment.pid = pid;
          this.comment.targetId = targetId;
        } else {
          this.comment.pid = 0;
          this.comment.targetId = 0;
        }
      },
      inintComments() {
        let articleId = this.$route.params.articleId + "";
        let baseParam = {
          "conditions": [{
            "fieldName": "articleId",
            "op": "=",
            "values": [articleId]
          }],
          "orderBy": "CRE_TIME",
          "page": 1,
          "pageSize": 100
        }
        this.axios.post("/front/commentController/public/comments", baseParam).then((response) => {
            this.comments = response.data.list;
            this.totalComment = response.data.total;
            console.log(this.comments)
          },
          (error) => {
            console.log("评论" + error);
          })
      }
    }
  }

</script>
<style>
  #blogComment .activeClass {
    background-color: rgba(0, 0, 0, 0.5);
    color: yellowgreen;
  }

  #blogComment h4 {
    padding: 0 auto;
    margin: 0;
    margin-bottom: 10px;
  }

  #blogComment .commnet-img {
    border-radius: 15px;
  }

  #blogComment .commentContents {
    overflow: auto;
    max-height: 100%;
  }

  #blogComment .commentContents::-webkit-scrollbar {
    display: none;
  }

  #blogComment {
    max-height: calc(100% - 67px);
    height: calc(100% - 67px);
  }

  #blogComment .header {
    display: flex;
  }

  #blogComment .userName {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-left: 15px;
  }

  #blogComment .content {
    padding: 5px;
    text-align: left;
    padding-left: 30px;
  }

  #blogComment .innerComment {
    padding-left: 20px;
  }

  .firstFont{
    font-size: 18px;
  }
  .secondtFont{
    font-size: 16px;
  }
  .thirdFont{
    font-size: 14px;
  }
  .forthFont{
    font-size: 12px;
  }

</style>
