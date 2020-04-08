# 标准签 header 模块设计方案

## Header
头部 导航 组件

### Header Attributes


|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| logo | logo 的数据 | Object | - | - | 
| nav | 导航的数据 | Array | - | - | 
| account | 帮助中心、站内信、头像及退出功能 | Object | - | - | 

::: details 查看数据结构

```js
{
  // logo部分
  logo: {
    // logo 图片的地址，默认 oss 地址 @string
    url: 'xxxx'
  },
  // 导航部分
  nev: [
    {
      label: '证据管理',
      path: '/aaaa',
      class: ['nav-item']
    }
  ],
  // 用户部分
  account: {
    // 帮助中心地址，默认帮助中心地址 @string
    helpLink: 'xxxx',
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
}
```

#### 示意图：

![示意图](./img/WechatIMG283.png)
:::

### logo options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| url | logo 图片的地址 | string| - | - |  

::: details 查看数据结构
```js
  // logo部分
  {
    // logo 图片的地址，默认 oss 地址 @string
    url: 'xxxx'
  }
```
:::

### nav options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| nav | 导航的数据 | Array | - | - | 
| label | nav 的名字 | string| - | - | 
| path | 路径 | string| - | - | 
| class | 绑定到元素的 class | array / object | - | - |
 
::: details 查看数据结构
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
:::

### account options

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| helpLink | 帮助中心地址，默认帮助中心地址 | string | - | - | 
| notify | 站内信通知 | object| - | - | 
| newMsgCount | 通知信息数量 | string| - | - | 
| newMessages | 通知信息列表 | array | - | - | 
| msg | 通知信息内容 | string | - | - | 
| messageLink | 我的消息地址 | string | - | - | 

::: details 查看数据结构
```js
  // 用户部分
  {
    // 帮助中心地址，默认帮助中心地址 @string
    helpLink: 'xxxx',
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
:::
## space
空间切换组件


## 组合使用

header 与 space 组件打包使用
