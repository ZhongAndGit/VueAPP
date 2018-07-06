<template>
  <div id="play">
    <div class="bgcl" >
        <img :src="picUrl" alt="">
    </div>
    <div class="bgc2"></div>
    <div class="bgc3" @click="showSongsList =false" v-show="showSongsList"></div>
    <div class="header">
      <div class="iconfont icon-fanhui2" @click="goback(-1)"></div>
      <div class="title">
        <h3 class="song-name">{{title}}</h3>
        <span class="artist">{{artist}}</span>
      </div>
      <div class="iconfont  icon-chakantiezifenxiang"></div>
    </div>
    <div class="body">
        <transition name="fade">
          <div class="disc" v-show="!showLrc">
            <div class="disc-img"  >
              <img class="needle" src="./player-needle.png" alt="">
              <div class="transform-img" @click="showLrc=true" :style='{"animation": (isPlay?" 25s linear 0s normal forwards infinite rotate":"none")}'>
                <img :src="picUrl" alt="" class="trans-png">
                <img class="black-disc" src="./coverall.png">
              </div>
            </div>
            <ul class="muen">
              <li><span class="iconfont icon-follow"></span></li>
              <li><span class="iconfont icon-pinglun1" @click="toComment()"></span></li>
              <li><span  class="iconfont icon-xiazai" @click="download()"></span></li>
            </ul>
          </div>
        </transition>
        <transition name="fade">
          <div v-show="showLrc" @click="showLrc=false" class="word">
            <ul v-show="lrc.length" v-bind:style="{top:lrcTop}" class="word-list">
              <li v-for="(item,index) in lrc">
                {{item[1]}}
              </li>
            </ul>
            <ul v-show="!lrc.length" v-bind:style="{top:lrcTop}" class="word-list">
              <li style="color: white">暫無歌曲</li>
            </ul>
          </div>
        </transition>
    </div>
    <div class="footer">
      <div class="progress">
          <div class="start-time">-{{songTime}}</div>
          <div class="plan" ref="plan">
            <div ref="curProgress" class="plan_first" style="position: absolute" :style="{width: curLength+'%'}">
              <span class="dot"  @mousedown="down" @mousemove="move" @touchstart="touchstart" @touchmove="touchmove"></span>
            </div>
          </div>
          <div class="end-time">{{nowTime}}</div>
      </div>
      <div class="music-button">
        <ul>
          <li><span class="iconfont icon-icon--"></span></li>
          <li><span class="iconfont icon-shangyigeshangyiqu" @click="prev()"></span></li>
          <li>
            <span :class="playButtonUrl"  @click="togglePlay"></span>
          </li>
          <li><span class="iconfont icon-xiayigexiayiqu" @click="next()"></span></li>
          <li><span class="iconfont icon-liebiao" @click="showSongsList =true"></span></li>
        </ul>
      </div>
    </div>
    <div class="songs-box"  :style="{bottom:showSongsList?'0':'-70%'}">
        <div class="top">
          <span class="left">播放列表</span>
          <span class="right"><span class="iconfont icon-lajitong"></span>清除</span>
        </div>
        <div class="content">
          <ul >
            <li v-for="(item,index) in songsList" @click="toPlay(item.id)" :style="{color:(title===item.name)?'rgb(87,250,255)':'#6a6868',}">
              <div>
                <span>{{index+1}}</span>
                <span>{{item.name}}</span>
                <span>- {{  item.ar?item.ar[0].name:item.artists[0].name }}</span>
              </div>
                <span class="iconfont icon-chacha1"></span>
            </li>
          </ul>
        </div>
        <div class="bottom">
            <span @click="showSongsList =false">关闭</span>
        </div>
    </div>
  </div>
