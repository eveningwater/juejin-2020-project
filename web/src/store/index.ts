import { createStore } from "vuex";

export default createStore({
  state: {
    annualUserInfo: null,
    liveUrl: "",
    isLogin: false,
  },
  mutations: {
    setVote(state, vote) {
      state.annualUserInfo = vote;
    },
    setLiveUrl(state, url) {
      state.liveUrl = url;
    },
    setLoginState(state, value) {
      state.isLogin = value;
    },
  },
  actions: {
    setVote({ commit }, vote) {
      commit("setVote", vote);
    },
    setLiveUrl({ commit }, url) {
      commit("setLiveUrl", url);
    },
    setLoginState({ commit }, value) {
      commit("setLoginState", value);
    },
  },
  modules: {},
});
