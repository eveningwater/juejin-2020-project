import axios, { AxiosRequestConfig } from 'axios';
import { host } from './api';
import browser from './browser';
const http = axios.create();
http.defaults.baseURL = host;
http.defaults.headers.post["Content-Type"] = "application/json";
http.defaults.headers.put["Content-Type"] = "application/json";

http.interceptors.request.use((config:AxiosRequestConfig) => {
    const method = (config.method as string).toLowerCase();
    if(method === 'get' && browser.isIE){
        const symbol = (config.url as string).indexOf('?') > -1 ? '&' : '?';
        config.url += symbol + '=' + Date.now();
    }else if(method === 'post' || method === 'put'){
        config.data = JSON.stringify(config.data);
    }
    return config;
},(error) => {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
    return response;
},(error) => {
    return Promise.reject(error);
});

export default http;