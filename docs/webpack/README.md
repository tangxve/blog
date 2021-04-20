# 学习 webpack 

前端模块化打包工具

## webpack 的常用属性

- entry：打包的入口，可以是多个
- output：输出配置，只能是一个
- loader：核心编译
- plugin：扩展
- devServer：开发服务器

## entry 入口

- 文件的打包入口 可以有多个入口。

- css、js 都可以作为打包入口，一般情况下是 js（main.js）

```javascript
// webpack.config.js  
module.exports = {
  entry: './src/main.js',
}
```

- 多个入口打包
```javascript
// webpack.config.js  
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
}
```

## output 输出

> 可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。


```javascript
const path = require('path')

module.exports = {
  // 文件的打包入口 可以有多个入口
  entry: './src/main.js',  // 注意这里的 ./ 不能省略
  // 只能存在一个 输出
  output: {
    // 输出文件的名称
    filename: '03-bundle.js',
    // 输出的文件的路径名称
    path: path.join(__dirname, 'dist')
  },
}
```

### outpu.publicPath 
配置项目的公共路径 一般是cnd路径

```javascript
module.exports = {
  // 文件的打包入口 可以有多个入口
  entry: './src/main.js',  // 注意这里的 ./ 不能省略
  // 只能存在一个 输出
  output: {
    // 输出文件的名称
    filename: '03-bundle.js',
    // 输出的文件的路径名称
    path: path.join(__dirname, 'dist'),
    // 项目的公共路径 
    publicPath:'/CDN/apps'
  },
}
```

也可以在入口文件中通过 `__webpack_public_path__` 动态配置 (微前端中配置过)
```javascript
__webpack_public_path__ = myRuntimePublicPath;
```
 

## Loader

> loader 的作用很简单，就是处理任意的文件，并将它们转换成一个 webpack 可以处理的模块

- webpack 内部默认只能处理，js 模块代码，在打包过程中，它默认把所有遇到的文件当作 js 代码来解析
- webpack 是使用 loader 来处理每个模块的，而内部的 loader 只能处理 js 模块，如果需要其他模块学院配置不同的 loader

<img src="./img/img1.png" width="600">


### loader 使用方式

在 module 中添加一个 rules 数组，这个数组就是针对资源模块的加载规则配置

每个规则中都要设置两个属性：

- test 属性：它是一个正则表达式，用来匹配打包过程遇到的文件路径
- use 属性：它用来中的指定文件使用的 loader


```javascript
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: '03-bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 正则表达式，来匹配文件
        test: /\.css$/,
        //  指定具体的 loader
        use: [
          'css-loader'
        ]
      }
    ]
  }
}
```

这样 css 文件就会交给 css-loader 处理后再有 webpack 打包

`css 文件` ==> `css-loader` ==> `webpack` ==> `bundle.js`

<img src="./img/img3.png" width="600">

#### 样式加载失败

css-loader 只是把 css 编译成 一段 css 字符串模块，只会把css模块加载到js中，而并不会使用这个模块

<img src="./img/img2.png" width="600">


- 使用 style-loader 把 css-loader 转换的结果通过 style 标签添加到页面上

- 多个 loader 的执行顺序，从后往前执行

```javascript
const path = require('path')

module.exports = {
  // 打包模式
  mode: 'none',
  // 文件的打包入口 可以有多个入口
  entry: './src/main.js',  // 注意这里的 ./ 不能省略
  // 只能存在一个 输出
  output: {
    filename: '03-bundle.js',
    // 输出的文件名称
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 正则表达式，来匹配文件
        test: /\.css$/,
        //  指定具体的 loader
        // 多个 loader 的执行顺序，从后往前执行
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```


### 常用的 loader

| 名称       | 说明 |
| --------  | --- | --- |
|file-loader	| 将一个文件中的 import/require() 解析为 url，并且将文件发送到输出文件夹。|
|url-loader	| 用于将文件转换为 base64 URI 的 loader。|
|babel-loader| 编译 js 文件 | 
|css-loader| 处理 css 文件，并对 @import 和 url() 进行处理|
|style-loader| 把 CSS 插入到 DOM 中|
|eslint-loader| lint 检查 | 
|vue-loader | 处理 .vue 文件| 


### loader 的工作流程

- loader 都需要导出一个函数
- loader 接收源文件的内容字符串或者 buffer
- webpack 为 loader 提供上下文，有一些 api 可以使用

简单的工作流程：

1. webpack.config.js 配置一个 js-loader
2. 打包遇到 js 文件，执行 js-loader
3. js-loader 是一个函数，接收来文件的 source
4. js-loader 可以使用一些方法对 source 进行处理，得到结果 result
5. 将 result 返回或者传递给下一个 loader ，**最后结果必须是一段标准的 JS 代码字符串。**

Webpack 加载资源文件的过程类似于一个工作管道，你可以在这个过程中依次使用多个 Loader，但是最终这个管道结束过后的结果必须是一段标准的 JS 代码字符串。

### 手写一个 loader

开发 markdown 加载器，作用 markdown 转 html 在呈现到页面上

<img src="./img/img4.png" width="600">


1. 开发 markdown-loader

```javascript
// markdown-loader.js

// 引入 marked 模块（node 模块）
const marked = require('marked')

module.exports = source => {
  // 加载到文件到模块内容
  console.log('source:', source)
 
  //  1. 将 markdown 转换为 html 字符串
  const html = marked(source)
  
  // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码 
  // const code = `module.exports = ${JSON.stringify(html)}`
  const code = `export default ${JSON.stringify(html)}`

  return code 
}
```

webpack 也可以通过 ES Modules 的方式导出，webppack 内部会自己转换
               

2. 使用

在 module.rules 使用 就可以了
```javascript
// ./webpack.config.js
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          './markdown-loader'
        ]
      }
    ]
  }
}
```

- 也可以多个 loader 配合使用

```javascript
// markdown-loader.js

// 引入 marked 模块（node 模块）
const marked = require('marked')

module.exports = source => {
  // 加载到文件到模块内容
  console.log('source:', source)
 
  //  1. 将 markdown 转换为 html 字符串
  const html = marked(source)
  
  // 2. 返回处理后的结果
  return html
}
```

- 引入 html-loader 处理 

```javascript
// ./webpack.config.js

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          './markdown-loader'
        ]
      }
    ]
  }
}
```


