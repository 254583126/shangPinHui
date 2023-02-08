import Vue from 'vue';
import VueRouter from 'vue-router';
//引入store
import store from '@/store'

Vue.use(VueRouter);

import routes from '@/router/routers'

//重写push和repalce方法，避免多次点击时报错
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function (location,resolve,reject) {
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

let router = new VueRouter({
        routes,
        //路由的滚动行为
        scrollBehavior(to, from, savedPosition) {
            // 始终滚动到顶部
            return { y: 0 }
          },
})

//路由守卫：全局前置路由守卫
router.beforeEach(async (to,form,next)=>{
    // next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //根据token名，判断是否登录
    if(token){
        //判断如果登录了且要去登录页面则不允许，让其跳转到home
        if(to.path == '/login'||to.path=='/register'){
            next('/home')
        }else{
            //如果跳转其他的页面，先判断是否有用户信息，有则放行没有则重新派发获取
            if(name){
                next()
            }else{
                try {
                  await  store.dispatch('getUserInfo')
                  //获取成功后放行
                  next()
                } catch (error) {  //如果进入catch则证明token失效了，清除之后跳转login页面
                   await store.dispatch('logout') 
                    next('/login')
                }
            }
        }
    }else{
        //未登录不让跳转到订单 支付等页面
        let toPath = to.path
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})

export default router