</template>
<script>

  import axios from 'axios'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        showSongsList: false,
        lrcTop: 200 + 'px',
        showLrc: false,
        touchStartX:0,
        progressLength: 0,
        isDown: false,
        curLength: 0,
        host: this.$store.state.HOST,
        songUrl: null,
        songName: '',
        songTime: '00:00',
        nowTime: '00:00',
      }
    },
    watch: {
      autoNext: function() {
        this.next();
      },
      isPlay: function(val) {
        if(val)
          this.$store.commit('setPlayButtonUrl',"iconfont icon-zanting");
        else
          this.$store.commit('setPlayButtonUrl'," iconfont icon-bofang");
      },
      duration: function() {
        this.songTime = this.formatSeconds(this.duration);
      },
      curTime: function() {
        this.nowTime = this.formatSeconds(this.curTime);
        this.songTime = this.formatSeconds(this.duration - this.curTime);
        this.curLength = (this.curTime/this.duration) * 100;
        if( this.lrc.length != 0 ) {
          for( var i = 0; i < this.lrc.length; i++) {
            if ( this.curTime >= this.lrc[i][0]) {
              for(var j = 0; j < this.lrc.length; j++){
                document.querySelectorAll('.word-list li')[j].style.color="rgba(255,255,255,0.7)"
              }
              if ( i >= 0 ) {
                this.lrcTop = -i * 30 + 180 + 'px';
                document.querySelectorAll('.word-list li')[i].style.color="rgb(87,250,255)";
              }
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'url',
        'songsList',
        'isPlay',
        'playButtonUrl',
        'id',
        'picUrl',
        'duration',
        'curTime',
        'title',
        'artist',
        'lrc',
        'listIndex',
        'autoNext',
      ])
    },
    mounted() {
     this.progressLength = this.$refs.plan.getBoundingClientRect().width;
      document.onmouseup = this.up;
      if( this.$route.params.id && this.id != this.$route.params.id) {
        this.$store.commit('setId',this.$route.params.id);
        this.getSongDetail()
      }
    },
    methods: {
      //  暂停\播放
      togglePlay() {
        if( this.isPlay ) {
          this.$store.commit('setIsPlay',false);
        }else {
          this.$store.commit('setIsPlay',true);
        }
      },
      // 获取歌词
      getLyric() {
        this.$store.commit('setLyric', []);
        this.$store.commit('setLrc', []);
        if(!this.id)
          return false;
        var _this = this;
        axios.get(this.host + '/lyric',{
          params: {
            id: _this.id
          }
        }).then(function(res) {
          console.log("获取歌词：");
          console.log(res.data);
          if(res.data.lrc){
            var lrc = _this.parseLyric(res.data.lrc.lyric);
            _this.$store.commit('setLyric',res.data.lrc.lyric);
            _this.$store.commit('setLrc',lrc);
          }else{
              console.log('无歌词')
          }
        })
      },
      //  获取歌曲详情
      getSongDetail() {
        var _this = this;
        axios.get(this.host+'/song/detail',{
          params: {
            ids: _this.id
          }
        }).then(function(res) {
          console.log("获取歌曲详情：");
          console.log(res.data.songs[0]);
          _this.getLyric();
          _this.$store.commit('setpicUrl',res.data.songs[0].al.picUrl);
          _this.$store.commit('setTitle',res.data.songs[0].name);
          _this.$store.commit('setArtist',res.data.songs[0].ar[0].name);
        })
      },
      //  鼠标按下拖拽按钮
      down() {
        this.isDown = true;
      },
      //  鼠标拖拽按钮
      move(e) {
        if( this.isDown ) {
          var curLength = this.$refs.curProgress.getBoundingClientRect().width;
          var newLength = ((curLength + e.movementX)/this.progressLength ) * 100;
          if(newLength > 100)
            newLength = 100;
          else if(newLength < 0)
            newLength = 0;
          this.curLength = newLength;
        }
      },
      //  松开鼠标
      up(){
        this.isDown = false;
      },
      //  触屏开始
      touchstart(e) {
        this.touchStartX = e.touches[0].pageX;
      },
      //  触屏拖拽
      touchmove(e) {
        if(!this.duration)
          return false;
        var movementX = e.touches[0].pageX - this.touchStartX ;
        var curLength = this.$refs.curProgress.getBoundingClientRect().width;
        //  计算出百分比
        var newPercent = ((curLength + movementX)/this.progressLength ) * 100;
        if(newPercent > 100)
          newLength = 100;

        this.curLength = newPercent;
        this.touchStartX = e.touches[0].pageX;
        //  根据百分比推出对应的播放时间
        this.changeTime(newPercent);
      },
      //  更改歌曲进度
      changeTime(percent) {
        let newCurTime = this.duration * ( percent * 0.01 );
        this.$store.commit('setChangeTime', newCurTime);
      },
      //  解析歌词
      parseLyric(text) {
        var lines = text.split('\n'),
          pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g,
          result = [];
        while (!pattern.test(lines[0])) {
          lines = lines.slice(1);
        };
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function(v, i , a) {
          var time = v.match(pattern),
            value = v.replace(pattern, '');
          time.forEach(function(v1, i1, a1) {

            var t = v1.slice(1, -1).split(':');
            if( value != "" && value != " ")
              result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          });
        });
        result.sort(function(a, b) {
          return a[0] - b[0];
        });
        return result;
      },
      //  解析时间
      formatSeconds(value) {
        var theTime = parseInt(value);
        var theTime1 = 0;
        var theTime2 = 0;
        if(theTime > 60) {
          theTime1 = parseInt(theTime/60);
          theTime = parseInt(theTime%60);
          if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
          }
        }
        if(parseInt(theTime)<10){
          var result = "0:0"+parseInt(theTime)+"";
        }else{
          var result = "0:"+parseInt(theTime)+"";
        }
        if(theTime1 > 0) {
          if(parseInt(theTime)<10){
            result="0"+parseInt(theTime);
          }else{
            result=parseInt(theTime);
          }
          result = parseInt(theTime1)+":"+result;
        }
        return result;
      },
      //  跳转至【评论】
      toComment() {
        if( this.id )
          this.$router.push({path: '/comment/' + this.id});
      },
      //  播放歌曲列表内容
      toPlay(id) {
          console.log(id);
        if( id && id != this.id ) {
          this.$router.replace({path: '/Player/' + id});
          this.$store.commit('setId', id);
          this.$store.commit('setIsPlay', false);
          this.getSongDetail();
        }
        this.showSongsList = false;
      },
      //  下一首
      next() {
        if( this.listIndex != -1 && this.songsList.length > 1  ) {
          if ( this.listIndex < (this.songsList.length-1) ) {
            this.toPlay(this.songsList[this.listIndex+1].id);
            this.$store.commit('setListIndex',this.listIndex+1);
          } else {
            this.$store.commit('setListIndex',0);
            this.toPlay(this.songsList[0].id);
          }
        }
      },
      //  上一首
      prev() {
        if( this.listIndex != -1 && this.songsList.length > 1  ) {
          if ( this.listIndex > 0 ) {
            this.$store.commit('setListIndex',this.listIndex - 1);
            this.toPlay(this.songsList[this.listIndex].id);
          } else {
            this.$store.commit('setListIndex', this.songsList.length-1 );
            this.toPlay(this.songsList[this.listIndex].id);
          }
        }
      },
      //  清空歌曲列表
      emptied() {
        this.$store.commit('setSongsList', []);
      },
      goback(index) {
        this.$router.go(index);
      },
      download(){
        console.log(document.querySelector('#player'))
      }
    }
  }
