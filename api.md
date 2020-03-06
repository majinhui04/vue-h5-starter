## 环境

### 测试地址
http://34.209.57.245:3366

## 1. 登录

### 功能描述

提供手机号和密码的登录方式。

### 请求说明

> 请求方式：POST<br>
> 请求 URL ：[/login](#)

### 请求参数

| 字段     | 字段类型 | 字段说明 |
| -------- | -------- | -------- |
| phone    | int      | 手机号   |
| password | string   | 密码     |

### 返回结果

```json
{
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc2FsZS1hcGkuZGV2L2xvZ2luIiwiaWF0IjoxNDkxNTMyOTI4LCJleHAiOjE0OTIyNTI5MjgsIm5iZiI6MTQ5MTUzMjkyOCwianRpIjoiN1hCUXdwN1FHZmxUdHVVQiIsInV1aWQiOiI1MDZjYWY3MCJ9.FyyXagHtBfDBtMJZPV_hm2q6CVULpY63JPDGDHXc"
    },
    "code": "200",
    "msg": "SUCCESS"
}
```

### 返回参数

| 字段  | 字段类型 | 字段说明 |
| ----- | -------- | -------- |
| token | string   | token 值 |

## 2. 加载导航

### 功能描述

获取系统推荐的网址导航

### 请求说明

> 请求方式：GET<br>
> 请求 URL ：[/AppGatewayH5.ashx](#)

### 请求参数

| 字段     | 字段类型 | 字段说明 |
| -------- | -------- | -------- |
| opt | string   | 接口key     |
| info | string   | {} 额外参数     |

### 返回结果

```json
{
  "error": 0,
  "msg": "",
  "data": [
    {
      "classify": "常用网址",
      "items": [
        {
          "title": "facebook",
          "icon": "http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png",
          "link": "http://www.facebook.com"
        },
        {
          "title": "这是标题",
          "icon": "http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png",
          "link": "www.facebook.com"
        }
      ]
    },
    {
      "classify": "福利网址",
      "items": [
        {
          "title": "facebook",
          "icon": "http://34.209.57.245:3366/img/icon/1e553325-5532-4d17-99f3-6a04f867f24b.png",
          "link": "http://www.facebook.com"
        },
        {
          "title": "这是标题",
          "icon": "http://34.209.57.245:3366/img/icon/3c76a05b-12ba-4eea-a09f-3718a45c787e.png",
          "link": "www.facebook.com"
        }
      ]
    }
  ],
  "apk_url": "下载链接"
}
```

### 返回参数

| 字段  | 字段类型 | 字段说明 |
| ----- | -------- | -------- |
| classify | string   | 类别 |
| apk_url | string   | 下载地址 |


## 错误码

| 状态码 | 说明               |
| ------ | ------------------ |
| 3001   | 其他认证错误信息！ |
| 3002   | 用户不存在！       |
| 3003   | 用户名或密码有误！ |
