# 日常笔记

<Avatar/>

记录一些笔记和踩坑

## todo

- vue3 + ts 的问题
  - 模板是个失败的设计，很多问题都是由模板衍生而来
  - props 和 ts 结合仍有问题（有写类型还是不能提醒，和 webstrom 也有关系）
  - 模板中只能编写 js，但 vue-tsc 会使用 tsc 检查，这会导致一些奇怪的问题很难解决
- 改造微前端遇到的问题
  - CJS 引用 ESM 方法的问题
  - 需要把 package.json 的 "type": "module"
  - 如果是 module 类型，vue.config.js 修改cjs
  - 但是 低版本 vue-cli 不支持支持 vue.config.cjs 格式（可以通过升级 vue-cli 解决问题，搞版本的 支持 cjs）
  - 考虑修改的成本放弃
- canvas 工具方法完善
- [electron 开发 日历app](src/electron.md)
- [前端性能优化与解决方案](src/前端性能优化与解决方案.md)
- [高性能渲染十万数据](src/高性能渲染十万条数据.md)
- postMessage 传递 promise 失败
- 大文件上传
    - 计算分片数据 webwork
    - 批量上传并发控制 promise.allotted


## 2022年

1. 2022-11-03：[webstrom 不支持 tailwind 提醒](src/webstrom不支持tailwind.md)
1. 2022-05-06：[fullPage 插件 afterLoad 钩子执行时机](src/fullPagejs同步动画问题.md)
2. 2022-04-07：[quill-editor 编辑自动获取焦点和页面滚动](src/quillEditor自动获取焦点问题.md)
3. 2022-03-21：[项目中依赖同一个库多个版本](src/引用多个版本npm包.md)
4. 2022-03-20：[oh my zsh 更新失败](src/zsh更新.md)
5. 2022-02-23：[富文本行内元素显示](src/富文本内容样式问题.md)
6. 2022-02-14：[canvas 工具方法](https://github.com/tangxve/canvasUtils)

## 2021年

1. 2021-11-26：[Mac 前端开发环境](src/Mac前端开发环境.md)
3. 2021-11-09：[微信支付开发对接流程](src/微信支付开发流程.md)
4. 2021-11-02：[vue2 + ts 路由钩子函数不生效](src/vue2+ts路由钩子函数不生效.md)
5. 2021-08-17：[git 相关的](src/git.md)

## 2020年

1. 2020-03-08：[微信公众号开发](src/微信公众号开发流程.md)
