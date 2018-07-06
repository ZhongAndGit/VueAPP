<template>
    <div class="mv_c" >
      <Vloading v-show="!showAC"></Vloading>
      <div class="mv" v-for="(item,index) in placeholder"  :id="item.videoId" v-if="item.listV">
        <div class="title">{{item.title}}</div>
        <div class="line-msg" v-show="!item.listV['hcVideoUrl']">{{item.listV.message}}</div>
        <video controls controlsList=" nodownload"  name="media"  v-show="item.listV['hcVideoUrl']">
          <!--controlsList=" nofullscreen nodownload noremote footbar"-->
          <source :src="item.listV['hcVideoUrl']" type="video/mp4" >
        </video>
      </div>
      <div class="mv" v-for="(item,index) in videoData" :id="item.videoId" v-if="item.listV[0]">
        <div class="title">{{item.title}}</div>
        <div class="line-msg" v-show="!item.listV[0]['hcVideoUrl']">{{item.listV[0].message}}</div>
        <video controls controlsList=" nodownload"  name="media" >
          <!--controlsList=" nofullscreen nodownload noremote footbar"-->
          <source :src="item.listV[0]['hcVideoUrl']" type="video/mp4" >
        </video>
      </div>
    </div>
</template>
<script>
  import Vloading from '../../Loding/loading'
  export default {
    data() {
      return {
        videoData:[],
        showAC:false,
        placeholder:[{
          title:null,
          listV:null,
          videoId:null,
        }]
        //音悦台MV资源
        // 'http://v.yinyuetai.com/video/get-relate-videos?videoId=617005',//所有地区mv
        // 'http://v.yinyuetai.com/video/get-hot-videos',//热点MV
        // 'http://v.yinyuetai.com/video/get-guess-videos?videoId=3166775',//获取现场版MV
        // 'http://www.yinyuetai.com/api/info/get-video-urls?videoId=',//获取MV URL
        // 'http://ext.yinyuetai.com/main/get-h-mv-info?json=true&videoId=',//获取MV详情
        // 'http://idol.yinyuetai.com/video/video-list?artistId=1485'//获取艺术家MV
        // 'http://soapi.yinyuetai.com/search/rec'//获取娱乐MV
        //TXT起点資源
        //https://m.qidian.com/majax/book/getBookForum?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&pageNum=1&pageSize=3&bookId=3394903&chanId=4&authorId=6392087&userLevel=0 论坛评论
        //https://m.qidian.com/majax/book/getCommentList?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&pageNum=1&pageSize=3&bookId=3394903&chanId=4&authorId=6392087&userLevel=0 书友评论
        //https://m.qidian.com/majax/intellectRec/friendRead?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&pageNum=1&pageSize=3&bookId=3394903&chanId=4&authorId=6392087&userLevel=0 书友还看过
        //https://m.qidian.com/majax/book/category?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&bookId=3394903 目录
        //https://m.qidian.com/majax/intellectRec/list?gender=male&_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp 最新
        //https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&bookId=3394903&chapterId=78523905 获取文本
        //https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=i1Cb4RDNPnSKhvXuLF7YWCDj28h1BDaY4PoZURXp&bookId=3394903&chapterId=78523916 获取文本
      }
    },
    mounted() {
      var _this = this;
      this.$jsonp('http://soapi.yinyuetai.com/search/rec').then(function(res){
        var dst = res.placeholder
        _this.placeholder[0].title = dst.word;
        _this.placeholder[0].videoId = dst.searchUrl.substring(dst.searchUrl.lastIndexOf('/')+1);
        _this.getVideo(dst.searchUrl.substring(dst.searchUrl.lastIndexOf('/')+1))
        res.result.forEach(function(item,index){
          _this.videoData.push({
            title:item.word,
            listV:[],
            videoId:item.searchUrl.substring(item.searchUrl.indexOf('o/')+2,item.searchUrl.lenght)
          })
          _this.getVideo(item.searchUrl.substring(item.searchUrl.indexOf('o/')+2,item.searchUrl.lenght),_this.videoData[index])
        })
        _this.showAC = true
      },function(){
        console.log('失败了呢')
      })
    },
    methods: {
      goback(index) {
        this.$router.go(index);
      },
      getVideo(id,index){
        var Pthis = this
        this.$jsonp('http://www.yinyuetai.com/api/info/get-video-urls?videoId='+id).then(function(res){
          if(index != undefined){
            index.listV.push(res)
          }else {
            Pthis.placeholder[0].listV = res;
          }
        },function(){
          console.log('失败了呢')
        })
      }
    },
    components:{
      Vloading
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
    @function pxTorem($px) {
      @return $px / $browser-default-font-size * 1rem;
  }
  .mv_c{
    width: 95%;
    margin: auto;
  }
  .mv .title{
    font-size: pxTorem(16px);
    height: px2rem(50px);
    line-height: px2rem(50px);
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .mv .line-msg{
    height: px2rem(200px);
    line-height: px2rem(200px);
    font-size: pxTorem(14px);
  }
  video{width: 100%;}

  /*video::-webkit-media-controls-fullscreen-button{ display: block; }!*全屏*!*/
  /*video::-internal-media-controls-download-button {display:none;}*/
  /*video::-webkit-media-controls-enclosure {overflow:hidden;}*/
  /*video::-webkit-media-controls-panel {width: calc(100% + 30px);}*/
</style>

