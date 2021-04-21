<template>
    <div id="main">
        <left ref="left"></left>
        <right ref="right"></right>
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
            }
        }
    }
</script>
<style>
    @import url("../../../static/css/main.css");
</style>