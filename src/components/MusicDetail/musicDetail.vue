<template>
    <div id="detail" >
      <div class="header">
        <div class="iconfont icon-fanhui2" @click="goback(-1)"></div>
        <h2>{{type}}</h2>
        <div class="iconfont  icon-shengyin" @click="toAudio"></div>
      </div>
      <div class="list-top">
          <div class="bgcl" :style="{backgroundImage:'url('+coverImgUrl+')'}"></div>
          <div class="img_wrap">
            <div class="left"><img  :src="coverImgUrl"  alt=""></div>
            <div class="right">
              <h2>{{name}}</h2>
              <div v-if="avatarUrl && type == '歌单'">
                <img :src="avatarUrl" alt="">
                <span style="margin-left: 0.3rem">{{nickname}}</span>
              </div>
              <div v-if="nickname && type == '专辑'">
                <span style="display: block;margin-bottom: 10px">{{nickname}}</span>
                <span style="display: block">发行时间：{{date}}</span>
              </div>
            </div>
          </div>
          <div class="pylst_intro">
            <div v-if="avatarUrl && type == '歌单'" class="tag">
              <span>标签：</span>
              <em v-for="(item,index) in tags">{{item}}</em>
            </div>
            <div class="descr_content" >
              <div class="descr_detail" >
                <span class="cont"><span class="title">简介：</span> {{description}}</span>
              </div>
            </div>

          </div>
      </div>
      <div class="listDetail">
        <h3>歌曲列表</h3>
        <div class="item" v-for="(item,index) in songslist" @click="toPlay(item.id,index)">
          <div class="sequence">
            <span>{{ index+1 }}</span>
          </div>
          <div class="song-msg">
            <h1 class='song-name'>{{ item.name }}</h1>
            <h4 class="description">{{ item.ar[0].name + ((item.ar[1] && item.ar[1].name)?'/'+item.ar[1].name:'') + (item.al?' - '+item.al.name:"") }}</h4>
            <div class="icon">
              <span class="iconfont icon-bofang1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'


  export default{
      id:'#detail',
      data(){
          return{
            host: this.$store.state.HOST,
            type: '',
            name: '',               //  标题
            creator: '',            //  作者
            coverImgUrl: null,      //  图片
            subscribedCount: 0,     //  收藏数
            commentCount: 0,        //  评论数
            shareCount: 0,          //  转发数
            avatarUrl: null,        //  作者头像
            nickname: '',           //  作者昵称
            songslist: null,        //  存放歌单数据
            date: '' ,               //  专辑发行时间
            description: '',           //  描述
            tags: null ,          //  标签
            show:false, //内容显示
          }
      },
      components:{

      },
      mounted(){
        if(this.$route.params.id){
            this.name= this.$route.query.name||'';
            this.coverImgUrl= this.$route.query.picUrl||null;
            if(this.$route.query.type== 'gd'){
                this.type ='歌单';
                this.getPlayList();
            }else if(this.$route.params.id && this.$route.query.type == 'zj'){
                this.type ='专辑';
                this.getAalbum();
            }
        }
      },
      methods:{
        goback(index){
              this.$router.go(index)
        },
        getPlayList(){
            var _this=this;
          axios.get(this.host + '/playlist/detail',{
            params: {
              id: this.$route.params.id
            }
          }).then(function(res){
            console.log("获取歌單的详细信息：");
              console.log(res.data)
            var detai = res.data.playlist;
            _this.subscribedCount = detai.subscribedCount;
            _this.commentCount = detai.commentCount;
            _this.shareCount = detai.shareCount;
            _this.name = detai.name;
            _this.coverImgUrl = detai.coverImgUrl;
            _this.avatarUrl = detai.creator.avatarUrl;
            _this.nickname = detai.creator.nickname;
            _this.songslist = detai.tracks;
            _this.date= detai.date;
            _this.description= detai.description;
            _this.tags= detai.tags
          })
        },
        getAalbum() {
          var _this = this;
          axios.get(_this.host + '/album',{
            params: {
              id: this.$route.params.id
            }
          }).then(function(res) {
            console.log("获取专辑的详细信息：");
            console.log(res.data);
            _this.subscribedCount = res.data.album.info.likedCount;
            _this.commentCount = res.data.album.info.commentCount;
            _this.shareCount = res.data.album.info.shareCount;
            _this.name = res.data.album.name;
            _this.coverImgUrl = res.data.album.picUrl;
            _this.songslist = res.data.songs;
            _this.nickname = res.data.album.artist.name;
            _this.description= res.data.album.description
            let _date = new Date(res.data.album.publishTime);
            _this.date =_date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDay();
          })
        },
        toPlay(id,index){
          this.$store.commit('setSongsList',this.songslist);
          this.$store.commit('setListIndex',index);
          this.$router.push({path: '/Player/' + id});
        },
        toAudio(){
          this.$router.push({path: '/Player/'});
        }
      }
  }
