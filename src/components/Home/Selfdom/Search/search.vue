<template>
    <div id="search">
      <div><button class="iconfont icon-shengyin" @click="toAudio"></button></div>
      <div><input  @keyup="get($event,data)"
                 type="text" placeholder="搜索音乐" v-model="data"></div>
      <div><button class="iconfont  icon-sousuo" @click="getDt(data)"></button></div>
    </div>
</template>
<style>
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
    height: 6vh;
    line-height: 6vh;
    justify-content: space-around;
  }
    #search input{
      width: 90%;
      line-height: 3vh;
      border-radius: 1rem;
      border-style: none;
      /*font-size: 1rem;*/
      padding: 0 20px;
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
