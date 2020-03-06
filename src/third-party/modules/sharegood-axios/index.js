import Vue from 'vue';

import { Request } from './src/index';

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
    gateway: [
        '/AppGatewayH5.ashx',
        {
            method: 'get'
        }
    ]
});

Vue.prototype.$axios = http;
Vue.prototype.$api = API;
