<template>
  <div id="app">
    <Audio></Audio>
    <router-view ></router-view>
  </div>
</template>
<style>
  /*@import 'assets/style/common.scss';*/
  @import 'assets/style/reset.scss';
  @import 'assets/font/iconfont.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
<script>
  import Audio from '@/components/Audio/audio.vue'
  export default {
    components:{
      Audio
    }
  }
</script>
