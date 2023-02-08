//引入一级路由
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/center',
        component: Center,
        name:'center',
        meta: { show: true },
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            {
                path:'/',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        name:'paysuccess',
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        name:'pay',
        meta: { show: true },
         //路由独享守卫
         beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                //从指定地方来的路由才跳转
                next()
            }else{
                next(false)  //不跳转
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        name:'trade',
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                //从指定地方来的路由才跳转
                next()
            }else{
                next(false)  //不跳转
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        name:'shopcart',
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name:'addcartsuccess',
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/home',
        component: ()=>import( '@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    //重定向
    {
        path: '*',
        redirect: '/home'
    }
]