import vue from 'vue'
import vueRouter from 'vue-router'
import header from '@/components/common/header'
import footer from '@/components/common/footer'

vue.use(vueRouter)

export default new vueRouter({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: header
        },
        {
            path: '/problemComnunity',
            name: 'problemComnunity',
            component: footer
        }
        // ,
        // {
        //     path: proposal,
        //     name: 'proposal',
        //     component: nav
        // }
    ]
})