</script>
<style lang="scss" >
  @import '../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
  @function pxTorem($px) {
    @return $px / $browser-default-font-size * 1rem;
  }


  #play{
    position: fixed;
    top: 0;
    left: 0;
    bottom:0;
    right: 0;
    height: 100%;
    width: 100%;
    color: white;
    font-size: pxTorem(12px);
  }
  #play .header{
    border-bottom: px2rem(1px) solid rgba(255,255,255,0.4);
    width: 100%;
    margin: 0;
    display: flex;
    height: px2rem(70px);
    line-height: px2rem(70px);
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
  }
  #play .header .iconfont{
    width: 10%;
    height: 100%;
  }
  #play .header .title{
    width: 80%;
    text-align: center;
  }
  #play .header .title>h3,#play .header .title span{
    font-size: pxTorem(15px);
    height:px2rem(35px);
    line-height:px2rem(35px);
    overflow: hidden;
    text-overflow:ellipsis;
    width: 90%;
    margin:0 auto;
  }
  #play .header .title span{
    display: block;
    font-size: pxTorem(12px);
  }
  #play .bgcl{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    height: 100%;
    width: 100%;
    /*background: rgba(255,255,255,1);*/
    /*background: no-repeat;*/
    /*background-position: center;*/
    /*background-size:100%;*/
    /*object-position: center;*/
    /*-webkit-filter: blur(2px);*/
    /*-moz-filter: blur(2x);*/
    /*-ms-filter: blur(2px);*/
    /*-o-filter: blur(2px);*/
    /*filter: blur(2px);*/
  }
  #play .bgcl>img{
    /*width: 100%;*/
    height: 100%;
    object-fit: scale-down;
  }
  #play .bgc2{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.4)
  }
  #play .bgc3{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.7);
  }

  #play .body{
    height: 75%;
    width: 100%;
    overflow: hidden;
  }
  #play .body .disc .muen{
    width: 70%;
    margin:px2rem(100px) auto;
    display: flex;
    justify-content: space-between;
  }
  #play .body .disc .muen .iconfont{
   font-size: pxTorem(40px);
  }
  #play .body .disc .disc-img .needle{
    position: fixed;
    /*top: 8vh;*/
    left: calc(50% - 10px);
    width: px2rem(100px);
    z-index: 50;
    transform-origin:center;
    /*transform:rotate(7deg);*/
    /*-ms-transform:rotate(7deg); 	!* IE 9 *!*/
    /*-moz-transform:rotate(7deg); 	!* Firefox *!*/
    /*-webkit-transform:rotate(7deg); !* Safari 和 Chrome *!*/
    /*-o-transform:rotate(7deg);*/
  }
  @-webkit-keyframes rotate{
    from { -webkit-transform:rotate(0deg) }
    to { -webkit-transform:rotate(360deg) }
  }
  #play .body .disc .disc-img .transform-img{
    position: relative;
    top: px2rem(60px);
    width: px2rem(400px);
    padding-bottom: px2rem(400px);
    margin: auto;
    border: px2rem(15px) solid rgba(255,255,255,0.5);
    border-radius: 50%;
  }
  #play .body .disc .disc-img .transform-img .trans-png{
    position: absolute;
    transform: translate(50%,50%);
    top: -20%;
    left:-20%;
    border-radius: 50%;
    width: 70%;
    height: 70%;
  }
  #play .body .disc .disc-img .transform-img .black-disc{
    position: absolute;
    transform: translate(50%,50%);
    top: -50%;
    left:-50%;
    width: 100%;
    height: 100%;
  }
  #play .body .word{
    position: relative;
    height: px2rem(550px);
    overflow: hidden;
    /*margin-top: 40px;*/
    transition: all 1s;
  }
  #play .body .word .word-list{
    padding-top: 30px;
    position: absolute;
    width:100%;
    text-align: center;
    font-size: pxTorem(18px);
    line-height: 30px;
    color: rgba(145,145,145,0.7);
    transition: all 0.5s;
  }
  #play .body .word .word-list li{
    width: 90%;
    margin: auto;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }


  #play .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  #play .footer .progress{
    margin: px2rem(40px) auto;
    display: flex;
    justify-content: space-between;
  }
