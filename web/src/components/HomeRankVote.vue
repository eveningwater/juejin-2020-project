<template>
  <div class="rank-vote-container">
    <span>今日剩余票数</span>
    <span
      >Web 端 x <em>{{ userInfo["web_login_vote"] }}</em></span
    >
    <span
      >App 端 x <em>{{ userInfo["app_login_vote"] }}</em></span
    >
    <span
      >App分享票 x <em>{{ userInfo["app_share_vote"] }}</em></span
    >
  </div>
</template>

<script lang="ts">
import { computed, watch, nextTick, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      userInfo: {
          'web_login_vote':0,
          'app_login_vote':0,
          'app_share_vote':0
      },
    });
    const store = useStore();
    const userInfo = computed(() => store.state.annualUserInfo);
    watch(userInfo, (u) => {
      u &&
        nextTick(() => {
          state.userInfo = u;
        });
    });
    const refState = toRefs(state);
    return {
      ...refState,
    };
  },
};
</script>

<style lang="less">
.rank-vote-container {
  margin: 10px 0 5px;
  display: flex;
  color: #ffd900;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  span {
    margin-right: 5px;
    &:first-child {
      margin-right: 8px;
    }
    em {
      font-style: normal;
      color: #fc676a;
      font-size: 16px;
    }
  }
}
@media only screen and (min-width: 960px) {
  .rank-vote-container {
    font-size: 18px;
    margin: 10px 0 14px;
    span {
      margin-right: 15px;
      em {
        font-size: 24px;
      }
    }
  }
}
</style>
