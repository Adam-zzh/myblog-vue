<template>

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
          .get('/font/labelController/public/rightPanel')
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
