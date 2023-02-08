<template>
    <div>
        <!-- 全局组件--三级导航 -->
        <TypeNav/>
        <ListContainer/>
        <Today/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" ::key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Today from '@/pages/Home/Today'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'

export default{
    name:'Home',
    components:{
        ListContainer,
        Today,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted(){
        //派发action 获取floor数据
        this.$store.dispatch('getFloorList')
        //派发action 获取用户信息
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
}
</script>

<style scoped>

</style>