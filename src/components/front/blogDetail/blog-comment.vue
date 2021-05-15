<template>
    <div id="blogComment">
        <h4>{{totalComment}}条评论</h4>
        <div class="outerComment">
            <div class="header">
                <img :src="comment.userIcon" class="commnet-img" width="30px" height="30px">
                <span class="userName" v-html="comment.userName"></span>
            </div>
            <div class="content" v-html="comment.commentContent">
            </div>
        </div>
        <div class="innerComment" v-for="(item, index) in comment.children" :key="index">
            <div class="header">
                <img :src="item.userIcon" class="commnet-img" width="30px" height="30px" >
                <span class="userName" v-html="item.userName"></span>
                <span class="toUser userName" v-if="item.toUser" style="padding-left: 8px;margin: 0px;">➡ {{item.toUser.userName}}</span>
            </div>
            <div class="content" v-html="item.commentContent">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            totalComment: 100,
            comment:{
                userIcon: "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%8A%A8%E6%BC%AB%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=13&spn=0&di=113880&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3929864075%2C1395806758&os=1339319114%2C3469941710&simid=0%2C0&adpicid=0&lpn=0&ln=1886&fr=&fmq=1621058931257_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F03%2F20160603215546_wjFWP.thumb.400_0.jpeg%26refer%3Dhttp%3A%2F%2Fc-ssl.duitang.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1623650940%26t%3D9833ba4295307b4a60d1ae02169c9a76&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52fAzdH3Fpw2AzdH3F%3Fgw4j%3D%25Em%25BC%25AB%25E0%25l9%25BB%25Eb%25BD%25AF%25Ec%25Am%25Bl%25Ec%25A9%25B9%25Ec%25bn%25bF&gsm=f&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
                userName: "菩提花",
                commentContent: "一叶一菩提，一花一世界",
                children:[
                    {
                        userIcon: "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%8A%A8%E6%BC%AB%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=13&spn=0&di=113880&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3929864075%2C1395806758&os=1339319114%2C3469941710&simid=0%2C0&adpicid=0&lpn=0&ln=1886&fr=&fmq=1621058931257_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F03%2F20160603215546_wjFWP.thumb.400_0.jpeg%26refer%3Dhttp%3A%2F%2Fc-ssl.duitang.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1623650940%26t%3D9833ba4295307b4a60d1ae02169c9a76&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52fAzdH3Fpw2AzdH3F%3Fgw4j%3D%25Em%25BC%25AB%25E0%25l9%25BB%25Eb%25BD%25AF%25Ec%25Am%25Bl%25Ec%25A9%25B9%25Ec%25bn%25bF&gsm=f&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
                        userName: "李四",
                        commentContent: "看尽繁华，三千世界",
                        toUser: {
                            id: "1",
                            userName: "张三",
                        }
                    },
                    {
                        userIcon: "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=动漫图片&step_word=&hs=2&pn=13&spn=0&di=113990&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3929864075%2C1395806758&os=1339319114%2C3469941710&simid=0%2C0&adpicid=0&lpn=0&ln=1886&fr=&fmq=1621058931257_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F03%2F20160603215546_wjFWP.thumb.400_0.jpeg%26refer%3Dhttp%3A%2F%2Fc-ssl.duitang.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1623652700%26t%3D1b8a1c3ed5fb3d627bbc55db68a1db6c&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52fAzdH3Fpw2AzdH3F%3Fgw4j%3D%25Em%25BC%25AB%25E0%25l9%25BB%25Eb%25BD%25AF%25Ec%25Am%25Bl%25Ec%25A9%25B9%25Ec%25bn%25bF&gsm=f&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
                        userName: "王五",
                        commentContent: "看尽繁华，三千世界",
                    }
                ]
            }
        }
    },
    
}
</script>
<style>
    #blogComment h4{
        padding: 0 auto;
        margin: 0;
        margin-bottom: 10px;
    }
    #blogComment .commnet-img{
        border-radius: 15px;
    }

    #blogComment .header{
       display: flex;
    }
    #blogComment .userName{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-left: 15px;
    }
    #blogComment .content{
        font-size: 14px;
        padding: 5px;
    }
    #blogComment .innerComment{
        padding-left: 20px;
    }
</style>