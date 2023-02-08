import {reqAddress,reqTradeList} from '@/api'

const state = {
    address:[],
    tradeList:{}
}
 const mutations = {
    GETADDRESS(state,address){
        state.address = address
    },
    GETTRADELIST(state,tradeList){
        state.tradeList = tradeList
    }

 }
 const actions = {
    //获取用户地址信息
    async getAddress({commit}){
        let result = await reqAddress()
        if(result.code==200){
            commit('GETADDRESS',result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //获取商品列表
    async getTradeList({commit}){
        let result = await reqTradeList()
            if(result.code==200){
                commit('GETTRADELIST',result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message));
            }
        }
    }
 const getter = {}

 export default {
    state,
    mutations,
    actions,
    getter
 }