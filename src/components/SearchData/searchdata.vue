<template>
   <div>
      <div class="search-k">
        <div class="input"><input type="text" placeholder="搜索音乐" v-model="key" @keyup="get(key)"></div>
        <div class="button"><button @click="goback(-1)">取消</button></div>
      </div>
     <ul class="list-music">
        <li class="item" v-for="(item,index) in songslist" @click="toPlay(item.id,index)">
          <div class="img"><img :src="item.artists[0].img1v1Url" alt=""></div>
          <ul class="name">
            <li>{{item.name}}</li>
            <li>{{item.artists[0].name}}</li>
          </ul>
        </li>
     </ul>
   </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
      return{
        key:'',//
        songslist:null,
      }
    },
    mounted(){
        if(this.$route.params.key){
            this.key = this.$route.params.key;
            this.get();
        }
    },
    methods:{
      get(){
        var _this= this;
        if(_this.key != ''){
          axios.get(this.$store.state.HOST+'/search?keywords='+_this.key).then(function(res){
            _this.songslist = res.data.result.songs;
            console.log( res.data.result.songs)
          })
        }
      },
      toPlay(id,index){
        this.$store.commit('setSongsList',this.songslist);
        this.$store.commit('setListIndex',index);
        this.$router.push({path: '/Player/' + id});
      },
      goback(index){
        this.$router.go(index);
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
    @function pxTorem($px) {
      @return $px / $browser-default-font-size * 1rem;
  }
  .search-k{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1;
    height: px2rem(60px);
    z-index: 10;
    background: rgba(0,0,0,1);
  }
  .search-k .input{
    width: 80%;
    height: px2rem(40px);
    line-height: px2rem(40px);
    -webkit-border-radius: px2rem(20px);
    -moz-border-radius: px2rem(20px);
    border-radius: px2rem(20px);
    background: white;
    margin: auto;
  }
  .search-k .input input{
    line-height: px2rem(40px);
    width: 90%;
    -webkit-border-radius: px2rem(20px);
    -moz-border-radius: px2rem(20px);
    border-radius: px2rem(20px);
    border-style: none;
    outline: none;
  }
  .list-music{
    position: absolute;
    top: px2rem(60px);
    left: 0;
    right: 0;
    bottom: 0;
  }
  .list-music .item{
    height: px2rem(60px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  .list-music .item .img{
    height: px2rem(55px);
    padding: px2rem(2.5px);
  }
  .list-music .item .name{
    width: 100%;
    flex: 1;
    text-align: left;
    padding-left: px2rem(10px) ;
  }
  .list-music .item .name li{
    height: px2rem(30px);
    line-height: px2rem(30px);
    overflow: hidden;
    vertical-align: middle;
    text-overflow:ellipsis;
  }
  .list-music .item .img img{
    height: 100%;
  }
  button{
    border: 0px;
    background-color: transparent;
    color: white;
    outline: none;
    width: 100%;
    height: 100%;
    display: inline-table;
  }
</style>
