import { reqGoodsInfo, reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    //游客身份唯一标识
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
   async getGoodsInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)

        if(result.code == 200){
            //代表服务器加入购物车成功
            return 'ok'
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}