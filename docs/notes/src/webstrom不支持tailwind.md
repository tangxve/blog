# webstrom 不支持 tailwind 提醒

webstrom 内置的插件尚未对 tailwind 最新版本, 降级处理

## 环境

项目：vue3 + vite + ts + node16 + tailwind3.2
软件：webstrom
插件：[官方提供 tailwind](https://www.jetbrains.com/help/webstorm/tailwind-css.html)

## 问题

编辑器没有提醒，但是渲染是生效的，下图：

<img src="./img/wt-1.png"  width="600">

<img src="./img/wt-2.png"  width="600">

通过添加日志发现报错：

`Tailwind CSS: Cannot read properties of undefined (reading 'modifier')`

## 解决

参考：

[参考1](https://github.com/tailwindlabs/tailwindcss/discussions/9634)

[参考2](https://github.com/tailwindlabs/tailwindcss/discussions/9615)

最后定位到问题，webstrom 内置的插件尚未对 tailwind v3.2 版本支持更新

降级到 v3.1 版本正常使用

<img src="./img/wt-3.png" width="600">



