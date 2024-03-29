# 日常笔记

记录一些笔记和踩坑的过程

> [new 笔记](https://github.com/tangxve/notes/issues/new)



::: details Todo List

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
    -  (使用qiankun时，vue-devtools无法调试子项目)[https://github.com/umijs/qiankun/issues/601]

:::

::: details 一些好的文章

- [Qwik 与 React Hydration 有何不同](https://mp.weixin.qq.com/s/NLkeTDFCUqw_2bV2a_V0wA)
- [Vue 3.4 中的状态概念模型](https://mp.weixin.qq.com/s/Mr4tcP251D1BkQbHpCBWCQ)
:::


## 2024年
1. 2024-01-04 [修复 vue-cli 不支持支持 vue.config.cjs 格式](./19.md)

## 2023年

1. 2023-09-06 [权限数据的设计思路](./18.md)
2. 2023-09-06 [高性能渲染十万条数据](./17.md)
3. 2023-08-31 [WebStrom 问题](./16.md)
4. 2023-08-30 [Homebrew](./15.md)
5. 2023-08-29 [Chrome 浏览器相关](./14.md)
6. 2023-08-14 [Chrome 密码填充启用生物识别身份验证](./13.md)

## 2022年

1. 2022-11-03：[webstrom 不支持 tailwind 提醒](./12.md)
2. 2022-05-06：[fullPage 插件 afterLoad 钩子执行时机](./11.md)
3. 2022-04-07：[quill-editor 编辑自动获取焦点和页面滚动](./10.md)
4. 2022-03-21：[项目中依赖同一个库多个版本](./9.md)
5. 2022-03-20：[oh my zsh 更新失败](./8.md)
6. 2022-02-23：[富文本行内元素显示](./7.md)
7. 2022-02-14：[canvas 工具方法](./6.md)

## 2021年

1. 2021-11-26：[Mac 前端开发环境](./5.md)
2. 2021-11-09：[微信支付开发对接流程](./4.md)
3. 2021-11-02：[vue2 + ts 路由钩子函数不生效](./3.md)
4. 2021-08-17：[git 相关的](./2.md)

## 2020年

1. 2020-03-08：[微信公众号开发](./1.md)
