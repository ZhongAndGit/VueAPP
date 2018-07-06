<template>
  <div >
    <top></top>
    <div class="child-menTab" >
      <router-link
        :to="{path: '/home/' + item.loct}"
        :key="index"
        v-for="(item,index) in listV"
        tag="span"
        @click.native="toggle(index)">{{item.title}}</router-link>
    </div>
    <div class="conten" >
        <component :is="viewActive" ></component>
    </div>
  </div>
</template>
<style   lang="scss" >
  @import '../../assets/style/common.scss';

  .child-menTab{
    position: fixed;
    top: px2rem(60px);
    display: flex;
    justify-content: space-around;
    width: 100%;
    background: rgba(255,255,255,0.8);
    z-index: 8
  }
  .conten{
    position: absolute;
    width: 100%;
    top: px2rem(100px);
    left: 0;
  }
  .child-menTab span{
    flex: 1;
    border-bottom: px2rem(1px) solid rgba(255,255,255,0.8);
    line-height: px2rem(40px);
  }

  .child-menTab .router-link-active {
    border-color:red;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
  }
</style>
<script>

  import top from '../Top/top.vue'
  import selfdom from './Selfdom/selfdom'
  import crunchies from './Crunchies/crunchies'
  import mv from './MV/mv'
  import fm from './FM/fm'

  export default {
    data(){
      return{
        listV:[
          {loct:'selfdom',title:'个性'},
          {loct:'fm',title:'电台'},
          {loct:'mv',title:'音悦台MV'},
          {loct:'crunchies',title:'歌曲排行榜'}
        ],
        viewActive:'selfdom'
      }
    },
    mounted(){
      var yz = this.$route.path;
      this.viewActive = yz.substring(yz.lastIndexOf('/')+1)
    },
    components:{
      selfdom,//
      fm,
      mv,
      crunchies,
      top, //上部标签菜单
    },
    methods: {
      goback(index) {
        this.$router.go(index);
      },
      toggle(index){
        var _this  = this
        _this.viewActive = _this.listV[index].loct
      }
    }
  }
</script>
