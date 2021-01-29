<template>
  <div class="countdown-container">
    <div :style="'margin-bottom:' + (isActivityEnd ? '10px' : '')">{{ isActivityEnd ? '活动已结束' : '打榜火热进行中…'}}</div>
    <div>
      <template v-if="isActivityEnd">活动时间：2021年1月23日 ～ 1月29日</template>
      <template v-else>
        直播颁奖倒计时:
        <div class="countdown-time">{{ time.day }}</div>天
        <div class="countdown-time">{{ filterTime(time.hour) }}</div>小时
        <div class="countdown-time">{{ filterTime(time.minute) }}</div>分
        <div class="countdown-time">{{ filterTime(time.second) }}</div>秒
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, watch } from "vue"; // @ is an alias to /src
import { useStore } from 'vuex';
import { filterTime } from '../utils/date'
export default {
  setup() {
    let endTime = 1611910800000;
    let startTime = 1611306000000;
    const store = useStore();
    const infoData = computed(() => store.state.infoData);
    watch(infoData,(val) => {
      if(val['start_time']){
        startTime = val['start_time'];
      }
      if(val['end_time']){
        endTime = val['end_time'];
      }
    })
    const state = reactive({
      time: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
    });
    const isActivityEnd = computed(() => store.state.isActivityEnd);
    const formatTime = (time:number) => {
      return [
        Math.floor(time / 1000 / 60 / 60 / 24),
        Math.floor((time / 1000 / 60 / 60) % 24),
        Math.floor((time / 1000 / 60) % 60),
        Math.floor((time / 1000) % 60)
      ];
    };
    let timer:any = null;
    const computedTime = () => {
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      const nowTime = new Date().getTime();
      const startDiff = start - nowTime;
      const endDiff = end - nowTime;
      let time:any = null;
      let bool = false;
      if(startDiff >= 0){
        time = formatTime(startDiff);
      }else if(endDiff >= 0){
        time = formatTime(endDiff);
      }else{
        bool = true;
      }
      if(!bool){
        state.time.day = time[0];
        state.time.hour = time[1];
        state.time.minute = time[2];
        state.time.second = time[3];
        return timer = setTimeout(computedTime, 1000);
      }else{
        state.time.day = 0;
        state.time.hour = 0;
        state.time.minute = 0;
        state.time.second = 0;
        if(timer)clearTimeout(timer);
      }
    };
    computedTime();
    const refState = toRefs(state);
    return {
      ...refState,
      filterTime,
      isActivityEnd
    };
  },
};
</script>

<style lang="less">
.countdown-container {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAACMCAMAAAC3SLpGAAAAaVBMVEUQGz8QGz8AAAAQGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz94dPQQGz9VVrh2cvFLTqZoZtlxbug/Q5ItNHESHUNgX8pcXMRHSp80On4iKl4hKl0XIUpSVLK1w407AAAAEXRSTlOA1QD8ibYI4Mn36KyjlpFbVDznBesAAAKISURBVHja7NZRSusAFEXRYEra90Ahl6QfRdD5j1IsDqIb1hrD5nCWt1/bx3UdeGH/rh/bM9Znshe9ErBe/pLdbjPf5/3Y4WUd9/N75rY9k73N49QrL+84H3P7TfYyj88dAj4fc3lbtnXOHRLOWbflfb68AiKOr3lfrkaWjnP+L+vcd4i4z7rM+AVkHDPLzA4ZkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiRLjGSJkSwxkiVGssRIlhjJEiNZYiT70469pSgMhEEU/u1O565JakANouDsf5FDMpvogvOt4TwUBTMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzNnso8NMPE4k31tgInXmexzA0w8z2S/LAOYeHzPZPXZAAsfSTFoYBrAw1ODhrioZO33DajcfVcu6mJSmQdpf/8A9fp979IwF02xaIymzwIql/smRi3RdioRzdRfgIr1UxNRNLaRVuU5AANz1poipUa5BFC9ktWkI9l0k8ZyC6BezbWM0jX9J5vWTkD1ujWdyR7aZeo4DVCx3E1Lmw5/9Xht8tbwmJYAAAAASUVORK5CYII=");
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  color: #fff;
  height: 70px;
  background-size: contain;
  line-height: 25px;
  text-align: center;
  padding: 3.25px;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
  .countdown-time {
    color: gold;
    font-size: 18px;
    font-weight: 600;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAzCAMAAAD2KDXHAAAAolBMVEUQGz8AAAAQGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz9IRLgQGz8jKWc9PKAuMX8aIlRGQrQxM4gRHEI6OpoeJV0WH0xDQK42N5MgJ2QbI1cVHko/PqYqLncTHUcnLHHfF/l8AAAAIXRSTlNUAMctG+r1RyHuw7uZfXFNNzQBxbSoh4ZaT0AQDgzg2Z6db6m2AAABGklEQVRIx+3XyVaDUBBF0cLQJaGNMX1ULiJtaJL4/78mT8LSKa9Yjjjz2uO6pDw6ensa2MHsjztlRc+Q6dU+/Spma6R1FQ4sbwBt1yveHEUSBxJlOWB3iqmhEoZUCbD7UZaoAvkS6GarGGguAaMQ763ygijgdIV+ptUc14BVDYNU3ANeX3Bohk+mEmE7irIZRbHIH0FZkzuCsiAaQXmalEmZlEmZlH9WXBRM5YYF+UhjnhJiTTOgZCHxHZZQcpaSABuhIGEglwbYkgogzeSRGoBDylwwUSyHZAXaDPHXiYpbmX0MrIxyiPQzKQdws7p/l5euCkXVwIq6HeCzGKffJOoCsmnu3320TCHRm31UOuXRaWbQsPae2h9/A+lEpvxOn489AAAAAElFTkSuQmCC);
    height: 26px;
    width: 35px;
    line-height: 25px;
    display: inline-block;
    text-align: center;
  }
}
@media only screen and(min-width:960px) {
  .countdown-container {
    position: absolute;
    top: 233px;
    font-size: 24px;
    background-image: unset;
    text-align: left;
    padding: 0;
    line-height: 28px;
    align-items: start;
    .countdown-time {
      font-size: 36px;
      width: 60px;
      height: 44px;
      line-height: 42px;
    }
  }
}
</style>
