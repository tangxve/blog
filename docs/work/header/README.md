# 标准签 header 模块设计方案

## header
头部 导航 组件

### 整体部分
示意图

![示意图](./img/WechatIMG283.png)

### Header Attributes


|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| logo | logo 的数据 | Object | - | - | 
| nev | 导航的数据 | Array | - | - | 
| account | 帮助中心、站内信、头像及退出功能 | Object | - | - | 

#### logo-options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| url | logo图片的地址 | string| - | - |  

```js
  // logo部分
  {
    // logo 图片的地址，默认 oss 地址 @string
    url: 'xxxx'
  }
```

#### nev-options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| logo | logo 的数据 | Object | - | - | 
| nev | 导航的数据 | Array | - | - | 
| account | 帮助中心、站内信、头像及退出功能 | Object | - | - | 

```js
  // 导航部分
  [
    {
      label: '证据管理',
      path: '/aaaa',
      class: ['nav-item']
    }
  ]
```

#### account-options

```js
  // 用户部分
  account: {
    // 帮助中心地址，默认帮助中心地址 @string
    helpUrl: 'xxxx',
    // 站内信通知
    notify: {
      // 通知信息数量
      newMsgCount: 0,
      // 通知信息列表
      newMessages: [{ msg: 'xxx' }],
      // 我的消息地址
      messageLink: 'xxx'
    },
    // 用户信息
    user: {
      // 用户头像地址
      head: 'xxx',
      // 用户姓名
      name: '',
      // 用户实名状态 @boolean
      realName: false,
      // 手机号
      mobile: 'xxx',
      // 邮箱
      email: 'xxx',
      // 用户中心地址
      userLink: '',
      // 计费中心地址
      orderLink: ''
    }
  }
```

## space
空间切换组件


## 组合使用

header 与 space 组件打包使用
