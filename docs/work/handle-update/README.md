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

### 1. 流程图
无

### 2. 接口/页面设计



#### 版本对比

前端维护一个版本号，用来与后端的版本号做对比

方案一：在一般的环境 `.env` 文件种添加添加 `VUE_APP_VERSION`

方案二：在每个特定环境 `.env.dev、.env.test、.env.sml、.evn.prod` 文件中添加 `VUE_APP_VERSION`

```sh
# 方案一：一般环境 .env

VUE_APP_VERSION='1.2.3'


# 方案二：特定环境 .env.dev（项目）.env.test（测试） .env.sml（模拟） .evn.prod（正式）

VUE_APP_VERSION='1.2.3'
```

替换旧的灰度接口

```js
// 文件路径：src/store/modules/user.js
const actions = {
  // 用户灰度 old
  async getGatedStatus({ commit, state }) {
    await Saas.api('', '', {
      url: 'v2/whitelist/check',
      method: 'GET',
      params: {},
      body: {
        operateId: state.userInfo.guid || state.userInfo.ouid,
      },
    }).then(res => {
      commit('updateGatedStatus', res.data.whiteList)

      // 兼容老板灰度
      commit('gated/updateGatedStatus', res.data.whiteList, { root: true })
    })
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


- 表格修改文案
- 组织调整，当前组织不能修改，禁止选择
- 树结构 或 成员接口会报错

