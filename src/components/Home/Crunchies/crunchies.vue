<template>
    <div class="crunchies">
      <div class="CrunchiesList" v-for="(item,index) in CrunchiesList" @click="toHottestList(item.id,'gd')">
        <div class="item-img"><img :src="item.img" alt=""></div>
        <ul class="item-list">
          <li v-for="(it,idx) in item.listData">{{idx+1+"."+it.name +" - "+ it.ar[0].name}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
              host:this.$store.state.HOST,
              CrunchiesList:[]
            }
        },
        mounted() {

            var _this = this;
            axios.get(_this.host+'/toplist').then(function(res){
              res.data.list.forEach(function(item,index){
                _this.CrunchiesList.push({
                  id:item.id,
                  listData:[],
                  img:item.coverImgUrl
                })
                _this.getListMusic(item.id,_this.CrunchiesList[index])
              })
              console.log('新歌排行榜')
              console.log(_this.CrunchiesList)
            })
        },
        methods: {
            goback(index){
                this.$router.go(index);
            },
            getListMusic(id,index){
              axios.get(this.host + '/playlist/detail', {
                params: {
                  id: id
                }
              }).then(function(res) {
                if( res.data && res.data.playlist && res.data.playlist.tracks ) {
                  for(let i = 0; i<3; i++)
                    index.listData.push(res.data.playlist.tracks[i]);
                }
              })
            },
          toHottestList(id,type){
            this.$router.push({path:'/musicDetail/'+id,query:{
                type:type,
              }})
          },
        }
    }
</script>
<style>
  .crunchies {
    margin-top: 12vh;
  }
  .crunchies .CrunchiesList{
    height: 120px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .crunchies .CrunchiesList .item-img{
    width: 120px;
    height: 120px;
  }
  .crunchies .CrunchiesList .item-img>img{
    width: 100%;
  }
  .crunchies .CrunchiesList .item-list{
    flex: 1;
  }
  .crunchies .CrunchiesList .item-list>li{
    line-height: 35px;
    height: 35px;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: left;
    padding:0 20px;
  }
</style>
