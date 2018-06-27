<template>
    <div class="selfdom">
      <Ecar></Ecar>
      <Ctop></Ctop>
      <Clist></Clist>
    </div>
</template>
<script>
    import axios from 'axios'
    import Ecar from './Carousel/Carousel.vue'
    import Ctop from './Search/search.vue'
    import Clist from './NewList/newList.vue'

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
        },
      components:{
        Ctop,//
        Ecar,//轮播图
        Clist, //音乐榜单
      }
    }
</script>
<style>

</style>
