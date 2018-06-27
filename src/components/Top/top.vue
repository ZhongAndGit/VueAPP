<template>
  <div id="top">
    <div id="top-list">
      <div class="menu-personage"><button class="iconfont icon-icon-bars" @click="toggleBody(1)"></button></div>
      <div class="menu-item">
        <div class="item" >
          <router-link to="/myMusic" > <h2 aria-hidden="true" :style="{fontSize:active1?'17px':'15px',color:active1?'white':''}">我的音乐</h2></router-link>
        </div>
        <div class="item" >
          <router-link to="/home"> <h2 aria-hidden="true" :style="{fontSize:active2?'17px':'15px',color:active2?'white':''}">发现音乐</h2></router-link>
        </div>
        <div class="item" >
          <router-link to="/newMusic"><h2 aria-hidden="true" :style="{fontSize:active3?'17px':'15px',color:active3?'white':''}">音乐热文</h2></router-link>
        </div>
      </div>
    </div>
    <div class="bgc3" @click="toggleBody()" v-show="menu" ></div>
    <div class="left-list-menu" :style="{left:menu?'0':'-70%'}">
       <div class="bgc4" >
         <img src="./user-bakcgroundImg.jpg" alt="">
       </div>
        <div class="set-personage">
          <div class="use-nickname">
            <div class="use-nickname-img"><img src="http://p1.music.126.net/4J-1uS0bgqWB8L3ex8rTHA==/109951163339425300.jpg" alt=""></div>
            <div class="use-nickname-name">帝王-君臣</div>
          </div>
          <div class="use-set1">
            <ul>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
            </ul>
          </div>
          <div class="use-set2">
            <ul>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
              <li>个性换肤</li>
            </ul>
          </div>
        </div>
        <div class="set-bottom" :style="{left:menu?'0':'-70%'}">
          <ul>
            <li><span class="iconfont icon-baitianmoshimingliangmoshi"></span>白天模式</li>
            <li><span class="iconfont icon-shezhi"></span>设置</li>
            <li><span class="iconfont icon-tuichu"></span>退出</li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menu: false,//左边菜单toggle
        active1:false,
        active2:true,
        active3:false,
        userBGImg:''
      }
    },
    mounted(){
      //标签页active切换状态
      if(this.$route.path == '/myMusic'){
          this.active1 = true;
          this.active2 = false;
          this.active3 = false;
      }else if(this.$route.path =='/home' ){
        this.active1 = false;
        this.active2 = true;
        this.active3 = false;
      }else if(this.$route.path =='/newMusic'){
        this.active1 = false;
        this.active2 = false;
        this.active3 = true;
      }
    },
    methods:{
      //弹窗禁止body滚动
      toggleBody(isP){
        var _this = this;
        if(isP){
          _this.menu=true;
          document.body.style.height = '100vh';
          document.body.style['overflow-y'] = 'hidden';
        }else{
          _this.menu=false;
          document.body.style.height = 'unset';
          document.body.style['overflow-y'] = 'auto';
        }
      }
    }
  }
</script>
<style >
  .left-list-menu ::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  #top-list {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background: rgba(0,0,0,0.85);
    color: white;
    height: 8vh;
  }
  #top .menu-personage{
    width: 10%;
    height: 100%;
  }
  #top .menu-item{
    display: flex;
    color: white;
    height: 8vh;
  }
  #top .item {
    padding: 0 5px;
    text-align: center;
  }

  #top .item h2 {
    font-weight:inherit;
    font-size: 15px ;
    margin: 0;
    height: 8vh;
    line-height: 8vh;
    width: 100%

  }
  .active h2{
    color: #3F92B0 !important;
    font-size: 17px!important;
  }
  a{
    color: #7e8c8d;
    text-decoration: none
  }
  #top .left-list-menu{
    position: fixed;
    top: 0;
    left: -70%;
    width: 70%;
    height: 100%;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    z-index: 1999;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    color: white;
    background: rgba(0,0,0,1);
    font-size: 16px;
    clear: both;
  }
   .bgc3 {
     position: fixed;
     top: 0;
     left: 0;
     z-index: 10;
     height: 100%;
     width: 100%;
     background: rgba(0, 0, 0, 0.5);
   }
  .bgc4 {
     position: absolute;
     top: 0;
     left: 0;
     height: 100%;
     width: 100%
   }
  .bgc4>img{
    height: 100%
  }
  #top .left-list-menu .set-personage{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 94%;
    overflow-y: auto
  }
  #top .left-list-menu .set-personage .use-nickname .use-nickname-img{
    text-align: left;
  }
  #top .left-list-menu .set-personage .use-nickname .use-nickname-name{
   text-align: left;
   padding: 1vh 0 1vh 3vh;
  }
  #top .left-list-menu .set-personage .use-nickname .use-nickname-img img{
    width: 30%;
    border-radius: 50%;
    padding: 10vh 2vh 2vh 2vh;
  }
  #top .left-list-menu .set-personage li{
    line-height: 40px;
    text-align: left;
    padding-left: 3vh;
    background: rgba(0,0,0,0.2);
  }
  #top .left-list-menu .set-personage .use-set1{
    margin-bottom: 10px;
  }
  #top .left-list-menu .set-bottom{
    position: fixed;
    bottom: 0;
    left: -70%;
    width: 70%;
    height: 50px;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    background: rgba(0,0,0,0.2);
  }
  #top .left-list-menu .set-bottom ul{
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
  #top .left-list-menu .set-bottom ul li{
    height: 100%;
    line-height: 50px;
    flex: 1;
  }
</style>
