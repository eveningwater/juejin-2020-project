import http from "./http";
import { GetParam, postParam } from "./type";

export default {
  get(url: string, params: any, headers: any) {
    const options: GetParam = {};
    if (params) options.params = params;
    if (headers) options.headers = headers;
    return http.get(url, options);
  },
  post(url: string, params: any, headers: any) {
    const options: postParam = {};
    if (headers) options.headers = headers;
    return http.post(url, params, options);
  },
};