</script>
<style lang="scss">
  @import '../../assets/font/iconfont.css';
  @import '../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
    @function pxTorem($px) {
      @return $px / $browser-default-font-size * 1rem;
  }
  #detail{
    font-size: pxTorem(12px);
  }
  #detail .header{
    background: rgba(0,0,0,0.2);
    width: 100%;
    margin: 0;
    color: white;
    display: flex;
    height: px2rem(50px);
    line-height: px2rem(50px);
    justify-content: space-between;
  }
  #detail .header>div{
    margin: 0 px2rem(15px);
    text-align: center;
  }
  #detail .list-top{
    /*height: 30vh;*/
    background: rgba(0,0,0,0.3);
    color: white;
  }
  #detail .list-top .img_wrap{
    display: flex;
    justify-content: space-between;
  }
  #detail .list-top .img_wrap>div{
    width: 50%;
    height: px2rem(200px);
    text-align: left;
  }
  #detail .list-top .img_wrap .left{
    text-align: center;
    overflow: hidden;
  }

  #detail .list-top .img_wrap .left>img{
    width: 65%;
    margin-top: px2rem(20px);
  }
  #detail .list-top .img_wrap .right h2{
    margin: px2rem(20px) 0;
    line-height: px2rem(25px);
  }
  #detail .list-top .img_wrap .right img{
    width:px2rem(40px);
    height: px2rem(40px);
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  #detail .bgcl{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: px2rem(400px);
    width: 100%;
    /*background-position: center top ;*/
    background-size:100%;
    -webkit-filter: blur(25px);
    -moz-filter: blur(25x);
    -ms-filter: blur(25px);
    -o-filter: blur(25px);
    filter: blur(25px);
  }
  .pylst_intro{
    background: rgba(255,255,255,0.6);
    color: #666;
    text-align: left;
    padding: px2rem(20px);
    overflow: hidden;
  }
  .pylst_intro .tag{
   line-height: px2rem(30px);
  }
  .pylst_intro .tag>em{
    background: goldenrod;
    font-style: normal;
    border-radius: px2rem(2px);
    padding: px2rem(4px) px2rem(8px);
    margin-right: px2rem(5px) ;
  }
  .pylst_intro .descr_content{
    position: relative;
    /*line-height: 19px;*/
     min-height: px2rem(100px);
  }
  .pylst_intro .descr_content .descr_detail{
    position: absolute;
    top:0;
    height: 100%;
    width: 100%;
  }
  .pylst_intro .descr_content .descr_detail span.cont{
    overflow: hidden;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow-y:auto;
    line-height: px2rem(33px);
  }
  .listDetail .item{
    width: 100%;
    overflow: hidden;
    height: px2rem(70px);
    display: flex;
    justify-content: space-between;
  }

  .listDetail>h3{
    margin: 0 auto;
    /*width: 95%;*/
    padding: px2rem(10px) px2rem(20px);
    text-align: left;
    font-weight: normal;
    background-color: #eeeff0;
  }

  .listDetail .item .sequence{
    width: px2rem(40px);
    /*flex: 1;*/
  }
  .listDetail .item .sequence span{
    display: table-cell;
    vertical-align: middle;
    width:px2rem(40px);
    height: px2rem(70px);
  }
  .listDetail .item .song-msg{
    border-bottom: 1px solid #ddd;
    width: 90%;
    flex: 1;
    position: relative;
  }
  .listDetail .item .song-msg .song-name{
    font-size: pxTorem(15px);
    margin: 0px;
    padding: px2rem(10px) 0;
    text-align: left;
    overflow-x: hidden;
    text-overflow:ellipsis;
    width: px2rem(425px);
    /*display: inline-block;*/
    white-space:nowrap;
  }
  .listDetail .item .song-msg .description{
    font-size: pxTorem(12px);
    font-weight: normal;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: left;
    width: px2rem(425px);
    padding: px2rem(10px) 0;
    /*display: inline-block;*/
    color: #666;
    white-space:nowrap;
    margin: 0;
  }
  .listDetail .item .song-msg .icon{
    position: absolute;
    right: 0;
    top: 0;
    width: 10%;
    height: px2rem(70px);
  }
  .listDetail .item .song-msg .icon span{
    display: table-cell;
    vertical-align: middle;
    width: 10%;
    height: px2rem(70px);
  }
</style>
