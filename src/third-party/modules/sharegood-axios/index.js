import Vue from 'vue';

import {
    Request
} from './src/index';

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
    beforeRequest({
        url,
        payload = {},
        meta = {}
    }) {
        payload.auth = {};
        payload.info = payload.info || {};
        console.log(`开始请求${url},请求参数:${JSON.stringify(payload)}`);

        if (meta.$loading) {
            window.myApp.$Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                message: typeof meta.$loading === 'string' ?
                    meta.$loading :
                    '加载中',
                loadingType: 'spinner'
            });
        }
    },
    // 请求后
    afterRequest({
        body,
        payload,
        meta
    }) {
        if (meta.$loading) {
            window.myApp.$Toast.clear();
        }
    },
    // 全局错误回调 内部错误都会提供 message 但是服务端的提示信息需要根据实际情况获取
    handleError({
        body,
        path,
        meta = {}
    }) {
        body.message = body.message || body.msg || '服务器走神了';
        const message = body.message;
        const noError = !!meta.$noError;
        // 默认提示异常
        if (!noError) {
            window.myApp.$Toast(message);
        }
    },
    // 全局成功回调
    handleSuccess({
        body,
        path,
        meta = {}
    }) {
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
