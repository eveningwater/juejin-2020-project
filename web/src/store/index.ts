import { createStore } from "vuex";

export default createStore({
  state: {
    infoData: {
      'live_time':0
    },
    isLogin: false,
    isActivityEnd:false
  },
  mutations: {
    setInfoData(state,value){
      state.infoData = value;
    },
    setLoginState(state, value) {
      state.isLogin = value;
    },
    onActivityEnd(state,value){
      state.isActivityEnd = value;
    }
  },
  actions: {
    setInfoData({commit},value){
      commit('setInfoData',value);
    },
    setLoginState({ commit }, value) {
      commit("setLoginState", value);
    },
    onActivityEnd({commit},value){
      commit('onActivityEnd',value);
    }
  },
  modules: {},
});
