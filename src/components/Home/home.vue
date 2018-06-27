<template>
  <div >
    <top></top>
    <div class="child-menTab">
      <router-link to="/home/0">
        <span  @click="toggle(0)">个性</span>
      </router-link>
      <router-link to="/home/1"  >
        <span @click="toggle(1)">电台</span>
      </router-link>
      <router-link to="/home/2" >
        <span  @click="toggle(2)">音悦台MV</span>
      </router-link >
      <router-link to="/home/3" >
        <span  @click="toggle(3)">歌曲排行榜</span>
      </router-link>
    </div>
    <div class="conten">
      <selfdom v-show="check0" ></selfdom>
      <fm v-show="check1" ></fm>
      <mv v-show="check2"></mv>
      <crunchies v-show="check3"></crunchies>
    </div>
  </div>
</template>
<style>
  .child-menTab{
    position: fixed;
    top: 8vh;
    display: flex;
    justify-content: space-around;
    flex: 1;
    width: 100%;
    background: rgba(255,255,255,0.8);
    z-index: 8
  }
  .child-menTab span{
    display: inline-block;
    width: 100%;
    line-height: 4vh;
  }
  .child-menTab a{
    display: block;
    flex: 1;
  }
  .child-menTab a span{
    border-bottom: 1px solid rgba(255,255,255,0.8);
  }
  .child-menTab .router-link-active span{
    border-color:red;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
  }
</style>
<script>

  import top from '../Top/top.vue'
  import selfdom from './Selfdom/selfdom'
  import crunchies from './Crunchies/crunchies'
  import mv from './MV/mv'
  import fm from './FM/fm'

  export default {
    data(){
      return{
        check0:false,
        check1:false,
        check2:false,
        check3:false,
      }
    },
    mounted(){
      if(this.$route.path == '/'|| this.$route.path == '/home'||this.$route.path == '/home/0'){
        this.check0 = true;
        this.check1 = false;
        this.check2 = false;
        this.check3 = false
      }else if(this.$route.path == '/home/1'){
        this.check0 = false;
        this.check1 = true;
        this.check2 = false;
        this.check3 = false
      }else if(this.$route.path == '/home/2'){
        this.check0 = false;
        this.check1 = false;
        this.check2 = true;
        this.check3 = false
      }else if(this.$route.path == '/home/3'){
        this.check0 = false;
        this.check1 = false;
        this.check2 = false;
        this.check3 = true;
      }
    },
    components:{
      selfdom,//
      top, //上部标签菜单
      crunchies,
      mv,
      fm
    },
    methods: {
      goback(index) {
        this.$router.go(index);
      },
      toggle(index){
        var _this = this;
         if(index === 0){
           _this.check0 = true;
           _this.check1 = false;
           _this.check2 = false;
           _this.check3 = false
         }else if(index === 1){
           _this.check0 = false;
           _this.check1 = true;
           _this.check2 = false;
           _this.check3 = false
         }else if(index === 2){
           _this.check0 = false;
           _this.check2 = true;
           _this.check1 = false;
           _this.check3 = false
         }else if(index === 3){
           _this.check0 = false;
           _this.check1 = false;
           _this.check2 = false;
           _this.check3 = true;
         }
      }
    }
  }
</script>
