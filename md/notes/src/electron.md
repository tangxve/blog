# 学习 electron


electron当时出来的一个重要原因就是解决不同平台不同版本系统下不同浏览器的问题，结果tauri又开历史的倒车用回系统webview了。

[如何评价 tauri？](https://www.zhihu.com/question/396199869)

## 常用方法

- 判断是否生产环境（是否打包）
    - `app.isPackaged`：应用是否打包

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

## 主进程与渲染进程

### 主进程

- Electron 运行 `package.json` 的 `main` 脚步的进程称为主进程
- 每个应用只有一个主进程
- 管理原生 GUI，典型的窗口等（browserWindow、Dock、Menu）
- 创建渲染进程
- 控制应用的生命周期

### 渲染进程

- 展示 web 页面的进程称为渲染进程
- 通过 Node.js、Electron 提供的 API 可以跟系统底层通信
- 一个 Electron 应用可以有多个渲染进程

## 进程直接的通信

### 渲染进程 ==> 主进程通信：

- Callback 写法
    - 发送： ipcRenderer.send(channel, ...args)
    - 接收：ipcMain.on(channel, handler)
- Promise 写法（Electron 7.0 之后，处理请求+ 响应模式）
    - 发送：ipcRenderer.invoke(channel, ...args)
    - 接收ipcMain.handle(channel, handler)

### 主进程 ==> 渲染进程通信：

- 渲染进程 接收：ipcRenderer.on(channel, handler)
- 主进程 发送：webContents.send(channel) 找到具体的渲染线程

### 渲染进程 ==> 渲染进程之间的通信

- 通知事件
    - 通过主进程转发（Electron 5 之前）
    - ipcRenderer.sendTo (Electron 5 之后)
- 数据共享
    - web 技术（localStorage、sessionStorage、indexedDB）
    - 使用 remote （不推荐，每次会触发底层的 ipc 同步事件，特别影响性能）

## Native 能力以及原生 GUI

- Native API
    - notification 原生通知能力
    - Dock 任务栏
- node.js 能力
    - API：可以通过 fs 读写文件、加解密文件
    - 通过 node 调用原生的 C++ 来获取一定的能力（系统层面的截图）
    - 通过 child_process（子进程）调用系统底层能力（shell、等）

