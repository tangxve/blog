# 微信网页开发

微信授权登录、微信 JS-SDK 配置以及微信支付

::: tip 提示
请认真阅读微信网页开发 [JS-SDK 说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

微信官方文档集合：[文档](https://developers.weixin.qq.com/doc/)
:::

## 准备工作
- 请认真阅读 [微信授权登录](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

- 请认真阅读 [微信 JS-SDK 说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
)
- 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- web 调试代理工具（推荐： [Charles](https://www.charlesproxy.com/)）
- 拥有一个 [微信公共号](https://mp.weixin.qq.com/) 的开发者及以上的操作权限

## 微信 JS-SDK 配置

>微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。

[JS-SDK 说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

### 绑定域名
> 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
>
> 备注：登录后可在“开发者中心”查看对应的接口权限。

#### 1. 微信公众号号设置
 
先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”

这个域名就是你项目的访问域名，如果是多个项目可以配置顶级域名

::: tip 提示
你的域名必须是一个外网可以访问的域名，并确保可以访问 verify 文件 

由于一个自然月内最多可修改并保存三次域名，建议填写一级域名

多个环境可以使用一个域名，域名是和公众号的 `config` 绑定的 (建议配置一个正式的环境域名和其他环境域名）
:::

点击查看图片（ 微信配置的截图）





### 引入 JS 文件
### 通过config接口注入权限验证配置






