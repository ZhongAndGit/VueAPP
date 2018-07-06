<template>
  <div id="top">
    <div id="top-list">
      <div class="menu-personage"><button class="iconfont icon-icon-bars" @click="toggleBody(1)"></button></div>
      <div class="menu-item">
        <ul class="menu-item-c">
            <router-link class="item"
                         :to="item.path"
                         tag="li"
                         v-for="(item,index) in mainMenu"
                         :key="index">{{item.title}}</router-link>
        </ul>
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
        userBGImg:'',
        mainMenu:[
          {path:'/myMusic',title:'我的音乐'},
          {path:'/home',title:'发现音乐'},
          {path:'/newMusic',title:'音乐热文'},
        ]
      }
    },
    mounted(){
      //标签页active切换状态
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
<style lang="scss">
  @import '../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
  @function pxTorem($px) {
  @return $px / $browser-default-font-size * 1rem;
  }

  .left-list-menu ::-webkit-scrollbar,.menu-item-c::-webkit-scrollbar{
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
    height:px2rem(60px);
  }
  #top .menu-personage{
    width: 10%;
    height: 100%;
  }
  #top .menu-item{
    width: 90%;
  }
  #top .menu-item-c{
    display: flex;
    overflow: auto;
  }
  #top .item{
    font-weight:inherit;
    font-size: pxTorem(18px );
    line-height: px2rem(60px);
    color: #7e8c8d;
    flex-basis:px2rem(100px);
    text-align: center;
    flex-shrink:0;
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
    font-size: pxTorem(18px);
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
    padding:px2rem(100px) 0 px2rem(25px) px2rem(25px);
  }
  #top .left-list-menu .set-personage .use-nickname .use-nickname-name{
   text-align: left;
   padding: px2rem(25px);
  }
  #top .left-list-menu .set-personage .use-nickname .use-nickname-img img{
    width: 35%;
    border-radius: 50%;
  }
  #top .left-list-menu .set-personage li{
    line-height: px2rem(50px);
    text-align: left;
    padding-left: px2rem(25px);
    background: rgba(0,0,0,0.2);
  }
  #top .left-list-menu .set-personage .use-set1{
    margin-bottom: px2rem(10px);
  }
  #top .left-list-menu .set-bottom{
    position: fixed;
    bottom: 0;
    left: -70%;
    width: 70%;
    height: px2rem(50px);
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
    line-height: px2rem(50px);
    flex: 1;
  }
 #top-list .menu-item .router-link-active{
    color: white;
    font-size: pxTorem(20px)!important;
  }
</style>
