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

### 1.术语统一

#### 用户版本 userVersion
当前用户可以使用的最新版本（后端返回）

#### 正式版本 regularVersion

正常的版本，非灰度，大众可以看到的（后端返回）

#### 发布版本 releaseVersion 

前端应用灰度功能的版本，用来与 ``用户版本`` 和 ``正式版本`` 来做对比。

在标准签 `src/lib/config.js` 配置文件中 `RELEASE_VERSION_LIST` 字段维护

#### 白名单
灰度白名单，把用户添加到白名单后，就可以看到灰度功能，企业同理


#### 个人纬度 灰度
发布的版本功能针对于 `个人` 来灰度。大多数情况下灰度功能都是个人纬度


#### 企业纬度 灰度
发布的版本功能针对于 `企业` 来灰度。比如标准签中`企业控制台`中的某个需求


::: tip 提示
`发布版本` 与 ``package.json`` 里面的 ``version`` 没有任何关系。
:::


### 2. 前端如何使用

#### 发布版本定义
 
config 文件添加 版本标示 和 版本号，版本标示需要语义明确，用来与 发布版本和正式版本对比


```js
// src/lib/config.js 

export const RELEASE_VERSION_LIST = {
  Vxxx0: '1.0',   // 版本 1.0
  Vxxx1: '1.1',   // 版本 1.1
  Vxxx2: '1.2',   // 版本 1.2
}
```

::: tip
key：版本标示，value：版本号

版本号递增，一般是2位

每个版本要有注释 
:::

#### 业务中使用

```vue
<template>
  <div class="version-test">
    <div v-if="versionGated.Vxxx0">我是版本 1.0</div>
    <div v-if="versionGated.Vxxx1">我是版本 1.1</div>
    <div v-if="versionGated.Vxxx2">我是版本 1.2</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      // 个人纬度：versionGated，企业纬度：organVersionGated
      ...mapGetters('version', ['versionGated', 'organVersionGated']),
    },
    created() {
      // 通过 versionGated 调用自己定义 key（版本标示）
      console.log('home___版本 1.0', this.versionGated.Vxxx0)    // ===> false
      console.log('home___版本 1.2', this.versionGated.Vxxx1)    // ===> true
      console.log('home___版本 1.2', this.versionGated.Vxxx2)    // ===> true
    },
  }
</script>
```

### 3. 版本号对比方法

**正式版本 或 灰度版本 大于等于 发布版本就是灰度**  


```js
// 版本对比方法
/**
 *
 * @param releaseV 前端发布版本
 * @param userV 用户版本（后端）
 * @param regularV 正式版本（后端）
 * @returns {{gated: boolean, releaseV: * , regularV: *, userV: *}}
 */

export function virsionDiff(v) {
 
  const { userV, regularV, releaseV } = v

  // 用户版本
  const userVArr = splitV(userV)

  // 正式版本
  const regularVArr = splitV(regularV)

  // 发布版本
  const releaseVArr = splitV(releaseV)

  // 是否灰度
  let gated = false

  // 正式版本 与 发布版本 对比
  if (regularVArr[0] > releaseVArr[0] || (regularVArr[0] === releaseVArr[0] && regularVArr[1] >= releaseVArr[1])) {
    gated = true
  }

  // 用户版本 与 发布版本 对比
  if (userVArr[0] > releaseVArr[0] || (userVArr[0] === releaseVArr[0] && userVArr[1] >= releaseVArr[1])) {
    gated = true
  }

  return {
    userV,
    regularV,
    releaseV,
    gated,
  } 
}
```

### 4. 前端方法定义

store 中 新增 version 模块

```js
// 文件路径：src/store/modules/version.js
const actions = {
  // 获取版本信息 个人纬度
  async getVersion({ commit, state }) {
    // 获取版本信息、个人纬度、传个人 ouid
    const res = await Saas.api('', '', {
      url: 'v1/grayscale/user/{userId}/versionInfo',
      method: 'GET',
      params: { userId: 'sys_accountId' },
    })

    const { userVersion, regularVersion } = res.data

    commit('setVersion', { userVersion, regularVersion })
  },
  // 获取版本信息 - 企业纬度
  async getOragnVersion({ commit, state }, userId) {
    // 获取版本信息、企业纬度、传企业 ouid
    const res = await Saas.api('', '', {
      url: 'v1/grayscale/user/{userId}/versionInfo',
      method: 'GET',
      params: { userId },
    })

    const { userVersion, regularVersion } = res.data

    commit('setOrganVersion', { userVersion, regularVersion })
  },


}
```


### 5. 前端组件
无

### 6. 兼容性
兼容现代浏览器

### 7. 性能问题
无

## 四、任务排期
排期表：xxxx