#play .footer .music-button ul{
  width: 90%;
  margin: px2rem(50px) auto;
  display: flex;
  justify-content: space-between;
}
  #play .footer .music-button span{
    display: inline-block;
  }
  #play .footer .music-button .iconfont {
    font-size: pxTorem(40px);
  }

  .start-time,.end-time{
    padding: 0 px2rem(40px);
  }
  .plan{
    height:px2rem(5px);
    line-height: px2rem(5px);
    background: rgba(255,255,255,0.2);
    border-radius: px2rem(5px);
    flex: 1;
    position: relative;
    top: px2rem(5px);
  }
  .plan .plan_first{
    height: inherit;
    width: 0%;
    max-width: 100%;
    background: rgb(87,250,255);
    border-radius: px2rem(5px);
  }
  .plan .plan_first .dot{
    width: px2rem(15px);
    height: px2rem(15px);
    border-radius: 50%;
    background: white;
    position: absolute;
    top:px2rem(-5px);
    right: px2rem(-7.5px);
  }

  #play .songs-box {
    position: fixed;
    bottom: -70%;
    width: 100%;
    height: 70%;
    overflow: hidden;
    flex-direction: column;
    display: flex;
    align-content:stretch;
    z-index: 99;
    transition: all 0.4s;
    color: #6a6868;
    background: rgba(255,255,255,0.9);
    font-size: pxTorem(17px);
    clear: both;
  }
  #play .songs-box .top{
      height: px2rem(50px);
      line-height: px2rem(50px);
      width: 100%;
      display: flex;
      justify-content: space-between;
  }
  #play .songs-box .top>span.left{
    margin-left: px2rem(30px);
  }
  #play .songs-box .top>span.right{
    margin: px2rem(10px) px2rem(20px);
    line-height: px2rem(30px);
    border-left: px2rem(2px) solid #c0bbbb;
  }
  #play .songs-box .top>span.right>span{
    padding-left: px2rem(10px);
    font-size: pxTorem(25px);
    vertical-align: middle;
  }

  #play .songs-box .content{
    width: 100%;
    flex: 1;
    overflow: auto;
    border-top:px2rem(1px) solid #ddd;
    border-bottom:px2rem(1px) solid #ddd;
  }
  #play .songs-box .content>ul::-webkit-scrollbar,#play .songs-box .content::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  #play .songs-box .content li{
    height: px2rem(50px);
    line-height: px2rem(50px);
    border-bottom: px2rem(1px) solid #ddd;
    display: flex;
    justify-content: space-between;
  }
  #play .songs-box .content li>div{
    width: 80%;
    overflow: hidden;
    text-align: left;
    padding-left: px2rem(20px);
  }
  #play .songs-box .content li>span{
    width: 10%;
    padding-right:px2rem(10px);
  }
  #play .songs-box .bottom{
    height: px2rem(50px);
    line-height: px2rem(50px);
    width: 100%;
  }
  #play .songs-box .bottom span{
    display: block;
  }
</style>
