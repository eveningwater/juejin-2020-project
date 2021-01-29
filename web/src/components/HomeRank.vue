<template>
  <div class="rank-list">
    <div
      class="rank-card"
      v-for="(card, index) in listData"
      :key="card.user_id + index"
    >
      <div class="rank-card-item">
        <a
          :href="liveUrl + '/user/' + card.user_id"
          target="_blank"
          rel="noopener noreferrer"
          class="rank-card-item-avator"
        >
          <div
            class="rank-card-item-level"
            :style="
              card.rank >= 1 && card.rank <= 3
                ? {
                    'background-position': '0px 0px',
                    'background-size': '100%',
                    'margin-top': isApp ? '7px' : '11px',
                    'margin-bottom': '0px',
                    'height': isApp ? '117px' : '153.5px',
                    'background-image':
                      'url(' +
                      require('../assets/avatar_background_' +
                        (index + 1) +
                        '.png') +
                      ')',
                  }
                : {
                    'background-image':
                      'url(' + require('../assets/avatar_background.png') + ')',
                  }
            "
          >
            <img :src="card.user_info.avatar_large" alt="图片加载中" />
          </div>
        </a>
        <div class="rank-card-item-userinfo">
          <a
            :href="liveUrl + '/user/' + card.user_id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="rank-card-item-username">
              <span>{{ card.user_info.user_name }}</span>
              <img
                :src="require('../assets/lv-' + card.user_info.level + '.svg')"
                alt="图片加载中"
                v-if="card.user_info.level > 0 && card.user_info.level <= 7"
              />
            </div>
          </a>
          <div class="card-profile">
            <img
              src="data:image/png;base64,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"
              alt="图片加载中"
            />{{ card.user_info.job_title
            }}{{
              card.user_info.company
                ? "&nbsp;@&nbsp;" + card.user_info.company
                : ""
            }}
          </div>
          <div class="card-vote">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAA8CAYAAADBqyytAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABWhJREFUeNrsm3tMU1cYwHvhlhZoKUXKQ4sBWQlGyuQRkGwxWwZOXcyyGRenC8uWmUiM2eYjm3/s9RdbpnMJWdgrW0amLjPOLEanFrNlyQYaHhtqJFSEYAtShFJapC/afV93u1w7aO+Fenux5yTfObeXy+U7v/txzvfopfx+v4S0yC2BIODW6MXeQK19YkkDsJp+IxYVzUaFW6PAWuphWAeyFiTpIWXgBvkLpB2sq4UXKACkgeEDkKo4M5wrIO8BsDGua9T7CGlFboF825bd2sL8EiWdSD+U/6beWa+vf/Ca/eSZz03mkYEqZu57IloUWNOLMOxfnpMvO9hwtFguT6HjwZScznvej5vf7B2+M+iCj0fAqk5EWswfw+75zbtWxAskbDhXnDObQSRQZdgVFZaq4m1nY825jAsoGXZSOinuXAfWnGXEjyIhDAFFQBFQJHvAIyq33XWNjt2eEXIy2Zq8ZLUqUyYUKAwQ1/YPXp9KTVHSmRm5cpqW8ra8XmOXreXkkdtCgqrftj+vpnJDFu8wxuvx3Z0YcU7fs3tZDCKCakdQh5v3GQMX0FJqta5cUVOxYdmja2oyEhISKZ56/C4Qp/V8Lvb5Zv1/X2+b+LPjwnjvzW4HwPKHMAgPCmKcr5lkHHqnarhB0dUbl+0o2Rrt8M6tb6zUFej5eO25YltvjANXbcdOfTo0OmZys0734fRBupEBpzWKfSFAwzzUJhS4ceXRLw7e3FJXn73pqR1ajnrpxATpl0vHTWcMLaNMMqADT6HAnN3hfo/iU1wAaIdg2IrHG5/crnl24ysr57t2ZsbhnXJMeoSEkKZIlyYnK+bdoH4+/+3Q+V9/COaaTjV/dKFx+05uaz/FtwoDsEph+AaPX37hQN66irosyRJo7Z0Gy3c/Hg5uLq8CpB484AqK924GJop/AC1Lcvx0kwndALFDQh1PnG4yMx8PBSE9cIcTYBlgOOvxuPznWr8fFjso1NHtcflQZ4BkENoz/wy7tk6D1TFt84gVEuqGOrJ1FhQUWJUFhtbZWa8fXAerWEFd671iRR1RV7AmS6xCmFaQWvBLHKEesR12vIlJi1NIKBnpWXIl7Hzsc323ehzM4aVYxnoD2JlHBpxzPUkxhDAs3W7FElTgX27KYQ23RnUJxKl8rpN2hzUYv02SNMsSSLOo//WI1VK+T1qoplSoafCj0OLTQcZjBaoAO6woh/6gpLhK/fbepmShF/PQc6jbkNk4w+jaHytQtYGot0Cv+P+TTJeG7kCxaKhbW8dFK6Nrq+BrFMR8uLvUJibSlH51tVqsawvqhjqirg1vPZ0lOCgJ80WGmoo6tSJVJRUrKNQNdWTrLBgosKY6GJ6RSmXU5tqXlot9x0IdUVfUGayqThBQTJqlEY93PLdX+6CS+dFsqCPqynxsBFilfO9BEnfRStyxU8EglRRFSbikgmGnsYixCrPQVDA9D5zXJExxAaQoeD5bo01aQHHBKJQnwOUifMCPrNIrmeJCJT58kHdgzvyKCwyk3f9dsPhy1YiYQDG+lerdfV+WYLmqrfPi+A1jF5arggZRjVWoUFhzWRR+C1hyoOETXWpqGp2pzllQAZTV1ktE2PCBl+kfX4YSKIBa7zinp6e8TD0TGUQEhV+VlhTmr0lbjCLFunLV67s+FPQr11hSX1B4AoaQo8lLkWjuZxDNECbslrwUXAeSZiGgCCgCioCKc1CBErnH6/bFGwzWnF1cQHVj19ffY4s3UKw5d3MB9Qd2P537yowv0sQLJJwrzpnNIGL2AGIdrNFXx+FraFgsvQxx3h6uoMiLjVxAsYCRV2W5gOIU05G31EmLqkURz5y0+9o/AgwAZQxMBOI25GkAAAAASUVORK5CYII="
              alt="图片加载中"
            />
            当前票数：{{ card.vote_cnt > 0 ? card.vote_cnt + '票' : '直播时公布' }}
            <span class="card-vote-plus-one"></span>
          </div>
        </div>
        <span class="rank-card-item-index">{{
          card.rank >= 10 ? card.rank : "0" + card.rank
        }}</span>
        <div class="rank-card-item-button-group">
          <button type="button" @click="onPullTicket">帮Ta拉票</button>
          <button type="button" @click="onSendTicket(card.vote_cnt)">
            给Ta投票
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed,onMounted,PropType, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import UserInfoType from "../utils/type";
interface ListItem {
  list_type?: number;
  list_user_name?: string;
  rank?: number;
  user_id?: number;
  user_info?: UserInfoType;
  vote_cnt?: number;
}
type listDataType = Array<ListItem>;
interface PropListType {
  listData?: listDataType;
}
export default {
  props: {
    listData: Array as PropType<listDataType>,
  },
  setup(props: PropListType) {
    const store = useStore();
    const liveUrl = computed(() => store.state.liveUrl);
    const state = reactive({
      listData: props.listData,
      isApp:false
    });
    // console.log('列表数据',state.listData);
    const onPullTicket = () => {
      alert("开发中!");
    };
    const onSendTicket = (value: number) => {
      const isLogin = store.state.isLogin;
      if(!isLogin){
        return location.href = "https://juejin.cn/login";
      }else{
        alert('开发中...')
      }
    };
    const setIsApp = () => {
      state.isApp = window.innerWidth < 960;
    }
    const resizeHandler = () => {
      setIsApp();
    }
    onMounted(() => {
      setIsApp();
      window.addEventListener('resize',resizeHandler,false);
    })
    return {
      liveUrl,
      ...toRefs(state),
      onPullTicket,
      onSendTicket,
    };
  },
};
</script>

