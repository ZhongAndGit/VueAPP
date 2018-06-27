<template>
 <div>
   <top></top>
   <div id="myMusic">
     <div  style="width:100%;height:200px;margin-top: 42px ">
       我的音乐
     </div>
   </div>
 </div>

</template>
<script>
  import top from '../Top/top.vue';

  export default {
    components:{
      top, //上部标签菜单
    }
  }
</script>
