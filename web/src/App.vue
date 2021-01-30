<template>
  <div class="background">
    <div class="wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import Footer from "./components/Footer.vue";
import requestInstance from "./api/requestInstance";
import { AxiosResponse } from "axios";
export default {
  components: {
    Footer,
  },
  setup() {
    const store = useStore();
    const request = requestInstance();
    request
      .get("/user", {
        aid: 2608,
        "not_self": 0,
      })
      .then((res:AxiosResponse) => {
        store.dispatch("setLoginState", !res.data.data);
      });
    return {};
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  user-select: none;
}
ul,
li {
  list-style: none;
}
body {
  line-height: 1.5;
  font-size: 14px;
  overflow-x: hidden;
  button,
  input {
    overflow: visible;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    line-height: 1.15;
    margin: 0;
  }
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .background {
      width: 100%;
      height: 100%;
      position: relative;
      min-height: 100vh;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANAgMAAAAPhQzvAAAADFBMVEVfV/ZUTPRVTfRLQ/L3YHYbAAAAGUlEQVQI12NgYGFgwCA4YKzQuVMdUMQwCABBYAIAV5t6PAAAAABJRU5ErkJggg==");
      background-size: 6.5px 6.5px;
      .wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 32.5px;
        .container {
          position: relative;
          width: 345px;
        }
      }
    }
  }
}
@media only screen and (min-width: 960px) {
  body {
    .app {
      .background {
        .wrapper {
          .container {
            width: 960px;
          }
        }
      }
    }
  }
}
</style>
