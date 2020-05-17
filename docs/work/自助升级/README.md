# 自主升级

自助升级技术方案

## 一、需求背景

标准签目前采用灰度发布的模式，需要开放自助版本升级的入口方便用户自助升级

### 1. 迭代名称
名称：自助升级

wiki地址：[自助升级](http://wiki.timevale.cn:8081/pages/viewpage.action?pageId=87785910) http://wiki.timevale.cn:8081/pages/viewpage.action?pageId=87785910

### 2. 目标

自助升级

## 二、难点调研（包含技术选型）
无

## 三、技术方案

### 术语统一

#### 用户版本 userVersion
当前用户可以使用的最新版本

#### 正式版本 regularVersion
字面意思，大众可以看到的，非灰度的。

#### 前端应用版本 
前端应用灰度功能的版本，用来与用户版本和正式版本来做对比。**和 package.json 里面的 version 不是一个东西**

### 1. 流程图
无

### 2. 前端应用版本号定义

前端维护一个版本号，用来与后端的版本号做对比

方案一：在默认的环境 `.env` 文件种添加添加 `VUE_APP_VERSION`

~~方案二：在每个特定环境 `.env.dev、.env.test、.env.sml、.evn.prod` 文件中添加 `VUE_APP_VERSION`~~

```sh
# 方案一：默认环境 .env

VUE_APP_VERSION='1.2'


# 方案二：特定环境 .env.dev（项目）.env.test（测试） .env.sml（模拟） .evn.prod（正式）

VUE_APP_VERSION='1.2'

```

::: tip 提示
版本号只有 2 位

``VUE_APP_VERSION = 1.2``
:::

### 3. 前端版本号对比

版本号转换成浮点数，比较大小；用户版本或正式版本 >= 前端的应用版本，就是灰度。

```js
// 版本对比方法
export function virsionDiff(userV, regularV) {
  // 用户版本
  const userVNum = parseFloat(userV)

  // 正式版本
  const regularVNum = parseFloat(regularV)

  // 前端当前应用版本
  const appV = process.env.VUE_APP_VERSION

  const appVNum = parseFloat(appV)

  // 是否灰度
  let flag = false
  if (regularVNum >= appVNum) {
    flag = true
  }

  if (userVNum >= appVNum) {
    flag = true
  }

  return {
    userV,
    regularV,
    appV,
    flag,
  }
}
```

### 4. 替换旧的灰度接口

``versionInfo`` 替换 之前的 ``check`` 接口

```js
// 文件路径：src/store/modules/user.js
const actions = {
  // 用户灰度
  async getGatedStatus({ commit, state }) {
    
    // await Saas.api('', '', {
    //   url: 'v2/whitelist/check',
    //   method: 'GET',
    //   params: {},
    //   body: {
    //     operateId: state.userInfo.guid || state.userInfo.ouid,
    //   },
    // }).then(res => {

    // 获取个人灰度信息，userid 传个人 oid
    const res = await Saas.api('', '', {
      url: 'v1/grayscale/user/{userId}/versionInfo',
      method: 'GET',
      params: { userId: 'sys_accountId' },
    })

    const { userVersion, regularVersion } = res.data

    const { flag } = virsionDiff(userVersion, regularVersion)
    console.log('灰度：', flag)

    commit('setUserVersion', userVersion)
    commit('updateGatedStatus', flag)

    // 兼容老板灰度
    commit('gated/updateGatedStatus', flag, { root: true })
  }
}
```


### 3. 前端组件
无

### 4. 兼容性
兼容现代浏览器

### 5. 性能问题
无

## 四、任务排期
排期表：xxxx

