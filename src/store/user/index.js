import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/tokenutil'

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    LOGOUT(state){
        state.userInfo = {}
        state.token = ''
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //注册账号
    async registerUser({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
   async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //推出登录
    async logout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('LOGOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const  getters = {} 

export default {
    state,
    mutations,
    actions,
    getters
}