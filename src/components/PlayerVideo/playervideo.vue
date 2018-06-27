<template>
  <div class="mv">
    <div class="title">恐龙时代恐龙时代恐龙时代</div>
    <video controls controlsList=" nodownload"  name="media">
      <!--controlsList=" nofullscreen nodownload noremote footbar"-->
      <source src="http://vt1.doubanio.com/201806251217/645ccca1b64b50c410e3180c531bda3f/view/movie/M/302300185.mp4" type="video/mp4">
    </video>
    <div  class="Mst">
      <div class="Vactive"><span class="iconfont icon-bofang "></span></div>
      <div id="controls">
        <div class="Vmenu">
          <div class="Vtime">00:00 / 00:00</div>
          <div class="Vset">
            <div class="voice"><span class="iconfont icon-iconset0260"></span></div>
            <div class="full"><span class="iconfont icon-icon-2"></span></div>
          </div>
        </div>
        <div class="Vitem">
          <div class="conts">
            <div class="plan">
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      goback(index) {
        this.$router.go(index);
      }
    }
  }
</script>
<style >
  .mv .title{
    font-size: 15px;
    height: 50px;
    line-height: 25px;
    text-align: left;
    padding:0 10px;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  #controls{
    background: black;
    color: white;
    font-size: 13px;
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 94%;
    padding: 0 3%;
  }
  #controls .Vmenu {display: flex;justify-content: space-between;flex: 1;padding: 5px 0;}
  #controls .Vitem{padding: 10px 0;}
  #controls .Vitem .conts{
    width: 100%;
    background: gray;
    height: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    position: relative;
  }
  #controls .Vitem .conts .plan{
    width: 10%;
    background: rgba(255,255,255,1);
    height: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    position: absolute;
    top: 0;
  }
  #controls .Vitem .conts .plan .dot{
    background: rgba(255,255,255,1);
    height: 12px;
    width: 12px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    position: absolute;
    top: -4px;
    right: -6px;
  }
  #controls .Vmenu .Vset{width: 50px;display: flex;justify-content: space-between;}
  .mv{position: relative}
  .mv .Mst{position: absolute;top: calc(50px);left: 0;right: 0;bottom: 0;}
  .mv .Mst .Vactive{position: absolute;top:calc(50% - 50px);left: 50%;transform: translate(-50%,calc(-50% + 50px))}
  .mv .Mst .Vactive>span{font-size: 50px;color: white;}
  video{width: 100%;}
  video::-webkit-media-controls-fullscreen-button{ display: block; }/*全屏*/
  video::-internal-media-controls-download-button {display:none;}
  video::-webkit-media-controls-enclosure {overflow:hidden;}
  video::-webkit-media-controls-panel {width: calc(100% + 30px);}
</style>
