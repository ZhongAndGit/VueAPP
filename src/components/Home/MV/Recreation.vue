<template>
  <div>
      <Vloading v-show="!showAC"></Vloading>
      <!--<component :is="viewActive" > </component>-->
      <div class="mv" v-for="(item,index) in placeholder"  :id="item.videoId" v-if="item.listV">
        <div class="title" v-text="''?item.Ytitle:item.title" ></div>
        <div class="line-msg" v-show="item.listV.error">{{item.listV.errorMsg}}</div>
        <video controls controlsList=" nodownload"  name="media" :poster="item.listV.bigHeadImage"  v-show="!item.listV.error" v-if="item.listV.videoUrlModels">
          <!--controlsList=" nofullscreen nodownload noremote  footbar"-->
          <source  :src="item.listV.videoUrlModels[0].videoUrl" type="video/mp4" >
        </video>
      </div>
      <div class="mv" v-for="(item,index) in videoData" :id="item.videoId" v-if="item.listV[0]">
        <div class="title">{{item.title}}</div>
        <div class="line-msg" v-show="item.listV.error">{{item.listV.errorMsg}}</div>
        <video controls controlsList=" nodownload"  name="media" :poster="item.listV[0].bigHeadImage" v-show="!item.listV.error" >
          <!--controlsList=" nofullscreen nodownload noremote footbar"-->
          <source :src="item.listV[0].videoUrlModels[0].videoUrl" type="video/mp4" >
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
          Ytitle:null,
          title:null,
          listV:null,
          videoId:null,
        }]
      }
    },
    mounted() {
      var _this = this;
      this.$jsonp('http://soapi.yinyuetai.com/search/rec').then(function(res){
        var dst = res.placeholder
        _this.placeholder[0].Ytitle = dst.word;
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
        this.$jsonp('http://ext.yinyuetai.com/main/get-h-mv-info?json=true&videoId='+id).then(function(res){
          if(index != undefined){
            index.listV.push({
              headImage:res.videoInfo.coreVideoInfo.headImage,
              bigHeadImage:res.videoInfo.coreVideoInfo.bigHeadImage,
              videoUrlModels:res.videoInfo.coreVideoInfo.videoUrlModels,
              error:res.videoInfo.coreVideoInfo.error,
              errorMsg:res.videoInfo.coreVideoInfo.errorMsg,
            })
          }else {
            Pthis.placeholder[0].listV = res.videoInfo.coreVideoInfo
            Pthis.placeholder[0].title = res.videoInfo.coreVideoInfo.videoName
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
