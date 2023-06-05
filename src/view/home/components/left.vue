<template>

</template>
<script>
  import {
    dateFormat
  } from '../util/dateUtil'

  export default {
    name: "left",
    props: ['conditions'],
    data() {
      return {
        pageSize: 10,
        list: [],
        currentPage: 1,
        totalPage: 1,
        totalCount: 2
      }
    },
    filters: {
      dateStr(value) {
        return dateFormat(value);
      }
    },
    mounted() {
      this.initArticel(this.pageSize, this.currentPage);
    },
    watch: {
      conditions: function (val) {
        this.initArticel(this.pageSize, this.currentPage, val);
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.initArticel(val, 1)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.initArticel(this.pageSize, val)
      },
      initArticel(n1, n2, n3) {
        var _that = this
        let baseParam = {
          "page": n2,
          "pageSize": n1,
        }
        if (n3 != undefined) {
          baseParam.conditions = n3;
        }
        this.axios
          .post('/font/articleController/public/articles', baseParam)
          .then((response) => {
            this.list = response.list
            this.totalCount = response.total
          }).catch(error => {
            console.log(error)
          })
      }
    },
  }

</script>
<style scoped>
  @import url("static/css/left.css");

</style>
