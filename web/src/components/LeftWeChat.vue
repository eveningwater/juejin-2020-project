<template>
  <div class="rank-wechat">
      <img src="../assets/wechat.png" alt="图片加载中">
      <p v-for="(text,index) in chatTextList" :key="text + index">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
      const state = reactive({
          chatTextList:['添加好友','进群每天赢好礼','创作者回复【作者】','投票者回复【投票】']
      })
      return {
          ...toRefs(state)
      }
  },
};
</script>

<style lang="less" scoped>
.rank-wechat {
  display: none;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(data:image/png;base64,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);
  padding: 16px 6px;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
      margin-bottom: 5px;
      border-style: none;
  }
  p {
      color: #fff;
      font-size: 12px;
      margin: 0;
      padding: 0;
  }
}
@media only screen and (min-width: 960px) {
    .rank-wechat{
        display: flex;
        left: -121px;
        top: 11px;
        img {
            width: 86px;
        }
    }
    .info-box{
        .rank-wechat{
            top: 0;
            left: -132px;
        }
    }
}
</style>