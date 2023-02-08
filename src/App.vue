<template>
  <div class="outer">
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components:{Header,Footer},
  mounted(){
    //通知Vuex发送请求，获取数据，存于仓库中 --->性能优化，将这个请求放在app组件中，每次只发送一次请求，提高性能
    this.$store.dispatch('categoryList')
  }
}
</script>

<style> 
</style>
