import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//三级导航---全局组件
import TypeNave from '@/components/TypeNav'
//引入轮播图全局组件
import Carousel from '@/components/Carousel'
//分页全局组件
import Pagination from '@/components/Pagination'

Vue.component(Pagination.name,Pagination)
Vue.component(Carousel.name,Carousel)
Vue.component(TypeNave.name,TypeNave)

import store from '@/store'

//引入mock
import '@/mock/mockServer'
//引入swiper样式
import "swiper/css/swiper.min.css";

//引入统一接口api文件夹里面全部请求函数
import * as API from '@/api'
//引入element-ui
import {Button,MessageBox} from 'element-ui'
//引入图片懒加载
import atm from '@/assets/0.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading: atm
})
//注册全局组件
Vue.component(Button.name,Button)
//方式二挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false
//引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
