<template>
    <div class="loading" @click="reload">
      <img src="./loading.gif" alt="">
      <h1  v-if="msg" v-text="msg"></h1>
    </div>
</template>
<script>
  export default {
    props: {
      msg: {
        type: String,
        default: '正在加载中...'
      }
    },
    methods:{
      // 重新加载
      reload () {
        this.$emit('reload')
      }
    }
  }
</script>
<style>
.loading>img{
  width: 100%;
}
</style>
