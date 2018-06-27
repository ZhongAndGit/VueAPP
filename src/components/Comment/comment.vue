<template>
    <div class="comment">
        <div class="bgcl" :style="{backgroundImage:'url('+picUrl+')'}"></div>
        <div class="comment-top">
          <div class="iconfont icon-fanhui2" @click="goback(-1)"></div>
          <div class=""><h2>评论</h2></div>
          <div class="iconfont" ></div>
        </div>
        <div class="artist " @click="toPlayer()">
          <div class="img"><img :src="picUrl" alt=""></div>
          <ul class="message">
            <li>{{title}}</li>
            <li>{{artist}}</li>
          </ul>
        </div>
        <div class="content">
          <div class="hot-comment">
            <h1 class="title">精彩评论</h1>
            <div class="item-list " v-for="(item,index) in hotComment">
              <div class="img"><img :src="item.user.avatarUrl" alt=""></div>
              <ul class="message-list">
                  <li class="much">
                    <ul>
                      <li class="name">{{item.user.nickname}}</li>
                      <li class="year qse">{{(new Date(item.time).getFullYear()+'年'+ new Date(item.time).getMonth()+'月'+new Date(item.time).getDate()+'日')}}</li>
                    </ul>
                    <div class="praise qse">{{item.likedCount}}<span class="iconfont icon-dianzan"></span></div>
                  </li>
                  <li class="product">{{item.content}}</li>
              </ul>
            </div>
          </div>
          <div class="new-comment">
            <h1 class="title">最新评论</h1>
            <div class="item-list " v-for="(item,index) in newComment">
              <div class="img"><img :src="item.user.avatarUrl"></div>
              <ul class="message-list">
                <li class="much">
                  <ul>
                    <li class="name">{{item.user.nickname}}</li>
                    <li class="year qse">{{(new Date(item.time).getFullYear()+'年'+ new Date(item.time).getMonth()+'月'+new Date(item.time).getDate()+'日')}}</li>
                  </ul>
                  <div class="praise qse">{{item.likedCount}}<span class="iconfont icon-dianzan"></span></div>
                </li>
                <li class="product">{{item.content}}</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import { mapMutations, mapGetters } from 'vuex'
  export default{
      data(){
          return{
              host:this.$store.state.HOST,
              hotComment:null,
              newComment:null,
          }
      },
      mounted(){
        if(this.$route.params.id){
            this.getComment();
        }
      },
      computed: {
        ...mapGetters([
          'picUrl',
          'title',
          'artist'
        ])
      },
      methods:{
        //  获取评论
        getComment(){
          var _this = this;
          axios.get(_this.host+'/comment/music',{
            params: {
              id: this.$route.params.id,
              limit:1
            }
          }).then(function(res){
              _this.newComment = res.data.comments;
              _this.hotComment = res.data.hotComments;
          })
        },
        toPlayer(){
          this.$router.push({path: '/Player/'});
        },
        //  返回上一页
        goback(index) {
          this.$router.go(index);
        }
      }
  }
</script>
<style>
  .comment .bgcl{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 160px;
    width: 100%;
    /* background-position: center top; */
    background-size: 100%;
    -webkit-filter: blur(25px);
    -moz-filter: blur(25x);
    -ms-filter: blur(25px);
    -o-filter: blur(25px);
    filter: blur(25px);
  }
 .comment .comment-top{
   background: rgba(0,0,0,0.2);
   color: white;
    width: 100%;
    margin: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 50px;
    line-height: 50px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
 .comment .comment-top .iconfont{
    width: 10%;
    height: 100%;
  }

  .comment .artist{
    color: white;
    display: flex;
    justify-content: space-between;
    flex: 1;
    flex-wrap: wrap;
  }
 .comment .artist .img{
   height: 90px;
   width: 90px;
   padding: 10px;
 }
 .comment .artist .img>img{
   width: 100%;
   height: 100%;
 }
 .comment .artist .message{
   flex: 1;
   line-height: 25px;
   text-align: left;
 }
 .comment .artist .message>li:first-child{
    margin-top: 30px;
 }
 .comment .title{
    line-height: 25px;
    background: rgba(0,0,0,0.5);
    color: white;
   text-align: left;
   padding-left: 10px;
 }
  .comment .item-list{
    display: flex;
    justify-content: space-between;
  }
  .comment .item-list .img{
    width: 50px;
    height: 50px;
    padding: 10px;
  }
  .comment .item-list .img>img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .comment .item-list .message-list{
    width: 90%;
    line-height: 25px;
    border-bottom: 1px solid #ddd;
  }
  .comment .item-list .message-list .praise{
    margin-right: 10px;
  }
  .comment .item-list .message-list .much{
    margin-top: 10px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .comment .item-list .message-list .product{
   margin-right: 10px;
    text-align: left;
  }
  .qse{
    color: #a3a3a3
  }
</style>
