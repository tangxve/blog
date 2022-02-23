# 学习 electron

## 遇到的问题

### electron 渲染进程报错 'Require' is not defined

渲染进程 renderer.js

```js
const { ipcRenderer } = require('electron')
```

控制台报错：

```shell
Uncaught ReferenceError: require is not defined
```

解决方法：

主进程里面配置信息调整

```js
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,  // 是否注入 node 模块
    contextIsolation: false,  // 上下文隔离
  }
})
```

- `webPreferences`：Object (可选) - 网页功能设置。
    - `nodeIntegration`：Boolean (可选) - 是否启用 Node integration. 默认值为 `false`.
    - `contextIsolation` (可选) - 是否在独立 JavaScript 环境中运行 Electron API和指定的 `preload` 脚本. 默认为 `true`。
