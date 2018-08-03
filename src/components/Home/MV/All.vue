<template>
  <div class="all video-container" >
    <div  v-for="(item,index) in allMV" :id="item.videoId" v-if="item.listV[0]" >
      <div class="title">{{item.title}}</div>
      <Vloading v-show="item.listV.error"></Vloading>
      <video
        class="video-js vjs-default-skin vjs-big-play-centered"
        :poster="item.listV[0].bigHeadImage"
        v-show="!item.listV.error"
        controls playsinline controlsList=" nodownload"
        :src="item.listV[0].videoUrlModels[0].videoUrl"
        webkit-playsinline
        width="450px"
        height="300px">
        <!--controlsList=" nofullscreen nodownload noremote footbar"-->

      </video>
    </div>
  </div>
</template>
<script>
  import Vloading from '../../Loding/loading'
  export default {
    data() {
      return {
          allMV:[]
      }
    },
    mounted() {
      var _this = this;
      this.$jsonp('http://v.yinyuetai.com/video/get-relate-videos?videoId=617005').then(function(res){
        res.videos.forEach(function(item,index){
          _this.allMV.push({
            title:item.title,
            listV:[],
            videoId:item.videoId
          })
          _this.getVideo(item.videoId,_this.allMV[index])
        })
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
            index.listV.push({
              headImage:res.videoInfo.coreVideoInfo.headImage,
              bigHeadImage:res.videoInfo.coreVideoInfo.bigHeadImage,
              videoUrlModels:res.videoInfo.coreVideoInfo.videoUrlModels,
              error:res.videoInfo.coreVideoInfo.error,
              errorMsg:res.videoInfo.coreVideoInfo.errorMsg,
            })
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
