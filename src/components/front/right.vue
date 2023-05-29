<template>
  <div id="front-right">
    <div class="front-right-item">
      <dd>联系我</dd>
      <div class="front-right-item-content">
        <dl><a href="javascript:void(0)">微信</a></dl>
        <dl><a href="javascript:void(0)">QQ</a></dl>
      </div>
    </div>
    <div class="front-right-item">
      <dd>分类目录</dd>
      <div class="front-right-types">
        <dl v-for="(item, index) in types">
          <a href="javascript:void(0)" :class="typeActiveIndex == index ? 'rightPanel-active':''"
            @click="setTypeIndex(index)">{{item}}</a>
        </dl>
      </div>
    </div>
    <div class="front-right-item">
      <dd>标签云集</dd>
      <div class="front-right-item-content">
        <dl v-for="(item, index) in labels">
          <a href="javascript:void(0)" :class="labelActiveIndex == index ? 'rightPanel-active':''"
            @click="setLabelIndex(index)">{{item}}</a>
        </dl>
      </div>
    </div>
    <div class="front-right-item">
      <dd>文章归档</dd>
      <div class="front-right-item-content">
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" format="yy/MM/dd" popper-class="dateClass" value-format="timestamp">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "right",
    data() {
      return {
        labels: [],
        types: [],
        value1: "",
        typeActiveIndex: -1,
        labelActiveIndex: -1,
      }
    },
    watch: {
      value1: function (val) {
        let data = [];

        if (this.typeActiveIndex != -1) {
          let obj = {};
          obj.fieldName = "typeName";
          obj.op = "like";
          obj.values = [this.types[this.typeActiveIndex]];
          data.push(obj);
        }
        if (this.labelActiveIndex != -1) {
          let obj = {};
          obj.fieldName = "labelName";
          obj.op = "like";
          obj.values = [this.labels[this.labelActiveIndex]];
          data.push(obj);
        }
        if (val != null && val != undefined) {
          let obj = {};
          obj.fieldName = "creTime";
          obj.op = "between";
          obj.values = val;
          data.push(obj);
        }
        this.$emit('renderArticle', data)
      }
    },
    mounted() {
      this.getRightPanel();
    },
    methods: {
      getRightPanel() {
        this.axios
          .get('/front/labelController/public/rightPanel')
          .then((response) => {
            this.labels = response.data.labels
            this.types = response.data.types
          }).catch(error => {
            console.log(error)
          })
      },
      setTypeIndex(index) {
        if (this.typeActiveIndex == index) {
          this.typeActiveIndex = -1;
        } else {
          this.typeActiveIndex = index;
        }

        let data = [];

        if (this.typeActiveIndex != -1) {
          let obj = {};
          obj.fieldName = "typeName";
          obj.op = "like";
          obj.values = [this.types[this.typeActiveIndex]];
          data.push(obj);
        }
        if (this.labelActiveIndex != -1) {
          let obj = {};
          obj.fieldName = "labelName";
          obj.op = "like";
          obj.values = [this.labels[this.labelActiveIndex]];
          data.push(obj);
        }
        this.$emit('renderArticle', data)
      },
      setLabelIndex(index) {
        if (this.labelActiveIndex == index) {
          this.labelActiveIndex = -1;
        } else {
          this.labelActiveIndex = index;
        }

        let data = [];

        if (this.typeActiveIndex != -1) {
          let obj = {};
          obj.fieldName = "typeName";
          obj.op = "like";
          obj.values = [this.types[this.typeActiveIndex]];
          data.push(obj);
        }
        if (this.labelActiveIndex != -1) {
          let obj = {};
          obj.fieldName = "labelName";
          obj.op = "like";
          obj.values = [this.labels[this.labelActiveIndex]];
          data.push(obj);
        }
        this.$emit('renderArticle', data)
      }
    },
  }

</script>
<style>
  @import url("../../../static/css/right.css");

  .front-right-item dl a:hover {
    background-color: #2f2f2f96;
    color: yellow;
  }

  .rightPanel-active {
    background-color: #2f2f2f96;
    color: yellow !important;
  }

</style>
