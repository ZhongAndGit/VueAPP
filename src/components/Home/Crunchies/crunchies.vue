<template>
    <div class="crunchies">
      <div class="CrunchiesList" v-for="(item,index) in crunchIes" @click="toHottestList(item.id,'gd')">
        <div class="item-img"><img :src="item.img" alt=""></div>
        <ul class="item-list">
          <li v-for="(it,idx) in item.listData">{{idx+1+"."+it.name +" - "+ it.ar[0].name}}</li>
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
            }
        },
        mounted() {

            var _this = this;
            var CrunchiesList = [];
            if(this.crunchIes === null){
              axios.get(_this.host+'/toplist').then(function(res){
                res.data.list.forEach(function(item,index){
                  CrunchiesList.push({
                    id:item.id,
                    listData:[],
                    img:item.coverImgUrl
                  })
                  _this.getListMusic(item.id,CrunchiesList[index])
                })
                console.log('新歌排行榜')
                console.log(CrunchiesList)
              })
              this.$store.commit('setCrunchIes',CrunchiesList);
            }
        },
      computed: {
        ...mapGetters([
           'crunchIes'
        ]),
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
<style lang="scss">
  @import '../../../assets/style/common.scss';

  $browser-default-font-size: 50px !default;
    @function pxTorem($px) {
      @return $px / $browser-default-font-size * 1rem;
  }

  .crunchies .CrunchiesList{
    height: px2rem(140px);
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .crunchies .CrunchiesList .item-img{
    width: px2rem(140px);
    height: px2rem(140px);
  }
  .crunchies .CrunchiesList .item-img>img{
    width: 100%;
  }
  .crunchies .CrunchiesList .item-list{
    flex: 1;
  }
  .crunchies .CrunchiesList .item-list>li{
    line-height: px2rem(45px);
    height: px2rem(45px);
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: left;
    padding:0 px2rem(20px);
  }
</style>
