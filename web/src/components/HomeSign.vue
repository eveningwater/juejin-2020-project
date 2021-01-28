<template>
  <div class="signup-container">
    <div class="signup-participators">
      <div class="signup-avator">
        <a
          v-for="(item, index) in infoData.recently_user"
          :key="item.user_id + index"
          :href="infoData.live_url + '/user/' + item.user_id"
          :title="item.user_name"
          :style="{ 'background-image': 'url(' + item.avatar_large + ')' }"
          class="signup-avator-item"
          target="link"
        ></a>
      </div>
      <div class="signup-text">
        已有{{ infoData.select_cnt }}名创作者参加
      </div>
    </div>
    <div class="signup-btn-group">
      <div class="signup-button" @click="onJoin"></div>
      <router-link to="/info">
        <div class="signup-button-info"></div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive,toRefs,watchEffect } from "vue";
import { useStore } from 'vuex'
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      infoData: {
        'live_url': "",
        'recently_user': [],
        'select_cnt': 1218,
        'start_time': 0,
        'end_time': 0,
        'annual_user_info':null
      },
    });
    axios
      .post("http://localhost:8081/info", {
        'annual_id': "2020",
        'app_id': 2608,
      })
      .then((res) => {
        if (res.data.code === 200) {
          state.infoData = res.data.data;
          state.infoData.recently_user.reverse();
        }
      });
    const store = useStore();
    watchEffect(() => {
        const annualUserInfo = state.infoData['annual_user_info'];
        if(annualUserInfo){
            store.dispatch('setVote',annualUserInfo);
            store.dispatch('setLiveUrl',state.infoData['live_url']);
        }
    })
    const refState = toRefs(state);
    const onJoin = () => {
      const isLogin = store.state.isLogin;
      if(!isLogin){
        location.href = "https://juejin.cn/login"
      }else{
        alert('开发中...')
      }
    }
    return {
        ...refState,
        onJoin
    };
  },
};
</script>

<style lang="less" scoped>
.signup-container {
  height: 100.5px;
  margin: 15px 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAADJCAMAAADo3SGZAAAARVBMVEUQGz8QGz8QGz8AAAAQGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz8QGz+/yT+NAAAAFnRSTlMz8REAilMHYObe9676NX441ZqXaWZGR19VJQAAAv9JREFUeNrs2IFpI0EQBdE5NCt7LQkdGDr/UA+dcQ4qeC+Gomn+urxcj9t5H3hbf/7ejuvl5X+yxznw9s7jN9k9c+7jueBtPY99zuyfZPd87ceCN/fY99mvZI+5fy8I+L7PcVnXz9kLEvZ8XtfHnL4CIh7nfKybI0vHnts651gQccy5vsa6RcZz7mtmQcaMZEmRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMn+Y6cOSAAAABiE9W99HkPYMojESJYYyRIjWWIkS4xkiZEsMZIlRrLESJYYyRIjWWIkS4xkiZEsMZIlRrLESJYYyRIjWWIkS4xkiZEsMZIlRrLESJYYyRIjWWIkS4xkiZEsMZIlRrLESJYYyRIjWWIkS4xkiZEsMU8WUlyWFMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWGMkSI1liJEuMZImRLDGSJUayxEiWtVsHNwjDQBREFxZsywETUPL7L5XkkB78pXk1zGHMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMkCzMSPHSJwATH72i6RmAiadaLHoEYOKhJarWdwAW3qtqlKYRgIWhViKreg3AQO2qGZk/9cEbYH6j65dnsuUrrWMPYGL7WKVvOZM91Cap34BpdUmt5iHyVLblJmBibdlKniIv5Q5Mq+TlD8A0N4aY/Wy7AAAAAElFTkSuQmCC);
  .button {
    width: 140.5px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .signup-participators {
    display: flex;
    padding: 8px 0;
    align-items: center;
    justify-content: center;
    .signup-text {
      font-size: 13px;
      font-weight: 400;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #ffd900;
    }
    .signup-avator {
      margin-right: 10px;
      margin-left: 24px;
      display: inline-flex;
      flex-wrap: wrap;
      overflow: hidden;
      .signup-avator-item {
        width: 53px;
        height: 53px;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-left: 0;
        border: 1px solid #e3e3e3;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
      }
    }
  }
  .signup-btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .signup-button {
      width: 140.5px;
      height: 41px;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      background-image: url(data:image/png;base64,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);
      background-size: contain;
      background-repeat: no-repeat;
    }
    a {
      background-color: transparent;
      .signup-button-info {
        cursor: pointer;
        .button;
        background-image: url(data:image/png;base64,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);
      }
    }
  }
}
@media only screen and (min-width: 960px) {
  .signup-container {
    .button-pos {
      position: absolute;
      top: 74px;
      width: 212px;
      height: 65px;
    }
    position: absolute;
    left: 0;
    top: 330px;
    height: 139px;
    background-image: unset;
    .signup-participators {
      padding: 0;
      .signup-text {
        font-size: 21px;
        text-align: left;
        color: #fff;
      }
      .signup-avator {
        margin-left: 0;
        height: 53px;
        .signup-avator-item {
          width: 51px;
          height: 51px;
        }
      }
    }
    .signup-btn-group {
      .signup-button {
        left: 0;
        top: 74px;
        width: 212px;
        height: 65px;
        position: absolute;
      }
      a {
        .signup-button-info {
          .button-pos;
          left: 223px;
        }
      }
    }
  }
}
</style>
