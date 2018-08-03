<template>
  <div class="locale video-container" >
    <div  v-for="(item,index) in LocaleMV" :id="item.videoId" v-if="item.listV[0]" >
      <div class="title">{{item.title}}</div>
      <Vloading v-show="item.listV.error"></Vloading>
      <video
        class="video-js vjs-default-skin vjs-big-play-centered"
        controlsList=" nodownload noremote"
        :poster="item.listV[0].bigHeadImage"
        v-show="!item.listV.error"
        playsinline webkit-playsinline controls
        :src="item.listV[0].videoUrlModels[0].videoUrl" type="video/mp4"
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
        LocaleMV:[]
      }
    },
    mounted() {
      var _this = this;
      this.$jsonp('http://v.yinyuetai.com/video/get-guess-videos?videoId=3166775').then(function(res){
        res.videos.forEach(function(item,index){
          _this.LocaleMV.push({
            title:item.title,
            listV:[],
            videoId:item.url.substring(item.url.indexOf('o/')+2,item.url.lenght)
          })
          _this.getVideo(item.url.substring(item.url.indexOf('o/')+2,item.url.lenght),_this.LocaleMV[index])
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
