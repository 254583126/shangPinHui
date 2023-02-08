import { v4 as uuidv4 } from 'uuid'
export const getUUID = ()=>{
    //判断本地存储是否有id
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        //判断如果不存在，生成并存储
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
        return uuid_token
}