<style lang="less">
.rank-list {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-flow: row;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  position: relative;
  margin-bottom: 25px;
  .rank-card {
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 10px;
    background-image: url("../assets/card_background.png");
    .rank-card-item {
      height: 173px;
      display: flex;
      position: relative;
      touch-action: manipulation;
      .rank-card-item-index {
        font-size: 14px;
        color: #fff;
        position: absolute;
        bottom: 43px;
        left: 51px;
      }
      .baseUser {
        color: #fff;
      }
      .rank-card-item-userinfo {
        padding: 24px 20px;
        .baseUser;
        a {
          .baseUser;
        }
        .card-profile,
        .card-vote {
          img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            vertical-align: sub;
          }
        }
        .card-vote {
          .card-vote-plus-one {
            color: #ffd900;
            font-size: 20px;
            font-weight: 800;
          }
        }
        .card-profile {
          width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rank-card-item-username {
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          span {
            display: inline-block;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          img {
            margin-bottom: 4px;
            margin-left: 5px;
          }
        }
      }
      .rank-card-item-button-group {
        position: absolute;
        top: 116px;
        left: 95px;
        button {
          width: 100px;
          height: 32px;
          border: none;
          color: #fff;
          cursor: pointer;
          background-repeat: no-repeat;
          background-color: transparent;
          background-size: 100% 100%;
          background-image: url(data:image/png;base64,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);
          & + button {
            color: #000;
            margin-left: 10px;
            background-image: url(data:image/png;base64,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);
          }
        }
      }
      a {
        background-color: transparent;
        .rank-card-item-level {
          width: 92px;
          height: 92px;
          margin: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url("../assets/avatar_background.png");
          img {
            width: 79px;
            height: 79px;
            cursor: pointer;
            border: 1px solid #101b3f;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 960px) {
  .rank-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    max-width: 960px;
    margin-bottom: 20px;
    .rank-card {
      width: 460px;
      height: 220px;
      margin: 10px;
      .rank-card-item {
        .rank-card-item-button-group {
          top: 158px;
          left: 138px;
          button {
            width: 146px;
            height: 40px;
            font-size: 16px;
            & + button {
              margin-left: 10px;
            }
          }
        }
        .rank-card-item-userinfo {
          font-size: 16px;
          padding: 24px 20px;
          .card-profile,
          .card-vote {
            img {
              width: 21px;
              height: 21px;
              margin-right: 6px;
              vertical-align: sub;
            }
          }
          .card-vote {
            .card-vote-plus-one {
              font-size: 24px;
            }
          }
          .card-profile {
            width: 267px;
            font-size: 16px;
          }
          .rank-card-item-username {
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 21px;
            span {
              max-width: 200px;
            }
            img {
              margin-bottom: 8px;
              margin-left: 5px;
            }
          }
        }
        .rank-card-item-index {
          font-size: 24px;
          bottom: -6px;
          left: 65px;
        }
        a {
          .rank-card-item-level {
            margin: 26px 17px;
            width: 120px;
            height: 120px;
            img {
              width: 104px;
              height: 104px;
            }
          }
        }
      }
    }
  }
}
</style>