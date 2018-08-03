<template>
    <div id="search">
      <div><button class="iconfont icon-shengyin" @click="toAudio"></button></div>
      <div><input  @keyup="get($event,data)"
                 type="text" placeholder="搜索音乐" v-model="data"></div>
      <div><button class="iconfont  icon-sousuo" @click="getDt(data)"></button></div>
    </div>
</template>
<style lang="scss">
  @import '../../../assets/style/common';

  $browser-default-font-size: 50px !default;
  @function pxTorem($px) {
  @return $px / $browser-default-font-size * 1rem;
  }

  button{
    border:0px;
    background-color:transparent;
    color: white;
    outline: none;
    width: 100%;
    height: 100%;
    display: inline-table
  }
  #search{
    background: black;
    width: 100%;
    margin: 0;
    display: flex;
    height: px2rem(50px);
    line-height: px2rem(50px);
    justify-content: space-around;
    font-size: pxTorem(12px);
  }
    #search input{
      line-height: px2rem(30px);
      border-radius: 1rem;
      border-style: none;
      /*font-size: 1rem;*/
      padding: 0 px2rem(20px);
      outline: none;
    }
</style>
<script>
  import axios from 'axios'
  export default{
      data(){
          return{
              data:''
          }
      },
      methods:{
          get(ev,data){
            if( ev.key && ev.key==='Enter'){
              this.$router.push({path:'/searchdata/'+data})
            }
          },
          getDt(data){
            this.$router.push({path:'/searchdata/'+data})
          },
          toAudio(){
            this.$router.push({path: '/Player/'});
          }
      }
  }
</script>
