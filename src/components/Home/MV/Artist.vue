<template>
    <div class="artist">
      <div class="artist-name">
        <span v-for="(item,index) in artist" :id="item.id" @click="getVideo(item.id,item.artistName)">{{item.artistName}}</span>
      </div>
      <div class="artist-mv ">
        <h1 class="name">{{artistMV.name}}</h1>
        <div  v-for="(item,index) in artistMV.list"  v-if="item.name!=''" class="video-container">
          <video
            class="video-js vjs-default-skin vjs-big-play-centered"
            controlsList=" nodownload noremote"
            :poster="item.bigHeadImgUri"
            playsinline webkit-playsinline controls
            :src="item.videoUrl" type="video/mp4"
            width="450px"
            height="300px">
          </video>
          <div class="artist-title">{{item.title }}</div>
          <div class="artist-intro">{{item.content}}</div>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
  @import '../../../assets/style/common.scss';
  $browser-default-font-size: 50px !default;
  @function pxTorem($px) {
    @return $px / $browser-default-font-size * 1rem;
  }
  h1.name{
    font-size:pxTorem(25px);
    margin: px2rem(20px) auto;
    line-height: px2rem(50px);
    background: cadetblue;
    color: white;
  }
  .artist-mv .artist-intro{
    margin: 0 px2rem(5px);
    min-height: px2rem(60px);
    text-align: left;
    line-height: px2rem(30px);
  }
  .video-container{
    position: relative;
  }
  .artist-mv .artist-title{
    width: 80%;
    text-align: center;
    line-height: px2rem(30px);
    position: absolute;
    top:0;
    transform: translateX(-50%);
    left: 50%;
    color: white;
  }
</style>
<script>
  import Vloading from '../../Loding/loading'
  export default {
    data() {
      return {
        artist:[],
        artistMV:{
          name:'',
          list:[]
        }
      }
    },
    mounted() {
      var _this = this;
      let  hash = {};
      let  ob = [];
      this.$jsonp('http://v.yinyuetai.com/video/get-relate-videos?videoId=617005').then(function(res){
        for(var s in res.videos){
          for(var n in res.videos[s].artists){
            ob.push(res.videos[s].artists[n])
          }
        }
        const newArr = ob.reduceRight((item, next) => {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next);
          return item
        }, []);
        _this.artist = newArr;
      },function(){
        console.log('失败了呢')
      })
    },
    methods: {
      goback(index) {
        this.$router.go(index);
      },
      getVideo(id,name){
        var Pthis = this
        this.$jsonp('http://idol.yinyuetai.com/video/video-list?artistId='+id).then(function(res){
          Pthis.artistMV.name = name
          Pthis.artistMV.list = res.videos
          console.log(Pthis.artistMV)
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
