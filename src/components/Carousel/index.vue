<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default{
    name:'Carousel',
    props:['list'],
    watch:{
        //使用watch+nextTick解决new Swiper
        list:{
            immediate:true,
            handler(newVal,oldVal){
                //nextTick:在下次DOM更新 循环结束之后 执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的DOM
                this.$nextTick(()=>{
                    var mySwiper = new Swiper(
                        this.$refs.mySwiper,
                        {
                        loop:true,
                        pagination:{
                            el:'.swiper-pagination',
                            //点击分页器，切换轮播
                            clickable: true,
                        },
                navigation:{
                    nextEl:'.swiper-button-next',
                    prevEl:'.swiper-button-prev'
                }
            })
                })
            }
        }
    },
}
</script>

<style>

</style>