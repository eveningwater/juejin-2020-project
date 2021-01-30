<template>
  <Header />
  <HomeCountDown />
  <MainLive />
  <HomeSign />
  <div>
    <HomeRankVote />
    <HomeSearch />
    <HomeRankButton />
    <HomeRank :listData="listData" />
  </div>
  <div id="loading" class="loading" :style="{ opacity: LoadingNum }">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<script lang="ts">
import Header from "../components/Header.vue";
import HomeCountDown from "../components/HomeCountDown.vue";
import HomeSign from "../components/HomeSign.vue";
import HomeRankVote from "../components/HomeRankVote.vue";
import HomeSearch, { emitter } from "../components/HomeSearch.vue";
import HomeRankButton from "../components/HomeRankButton.vue";
import HomeRank from "../components/HomeRank.vue";
import MainLive from "../components/MainLive.vue";
import { AxiosResponse } from "axios";
import  requestInstance from '../api/requestInstance';
import { onMounted, reactive, toRefs, nextTick } from "vue";
import { debounce } from "../utils/debounceFunction";
import { useRoute } from "vue-router";
interface SearchParams {
  'annual_id'?: string;
  'list_type'?: number;
  cursor?: string;
  keyword?: string;
}
export default {
  components: {
    Header,
    HomeCountDown,
    HomeSign,
    HomeRankVote,
    HomeSearch,
    HomeRankButton,
    HomeRank,
    MainLive,
  },
  setup() {
    const params = {
      'annual_id': "2020",
      'list_type': 0,
      cursor: "0",
      keyword: "",
    };
    const state = reactive({
      listData: [],
      LoadingNum: 0,
    });
    const request = requestInstance();
    const onSearchResult = (params: SearchParams) => {
      request.post("/list", params).then((res:AxiosResponse) => {
        if (res.data.code === 200) {
          if (!res.data.data.length) return;
          state.listData = state.listData.concat(res.data.data);
        }
      });
    };
    emitter.on("on-search", (value) => {
      params.keyword = value;
      params.cursor = "0";
      state.listData = [];
      nextTick(() => {
        onSearchResult(params);
      });
    });
    emitter.on("on-tab-change", (value) => {
      params.cursor = "0";
      params.keyword = "";
      params["list_type"] = value;
      state.listData = [];
      nextTick(() => {
        onSearchResult(params);
      });
    });
    const showLoading = () => {
      state.LoadingNum = 1;
      setTimeout(() => {
        state.LoadingNum = 0;
        setTimeout(() => {
          params.cursor = Number(params.cursor) + 20 + "";
          onSearchResult(params);
        }, 100);
      }, 1000);
    };
    const route = useRoute();
    const scrollHandler = () => {
      if (route.path !== "/") return;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement || document.body;
      if (scrollTop + clientHeight >= scrollHeight - 65) {
        showLoading();
      }
    };
    onMounted(() => {
      onSearchResult(JSON.parse(JSON.stringify(params)));
      nextTick(() => {
        window.addEventListener("scroll", debounce(scrollHandler, 20));
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.loading {
  opacity: 0;
  display: flex;
  transition: opacity 0.4s ease-in-out;
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  .circle {
    background-color: #ffffff;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 5px;
    animation: bounce 0.5s ease-in infinite;
    &:nth-of-type(2) {
      animation-delay: 0.1s;
    }
    &:last-of-type {
      animation-delay: 0.2s;
    }
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@media only screen and (min-width: 960px) {
  .loading {
    bottom: 60px;
  }
}
</style>
