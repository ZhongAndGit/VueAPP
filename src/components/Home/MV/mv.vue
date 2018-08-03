<!--<template>-->
    <!--<div class="mv_c" >-->
      <!--<div class="child-menTabs" >-->
        <!--<router-link-->
          <!--:to="{path: '/home/' + item.loct}"-->
          <!--:key="index"-->
          <!--v-for="(item,index) in MvTab"-->
          <!--tag="span"-->
          <!--@click.native="toggle(index)">{{item.title}}</router-link>-->
      <!--</div>-->

      <!--<div class="contens" >-->
        <!--<Vloading v-show="!showAC"></Vloading>-->
        <!--&lt;!&ndash;<component :is="viewActive" > </component>&ndash;&gt;-->
        <!--<div class="mv" v-for="(item,index) in placeholder"  :id="item.videoId" v-if="item.listV">-->
          <!--<div class="title" v-text="''?item.Ytitle:item.title" ></div>-->
          <!--<div class="line-msg" v-show="item.listV.error">{{item.listV.errorMsg}}</div>-->
          <!--<video controls controlsList=" nodownload"  name="media" :poster="item.listV.bigHeadImage"  v-show="!item.listV.error" v-if="item.listV.videoUrlModels">-->
            <!--&lt;!&ndash;controlsList=" nofullscreen nodownload noremote  footbar"&ndash;&gt;-->
            <!--<source  :src="item.listV.videoUrlModels[0].videoUrl" type="video/mp4" >-->
          <!--</video>-->
        <!--</div>-->
        <!--<div class="mv" v-for="(item,index) in videoData" :id="item.videoId" v-if="item.listV[0]">-->
          <!--<div class="title">{{item.title}}</div>-->
          <!--<div class="line-msg" v-show="item.listV.error">{{item.listV.errorMsg}}</div>-->
          <!--<video controls controlsList=" nodownload"  name="media" :poster="item.listV[0].bigHeadImage" v-show="!item.listV.error" >-->
            <!--&lt;!&ndash;controlsList=" nofullscreen nodownload noremote footbar"&ndash;&gt;-->
            <!--<source :src="item.listV[0].videoUrlModels[0].videoUrl" type="video/mp4" >-->
          <!--</video>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import Vloading from '../../Loding/loading'-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--videoData:[],-->
        <!--showAC:false,-->
        <!--placeholder:[{-->
          <!--Ytitle:null,-->
          <!--title:null,-->
          <!--listV:null,-->
          <!--videoId:null,-->
        <!--}],-->
        <!--MvTab:[-->
          <!--{loct:'MvAll',title:'全部MV'},-->
          <!--{loct:'MvHotSpot ',title:'热点MV'},-->
          <!--{loct:'MvLocale',title:'现场版MV'},-->
          <!--{loct:'MvRecreation ',title:'娱乐MV'},-->
          <!--{loct:'MvArtist ',title:'艺术家MV'},-->
        <!--],-->
        <!--viewActive:'MvAll'-->
        <!--//音悦台MV资源-->
        <!--// 'http://v.yinyuetai.com/video/get-relate-videos?videoId=617005',//所有地区mv-->
        <!--// 'http://v.yinyuetai.com/video/get-hot-videos',//热点MV-->
        <!--// 'http://v.yinyuetai.com/video/get-guess-videos?videoId=3166775',//获取现场版MV-->
        <!--// 'http://www.yinyuetai.com/api/info/get-video-urls?videoId=',//获取MV URL-->
        <!--// 'http://ext.yinyuetai.com/main/get-h-mv-info?json=true&videoId=',//获取MV详情-->
        <!--// 'http://idol.yinyuetai.com/video/video-list?artistId=1485'//获取艺术家MV-->
        <!--// 'http://soapi.yinyuetai.com/search/rec'//获取娱乐MV-->
        <!--//TXT起点資源-->
        <!--//https://m.qidian.com/majax/book/getBookForum?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&pageNum=1&pageSize=3&bookId=3394903&chanId=4&authorId=6392087&userLevel=0 论坛评论-->
        <!--//https://m.qidian.com/majax/book/getCommentList?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&pageNum=1&pageSize=3&bookId=3394903&chanId=4&authorId=6392087&userLevel=0 书友评论-->
        <!--//https://m.qidian.com/majax/intellectRec/friendRead?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&pageNum=1&pageSize=3&bookId=3394903&chanId=4&authorId=6392087&userLevel=0 书友还看过-->
        <!--//https://m.qidian.com/majax/book/category?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&bookId=3394903 目录-->
        <!--//https://m.qidian.com/majax/intellectRec/list?gender=male&_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp 最新-->
        <!--//https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&bookId=3394903&chapterId=78523905 获取文本-->
        <!--//https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&bookId=3394903&chapterId=78523916 获取文本-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--var _this = this;-->
      <!--this.$jsonp('http://soapi.yinyuetai.com/search/rec').then(function(res){-->
        <!--var dst = res.placeholder-->
        <!--_this.placeholder[0].Ytitle = dst.word;-->
        <!--_this.placeholder[0].videoId = dst.searchUrl.substring(dst.searchUrl.lastIndexOf('/')+1);-->
        <!--_this.getVideo(dst.searchUrl.substring(dst.searchUrl.lastIndexOf('/')+1))-->
        <!--res.result.forEach(function(item,index){-->
          <!--_this.videoData.push({-->
            <!--title:item.word,-->
            <!--listV:[],-->
            <!--videoId:item.searchUrl.substring(item.searchUrl.indexOf('o/')+2,item.searchUrl.lenght)-->
          <!--})-->
          <!--_this.getVideo(item.searchUrl.substring(item.searchUrl.indexOf('o/')+2,item.searchUrl.lenght),_this.videoData[index])-->
        <!--})-->
        <!--_this.showAC = true-->
      <!--},function(){-->
        <!--console.log('失败了呢')-->
      <!--})-->
    <!--},-->
    <!--methods: {-->
      <!--goback(index) {-->
        <!--this.$router.go(index);-->
      <!--},-->
      <!--getVideo(id,index){-->
        <!--var Pthis = this-->
        <!--this.$jsonp('http://ext.yinyuetai.com/main/get-h-mv-info?json=true&videoId='+id).then(function(res){-->
          <!--if(index != undefined){-->
            <!--console.log(res)-->
            <!--index.listV.push({-->
                  <!--headImage:res.videoInfo.coreVideoInfo.headImage,-->
                  <!--bigHeadImage:res.videoInfo.coreVideoInfo.bigHeadImage,-->
                  <!--videoUrlModels:res.videoInfo.coreVideoInfo.videoUrlModels,-->
                  <!--error:res.videoInfo.coreVideoInfo.error,-->
                  <!--errorMsg:res.videoInfo.coreVideoInfo.errorMsg,-->
            <!--})-->
          <!--}else {-->
            <!--Pthis.placeholder[0].listV = res.videoInfo.coreVideoInfo-->
            <!--Pthis.placeholder[0].title = res.videoInfo.coreVideoInfo.videoName-->
          <!--}-->
        <!--},function(){-->
          <!--console.log('失败了呢')-->
        <!--})-->
      <!--},-->
      <!--toggle(index){-->
        <!--var _this  = this-->
        <!--_this.viewActive = _this.listV[index].loct-->
      <!--}-->
    <!--},-->
    <!--components:{-->
      <!--Vloading-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style lang="scss">-->
  <!--@import '../../../assets/style/common.scss';-->

  <!--$browser-default-font-size: 50px !default;-->
    <!--@function pxTorem($px) {-->
      <!--@return $px / $browser-default-font-size * 1rem;-->
  <!--}-->
    <!--.contens{-->
      <!--width: 95%;-->
      <!--margin: auto;-->
    <!--}-->
   <!--.child-menTabs{-->
    <!--position: fixed;-->
    <!--top: px2rem(100px);-->
    <!--display: flex;-->
    <!--justify-content: space-around;-->
    <!--width: 100%;-->
    <!--background: rgba(255,255,255,0.8);-->
    <!--z-index: 8-->
  <!--}-->
  <!--.child-menTabs span{-->
    <!--flex: 1;-->
    <!--border-bottom: px2rem(1px) solid rgba(255,255,255,0.8);-->
    <!--line-height: px2rem(40px);-->
  <!--}-->
  <!--.mv .title{-->
    <!--font-size: pxTorem(16px);-->
    <!--height: px2rem(50px);-->
    <!--line-height: px2rem(50px);-->
    <!--text-align: left;-->
    <!--overflow: hidden;-->
    <!--text-overflow:ellipsis;-->
  <!--}-->
  <!--.mv .line-msg{-->
    <!--height: px2rem(200px);-->
    <!--line-height: px2rem(200px);-->
    <!--font-size: pxTorem(14px);-->
  <!--}-->
  <!--video{width: 100%;}-->

  <!--/*video::-webkit-media-controls-fullscreen-button{ display: block; }!*全屏*!*/-->
  <!--/*video::-internal-media-controls-download-button {display:none;}*/-->
  <!--/*video::-webkit-media-controls-enclosure {overflow:hidden;}*/-->
  <!--/*video::-webkit-media-controls-panel {width: calc(100% + 30px);}*/-->
<!--</style>-->


<template>
    <div class="mv">
      <div class="child-menTabs" >
        <span @click="toggle('MvAll')" :class="viewActives==='MvAll'?'NoActive':''">全部MV</span>
        <span @click="toggle('MvHotSpot')" :class="viewActives==='MvHotSpot'?'NoActive':''">热点MV</span>
        <span @click="toggle('MvLocale')" :class="viewActives==='MvLocale'?'NoActive':''">现场版MV</span>
        <span @click="toggle('MvRecreation')" :class="viewActives==='MvRecreation'?'NoActive':''">娱乐MV</span>
        <span @click="toggle('MvArtist')" :class=" viewActives==='MvArtist'?'NoActive':''">艺术家MV</span>
      </div>
      <MvAll :is="viewActives" ></MvAll>
    </div>
</template>
<style lang="scss">
  @import '../../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
  @function pxTorem($px) {
    @return $px / $browser-default-font-size * 1rem;
  }
  .contens{
    width: 95%;
    margin: auto;
  }
  .child-menTabs{
    position: fixed;
    top: px2rem(100px);
    display: flex;
    justify-content: space-around;
    width: 100%;
    background: rgba(255,255,255,0.8);
    z-index: 8
  }
  .child-menTabs span{
    flex: 1;
    border-bottom: px2rem(1px) solid rgba(255,255,255,0.8);
    line-height: px2rem(40px);
  }
  .child-menTabs span.NoActive{
   background: #57faff;
    color: white;
  }
  .mv{
    margin-top: px2rem(40px);
  }
  .mv .title{
    font-size: pxTorem(16px);
    height: px2rem(50px);
    line-height: px2rem(50px);
    margin-left: px2rem(20px);
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .mv .line-msg{
    height: px2rem(200px);
    line-height: px2rem(200px);
    font-size: pxTorem(14px);
  }
  video{
    width: 100%!important;
    height: 100%!important;
  }
  .artist-name{
    text-align: left;
  }
  .artist-name>span{
    display: inline-block;
    padding: px2rem(10px);
    background: paleturquoise;
    margin-top: px2rem(5px);
    margin-left: px2rem(5px);
    border-radius: px2rem(10px);
  }
</style>
<script>
  import axios from 'axios'
  import MvAll from './All'
  import MvArtist from './Artist'
  import MvHotSpot from './HotSpot'
  import MvLocale from './Locale'
  import MvRecreation from './Recreation'

  export default {
    data (){
      return {
        MvTab:[
          {loct:'MvAll',title:'全部MV'},
          {loct:'MvHotSpot ',title:'热点MV'},
          {loct:'MvLocale',title:'现场版MV'},
          {loct:'MvRecreation ',title:'娱乐MV'},
          {loct:'MvArtist ', title:'艺术家MV'},
        ],
         viewActives:'MvAll'
      }
    },
    mounted(){
      // var yz = this.$route.path;
      // if(yz.substring(yz.lastIndexOf('/')+1) === 'mv'){
      //   this.viewActive = 'MvAll'
      // }
    },
    methods:{
      toggle(index){
        this.viewActives = index
      }
    },
    components:{
      MvAll, /*所有*/
      MvArtist,/*艺术家*/
      MvHotSpot,/*热点*/
      MvLocale,/*现场*/
      MvRecreation/*娱乐*/
    }
  }
</script>
