<template>
  <div class="footer">
    <ul class="footer-web">
      <li v-for="(web, index) in footerWebNavList" :key="web.text + index">
        <template v-if="web.url">
          <a :href="web.url" target="_blank">{{ web.text }}</a>
        </template>
        <template v-else>{{ web.text }}</template>
      </li>
    </ul>
    <div class="footer-app">
      <ul
        class="footer-app-item"
        v-for="(app, index) in footerAppNavList"
        :key="app + index"
      >
        <li
          v-for="(app_item, app_index) in app"
          :key="app_item.text + app_index"
        >
          <template v-if="app_item.url">
            <a :href="app_item.url" target="_blank">{{ app_item.text }}</a>
          </template>
          <template v-else>{{ app_item.text }}</template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
interface FooterItem {
  text: string;
  url?: string;
}
type FooterList = Array<FooterItem>;
export default {
  setup() {
    const state = reactive({
      footerWebNavList: [
        {
          text: "@2020掘金",
        },
        {
          text: "关于我们",
          url: "https://juejin.cn/about",
        },
        {
          text: "营业执照",
          url: "https://juejin.cn/license",
        },
        {
          text: "用户协议",
          url: "https://juejin.cn/terms",
        },
        {
          text: "京ICP备18012699号-3",
          url: "https://beian.miit.gov.cn/",
        },
        {
          text: "京公网案备11010802026719号",
          url:
            "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802026719",
        },
        {
          text: "北京北比信息技术有限公司版权所有",
        },
      ],
      footerAppNavList: [] as any[],
    });
    const first: FooterList = state.footerWebNavList.slice(0, 4);
    const second: FooterList = state.footerWebNavList.slice(4);
    state.footerAppNavList = [first, second];
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #3330a6;
  .footer-web,
  .footer-app {
    color: #a6a4fb;
    a {
      text-decoration: none;
      color: #a6a4fb;
    }
  }
  .footer-web {
    display: none;
  }
  .footer-app {
    background-color: #3330a6;
    padding: 20px 15px;
    .footer-app-item {
      margin: 0;
      padding: 0;
      font-size: 12px;
      &:first-child {
        display: inline-flex;
        li {
          &:not(:last-child)::after {
            content: ".";
            color: #c6cfda;
            margin: 0 0.5rem;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 960px) {
  .footer {
    width: 100%;
    height: 60px;
    background-color: #3330a6;
    color: #a6a4fb;
    display: flex;
    font-size: 12px;
    margin: 0;
    padding: 0;
    justify-content: center;
    .footer-app {
      display: none;
    }
    .footer-web {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin-right: 20px;
      }
    }
  }
}
</style>