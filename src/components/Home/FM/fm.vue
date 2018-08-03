<template>
    <div class="fm">
     <div class="fmList" v-for="(item,index) in fmData" >
        <div class="item-img"><img :src="item.picUrl" alt="">
          <span name="span"  :class="{'iconfont icon-bofang':item.program.mainTrackId != thisID||!djPlaye,'iconfont icon-zanting':item.program.mainTrackId === thisID&&djPlaye}" @click="toggPlay(item.program.mainTrackId,$event.target,$event)"></span>
        </div>
        <ul class="item-list">
          <li>{{item.name}}</li>
          <li>{{item.copywriter}}</li>
          <li>{{item.program.dj.nickname }}</li>
        </ul>
     </div>
      <audio :src="url"  id="DJplayer"  preload="true" @ended="ended"></audio>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        data() {
            return {
              host:this.$store.state.HOST,
              fmData:null,
              thisID:0,
              djPlaye:false,
              url:null,
            }
        },
        mounted() {
          var _this = this;
          axios.get(_this.host+'/personalized/djprogram').then(function(res){
            _this.fmData = res.data.result;
            console.log('電台列表')
            console.log(res.data)
          })
        },
        methods: {
          goback(index) {
            this.$router.go(index);
          },
          toggPlay(id, dom,event) {
            var _this = this;
            _this.thisID = id;
            var player =  document.querySelector('#DJplayer');
            axios.get(_this.host + '/music/url', {
              params: {
                id: id
              }
            }).then(function (res) {
              _this.url = res.data.data[0].url;
              if(_this.djPlaye){
                player.pause();
                console.log('暂停')
                _this.djPlaye = false;
              }else{
                player.play()
                console.log('开始')
                _this.djPlaye = true;
              }
            })
          },
          ended() {
            var _this = this;
            _this.djPlaye = false;
          }
        }
    }
</script>
<style lang="scss">
  @import '../../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
    @function pxTorem($px) {
      @return $px / $browser-default-font-size * 1rem;
  }

  .fm .fmList{
    height: px2rem(140px);
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .fm .fmList .item-img{
    width: px2rem(140px);
    height: px2rem(140px);
    position: relative;
  }
  .fm .fmList .item-img>span{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: pxTorem(50px);
    line-height: px2rem(140px);
    color: white;
  }
  .fm .fmList .item-img>img{
    width: 70%;
    margin-top: 15%;
    border-radius: 50%;
    border: px2rem(1px) solid #e91e63;
  }
  .fm .fmList .item-list{
    flex: 1;
  }
  .fm .fmList .item-list>li{
    line-height: px2rem(45px);
    height: px2rem(45px);
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: left;
    padding:0 px2rem(20px);
  }
</style>
