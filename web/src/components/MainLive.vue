<template>
  <div class="main-live" v-if="showMainVisble">
    <a
      href="https://live.bilibili.com/9752139"
      target="_blank"
      rel="noopener noreferrer"
    ></a>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const liveTime: ComputedRef<number> = computed(
      () => store.state.infoData["live_time"]
    );
    const state = reactive({
      showMainVisble: false,
    });
    const setMainVisible = (time: any) => {
      time = time || 0;
      state.showMainVisble = !!(new Date().getTime() >= time * 1000);
      store.dispatch("onActivityEnd", state.showMainVisble);
    };
    watch(() => liveTime.value,(val) => setMainVisible(val));
    setMainVisible(liveTime);
    return {
      ...toRefs(state),
    };
  },
};
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
  background-image: url("../assets/live_border.png");
  .base-style;
  a {
    .base-style;
    width: 86%;
    height: 180px;
    cursor: pointer;
    border-radius: 10px;
    background-image: url("../assets/video.jpeg");
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