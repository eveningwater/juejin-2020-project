import { getCurrentInstance } from "vue";
const request = () => {
  return getCurrentInstance()?.appContext.config.globalProperties.$axios;
};
export default request;
