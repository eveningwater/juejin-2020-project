<template>
  <div class="wrapper">
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { useStore } from "vuex";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Footer,
  },
  setup() {
    const store = useStore();
    axios
      .get("http://localhost:8081/user", {
        params: {
          aid: 2608,
          'not_self': 0,
        },
      })
      .then((res) => {
        if (!res.data.data) {
          store.dispatch("setLoginState", false);
        } else {
          store.dispatch("setLoginState", true);
        }
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
}
ul,
li {
  list-style: none;
}
body {
  line-height: 1.5;
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
  height: 100%;
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
@media only screen and (min-width: 960px) {
  body {
    .app {
      .wrapper {
        .container {
          width: 960px;
        }
      }
    }
  }
}
</style>
