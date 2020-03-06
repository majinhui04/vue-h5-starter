# vue-h5-starter

> 基于vuejs的移动端全家桶项目,统一管理后端接口 | 获取数据 | 请求数据, 可配置的模板以及路由。

## 特性

- webpack4
- vue2
- vue-router
- vuex
- eslint
- prettier
- vue-cli3
- pre-commit
- less
- plop

## 开始

```bash

#  To create a new vue + typescript project, run:
git clone https://github.com/majinhui04/vue-h5-starter.git `your project name`

# then
cd `your project name`

# Install project dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## 创建模板以及路由

```bash
npm run new 

```

## API 配置

```javascript
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
    // 全局接口请求数据成功条件  body请求结果
    getResponseSuccess(body) {
        if (body.error) {
            return false;
        }
        return true;
    },
    // 请求前 payload 请求参数
    beforeRequest({ url, payload = {}, meta = {} }) {
        payload.auth = {
            channel: 'h5_test'
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

API.gateway({name:'jinhui.m',password:'123456'}).then(res=>{
    console.log('success',res)
}).catch(err=>{
    console.error(err);
}).finally(()=>{
    console.log('end')
});
```

## change log

*2020-03-03*
- 初始化

> init


> 喜欢或对你有帮助的话请点star✨✨，Thanks.