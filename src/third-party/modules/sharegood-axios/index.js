import Vue from 'vue';
import axios from 'axios';

axios.defaults.retry = 3;
axios.defaults.retryDelay = 2000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    config.retry = config.retry || 3;
    console.log('config.retry', config, config.retry);

    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;
    console.log('__retryCount');
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
import { Request, HttpError, ResponseType, ContentType } from './src/index';

const http = new Request({
    /**
     * Default config
     * @type {AxiosRequestConfig}
     */
    baseURL: '/api', // 接口前缀
    timeout: 15000, // 超时时间 默认15000
    stopRepeatRequest: true, // 是否禁止重复请求
    repeatInterval: 3000, // 重复请求间隔
    // 全局接口请求数据成功条件
    getResponseSuccess(body) {
        if (body.error) {
            return false;
        }
        return true;
    },
    // 请求前
    beforeRequest({ url, payload = {}, meta = {} }) {
        payload.auth = {
            channel: 'h5_test',
            uid: 145,
            token: 'QVjHGckiNLMHBpwiEIoeAYQjrHFFVUaC'
        };
        payload.info = payload.info || {};
        console.log(`开始请求${url},请求参数:${JSON.stringify(payload)}`);
    },
    // 请求后
    afterRequest({ body, payload, meta }) {
        // isShowLoading是自定义参数
        if (meta.isShowLoading) {
            // hide loading
        }
    },
    // 全局错误回调 内部错误都会提供 message 但是服务端的提示信息需要根据实际情况获取
    handleError({ body, path, meta = {} }) {
        body.message = body.message || body.msg;
    },
    // 全局成功回调
    handleSuccess({ body, path, meta = {} }) {
        const data = body.data || {};
    },
    // 请求完成后获取headers
    getHeaders(config) {
        const headers = config.headers;
    },
    // 请求前设置heeaders
    setHeaders() {
        return {
            token: ''
        };
    }
});

// 对象模式
const API = http.toAPI({
    AppGatewayH5: [
        '/AppGatewayH5.ashx',
        {
            method: 'get'
        }
    ]
});

Vue.prototype.$axios = http;
Vue.prototype.$api = API;
Vue.prototype.$fetchImg = axios;
