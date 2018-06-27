<template>
  <div class="slider-content" >
    <!-- 配置slider组件 -->
    <slider :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- 设置loading,可自定义 -->
      <div slot="loading" ><img style="width: 100%" src="../../../Loding/loading.gif" alt=""></div>
    </slider>
  </div>
</template>
<script>
  import slider from 'vue-concise-slider'
  import axios from 'axios'

  export default {
    data () {
      return {
        //Image list
        pages:[],
        //Sliding configuration [obj]
        sliderinit: {
          currentPage: 0,//当前页面
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:2000,//自动滚动
          loop:true,//循环滚动
          direction:'horizontal',//方向设置滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
          timingFunction: 'ease',
          duration: 500
        }
      }
    },
    components: {
      slider,
    },
    mounted(){
      this.getBanner();
    },
    methods: {
      // Listener event
      slide (data) {
//        console.log(data)
      },
      onTap (data) {
//        console.log(data)
      },
      onInit (data) {
//        console.log(data)
      },
      getBanner(){
        var _this = this;
        var newArr = [];
        axios.get('http://123.207.59.80:3000/banner').then(function(res){
          res.data.banners.forEach(function(item){
            newArr.push({
              title:item.typeTitle,
              style:{
                background:'url("'+item.pic+'")'
              }
            })
          })
          _this.pages = newArr
        })
      }
    }
  }
</script>
<style>
  .slider-content{
    width: 100%;
    height: 200px;
    margin-top:12vh;
  }
</style>
