# 项目中依赖同一个库多个版本问题

## 场景

项目中需要使用 echarts 折线图的一个新功能，新的功能只有在 echarts v5版本存在，

但是项目中用的 v4 版本的，

为了不影响已有的业务，想到是否可以在项目中，引入多个版本的 echarts

## 方法一 cdn + npm

### v4 版本正常使用 npm 引入

```shell
npm install echarts@4.x.x --save
```

使用：

```js
import * as  ECharts from 'echarts';

ECharts.init() // ...
```

### v5 版本使用cdn 的方式引入，配合 webpack.externals

```html

<script src="https://cdn.jsdelivr.net/npm/echarts@5.3.0/dist/echarts.min.js"></script>
```

webpack.config.js：

```js
module.exports = {
  //...
  externals: {
    // v5版本名字
    echarts5: 'echarts',
  },
};
```

会挂载到全局直接使用

```js
echarts5.init() //...
```

## 方法二 下载压缩包到本地

在官网定制需要的功能和组件，代码下载到本地引入

[定制代码](https://echarts.apache.org/zh/builder.html)

```js
import echarts from './echarts5.3.1.min.js' // 本地文件路径

echarts.init() //...
```

## 方法三  自定义安装包别名

使用 npm package aliases 自定义安装包别名

有时候在一个项目中可能需要同时依赖同一个库的两个版本。

npm 6.9.0 添加了 package aliases 功能可以用来解决这个问题。

这个用法在npm的官网文档中没有说明，但在其rfc文档中有详细介绍，可参考:[官方地址](https://github.com/npm/rfcs/blob/main/implemented/0001-package-aliases.md)

语法：

```shell
npm install <alias>@npm:echarts@<制定版本> -S
```

使用：

```shell
npm i echarts4@npm:echarts@4.9.0 echarts5@npm:echarts@5.3.1 -S
```

可以看到 package.json 中依赖项声明为：

```json
{
  "dependencies": {
    "echarts4": "npm:echarts@^4.9.0",
    "echarts5": "npm:echarts@^5.3.1"
  }
}
```

使用：

```js
import echarts4 from 'echarts4' // 等于 echarts@4.9.0
import echarts5 from 'echarts5' // 等于 echarts@5.3.1

echarts4.init() //...
echarts5.init() //...
```
















