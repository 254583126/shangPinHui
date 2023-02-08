//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//引入store中的detail模块
import detail from '@/store/detail';
import user from '@/store/user';

const requests = axios.create({
    baseURL:'/api',
    timeout:5000
});

//请求拦截器--在项目中发送请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config)=>{
    //进度条开始
    nprogress.start()
    if(detail.state.uuid_token){
        config.headers.userTempId = detail.state.uuid_token
    }
    //需要携带toke给服务器
    if(user.state.token){
        config.headers.token = user.state.token
    }
    return config
})

requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
})

export default requests
