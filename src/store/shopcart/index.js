import {reqCartList,reqDeleteCartById,reqUpdateIschecked} from '@/api/index'

const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表、
    async getCartList({commit}){
        let result  = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车产品
    async deleteCartListByskuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车的勾选状态
    async updateIschecked({commit},{skuId,isChecked}){
       let result = await reqUpdateIschecked(skuId,isChecked)
       if(result.code == 200){
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //删除所有选中的
    deleteAllCheck({dispatch,getters}){
        let PromiseAll = []
        getters.cartInfo.cartInfoList.forEach(item => {
            let result = item.isChecked == 1?dispatch('deleteCartListByskuId',item.skuId):''
            PromiseAll.push(result)  // 将每个promise实例加入到数组中
        });
        //当数组中全部都为成功时才返回成功，有一个失败则返回失败
        return Promise.all(PromiseAll)
    },
     //全选按钮点击与取消
     updataCheckAll({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.cartInfo.cartInfoList.forEach(item => {
            let result = dispatch('updateIschecked',{skuId:item.skuId,isChecked})   
            PromiseAll.push(result)  // 将每个promise实例加入到数组中
        });
        //当数组中全部都为成功时才返回成功，有一个失败则返回失败
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartInfo(state){
        return state.cartList[0] || {}
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}