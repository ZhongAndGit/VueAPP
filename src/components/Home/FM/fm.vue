<template>
    <div class="fm">
     <div class="fmList" v-for="(item,index) in fmData" >
        <div class="item-img"><img :src="item.picUrl" alt="">
          <span name="span" :class="classBT" @click="togglePlay(item.program.mainTrackId,$event.target )"></span>
        </div>
        <ul class="item-list">
          <li>{{item.name}}</li>
          <li>{{item.copywriter}}</li>
          <li>{{item.program.dj.nickname }}</li>
        </ul>
     </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        data() {
            return {
              host:this.$store.state.HOST,
              fmData:null,
              thisID:0,
              classBT:'iconfont icon-bofang',
              classBTa:'iconfont icon-zanting'
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
          var _this = this;
          axios.get(_this.host+'/personalized/djprogram').then(function(res){
            _this.fmData = res.data.result;
            console.log('電台列表')
            console.log(res.data)
          })
        },
        watch:{
          isPlay: function(val) {
            if(val)
              this.$store.commit('setPlayButtonUrl',"iconfont icon-zanting");
            else
              this.$store.commit('setPlayButtonUrl',"iconfont icon-bofang");
          },
        },
        methods: {
            goback(index) {
                this.$router.go(index);
            },
            togglePlay(id,dom) {
              var _this = this;
              var alist = document.getElementsByName("span");
                if(alist){
                  for(var idx = 0; idx < alist.length; idx ++){
                    var mya = alist[idx];
                    mya.className = _this.classBT;
                  }
                }
              if( this.isPlay ) {
                this.$store.commit('setIsPlay',false);
                dom.setAttribute('class',_this.classBT);
              }else {
                dom.setAttribute('class',_this.classBTa);
                  _this.thisID = id;
                  axios.get(_this.host+'/music/url',{
                    params:{
                      id:id
                    }
                  }).then(function(res){
                    _this.$store.commit('setId',id);
                    _this.getSongDetail();
                  })
                this.$store.commit('setIsPlay',true);
              }
            },
            getSongDetail() {
            var _this = this;
            axios.get(this.host+'/song/detail',{
              params: {
                ids: _this.id
              }
            }).then(function(res) {
              _this.getLyric();
              _this.$store.commit('setpicUrl',res.data.songs[0].al.picUrl);
              _this.$store.commit('setTitle',res.data.songs[0].name);
              _this.$store.commit('setArtist',res.data.songs[0].ar[0].name);
            })
          },
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
              if(res.data.lrc){
                var lrc = _this.parseLyric(res.data.lrc.lyric);
                _this.$store.commit('setLyric',res.data.lrc.lyric);
                _this.$store.commit('setLrc',lrc);
              }else{
                console.log('无歌词')
              }
            })
          },
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
