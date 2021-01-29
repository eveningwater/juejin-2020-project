<template>
  <div class="main-live" v-if="showMainVisble">
      <a href="https://live.bilibili.com/9752139" target="_blank" rel="noopener noreferrer"></a>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
 setup(){
     const liveTime = 1611910800000;
     const state = reactive({
         showMainVisble:false
     })
     state.showMainVisble = !!(new Date().getTime() >= liveTime);
     return {
         ...toRefs(state)
     }
 }
}
</script>

<style lang="less">
    .base-style {
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .main-live {
        width: 100%;
        height: 206px;
        margin: 14px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/live_border.png');
        .base-style;
        a {
            .base-style;
            width: 86%;
            height: 180px;
            cursor: pointer;
            border-radius: 10px;
            background-image: url('../assets/video.jpeg');
        } 
    }
@media only screen and (min-width: 960px) {
    .main-live {
        height: 540px;
        margin-bottom: 30px;
        background-size: contain;
        a {
            width: 814px;
            height: 466px;
        }
    }
}
</style>