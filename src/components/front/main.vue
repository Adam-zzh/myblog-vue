<template>
    <div id="main">
        <left ref="left" :conditions="conditions"></left>
        <right ref="right" @renderArticle="assemble"></right>
    </div>
</template>
<script>
    import left from '@/components/front/left';
    import right from '@/components/front/right';
    export default{
        name: "main",
        components: {
            left,right
        },
        data() {
            return {
                conditions: []
            }
        },
        methods: {
            assemble(data){
                this.conditions = data;
            }
        },
    }
</script>
<style>
    @import url("../../../static/css/main.css");
</style>