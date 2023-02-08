import requests from "./ajax";
import mockRequests from './mockAjax'

//三级联动接口
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'})
//首页轮播图请求
export const reqGetBannerList = () => mockRequests.get('/banner')
//floor请求
export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块数据
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

//获取产品信息数据
export const reqGoodsInfo = (skuId) =>requests({url:`/item/${skuId}`,method:'get'});

//将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车的信息
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})

//删除购物车中的数据
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改购物车商品的选中状态
export const reqUpdateIschecked = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册用户
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

//用户登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息
export const reqUserInfo = ()=>requests({url:'user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout = ()=>requests({url:'user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取订单信息
export const reqTradeList = ()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取用户是否支付
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人订单信息
export const reqMyOrder = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`,method:'get'})