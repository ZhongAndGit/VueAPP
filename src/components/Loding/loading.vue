<template>
    <div class="loading">
      <img src="./loading.gif" alt="">
      <h1  v-if="msg" v-text="msg"></h1>
    </div>
</template>
<script>
  export default {
    mounted() {
      var _this = this;
      setTimeout(function() {
        _this.msg = '若长时间未加载成功可以退出重试..'
      },40000)
    },
    props: {
      msg: {
        type: String,
        default: '正在加载中...'
      }
    }
  }
</script>
<style>
.loading>img{
  width: 100%;
}
</style>
