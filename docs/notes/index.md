# 日常笔记

记录一些笔记和踩坑的过程

> [new 笔记](https://github.com/tangxve/notes/issues/new)
>

## 2022年

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

## 2021年

1. 2021-11-26：[Mac 前端开发环境](./5.md)
2. 2021-11-09：[微信支付开发对接流程](./4.md)
3. 2021-11-02：[vue2 + ts 路由钩子函数不生效](./3.md)
4. 2021-08-17：[git 相关的](./2.md)

## 2020年

1. 2020-03-08：[微信公众号开发](./1.md)
