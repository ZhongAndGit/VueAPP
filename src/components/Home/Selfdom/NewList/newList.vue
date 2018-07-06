<template>
    <div id="newList">
      <div>
        <p class="title">推荐榜单 ＞</p>
        <ul class="noeS">
          <li class="block_list" v-for="(item,index) in TopData" @click="toHottestList(item.id,item,'gd',item.name,item.picUrl)">
            <div class="img"><img style="width: 100%" :src="item.picUrl" ></div>
            <p class="first">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div style="clear: both;">
        <p class="title">最新专辑 ＞</p>
        <ul class="noeS">
          <li class="block_list" v-for="(item,index) in newData" @click="toHottestList(item.song.album.id,item,'zj',item.name,item.song.album.picUrl)" >
            <div class="img"><img style="width: 100%" :src="item.song.album.picUrl" ></div>
            <p class="two">{{item.name}}</p>
            <p class="two">{{item.song.artists[0].name}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
    export default {
    data () {
      return {
        host:this.$store.state.HOST,
        // list
        TopData:[],//存放推荐歌单
        newData:[],//存放最新歌单
        alone:[]//存放独家曲目
      }
    },
    mounted(){
      this.hottest();
      this.newsong();
    },
    methods: {
      hottest(){
        var _this = this;
        axios.get(this.host+'/personalized').then(function(res){
          _this.TopData = res.data.result
          console.log('推荐歌单')
          console.log(_this.TopData)
        })
      },
      newsong(){
        var _this = this;
        axios.get(this.host+'/personalized/newsong').then(function(res){
          _this.newData =res.data.result
          console.log('推荐新音乐')
          console.log(_this.newData)
        })
      },
      toHottestList(id,obj,type,name,picUrl){
          console.log(id)
        this.$router.push({path:'/musicDetail/'+id,query:{
            type:type,
            name:(name||''),
            picUrl:(picUrl||'')
        }})
      },
      toVideo(id){
        this.$router.push({path:'/playervideo/'+id})
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/style/common';

  $browser-default-font-size: 50px !default;
  @function pxTorem($px) {
  @return $px / $browser-default-font-size * 1rem;
  }
    #newList{
      width: 95%;
      margin: auto;
      font-size: pxTorem(12px);
    }
    #newList .title{
      padding-left:px2rem(20px);
      line-height:px2rem( 20px);
      margin:px2rem(10px) 0 ;
      text-align: left;
      border-left: px2rem(3px) solid red;
    }
    #newList .noeS{
      flex: 1;
      justify-content: space-between;
      display: -webkit-flex; /* Safari */
      display: flex;
      -webkit-flex-wrap: wrap; /* Safari 6.1+ */
      flex-wrap: wrap;
    }
    #newList .noeS .block_list{
        width: 32%;
        margin-bottom: px2rem(9px);
    }

    #newList .noeS .block_list:nth-child(2),
    #newList .noeS .block_list:nth-child(5),
    #newList .noeS .block_list:nth-child(8),
    #newList .noeS .block_list:nth-child(11)
    {
      margin-right: 2%;
      margin-left:2%;
    }

   #newList .noeS .block_list p,#newList .noeS .block_list_la p{
      margin: 0 auto;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: px2rem(20px);
    }
  #newList .noeS .block_list p.two{
    white-space:nowrap;
    line-height: px2rem(20px);
  }
</style>
