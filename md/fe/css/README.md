# css 相关

## BFC

## 说下 flex

[Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)


### 面试： 

`flex: 1;` 标示什么：

[flex:0 flex:1 flex:none flex:auto应该在什么场景下使用？](zhangxinxu.com/wordpress/2020/10/css-flex-0-1-none/)

[flex:1 到底代表什么?](https://zhuanlan.zhihu.com/p/136223806)


- 所有元素会均分

`flex: 1; === flex: 1 1 任意数字+任意长度单位;`

- 可以看出最重要的一点在 第三个参数 flex-basis 上, 我们再来回顾以下 这个属性的作用

- flex-basis给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小

- auto 为表示项目本身的大小, 如果设置为 auto, 那么这三个盒子就会按照自己内容的多少来等比例的放大和缩小, 所以出现了上图中三个盒子不一样大的情况

- 那我们如果随便设置一个其他带有长度单位的数字呢, 那么他就不会按项目本身来计算, 所以它不关心内容, 只是把空间等比收缩和放大


### flex-grow

- flex-grow 属性定义项目的放大比例，`默认为0`，即如果存在剩余空间，也不放大。
- 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- flex-grow 值越大是前者的一倍

### flex-shrink属性

- `flex-shrink` 属性定义了项目的缩小比例，`默认为1`，即如果空间不足，该项目将缩小。
- 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。
- 如果一个项目的 `flex-shrink` 属性为0，其他项目都为1，则空间不足时，前者不缩小。
- 优先缩小值大的


### flex-basis属性

`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
- 它可以设为跟 `width` 或 `height` 属性一样的值（比如350px），则项目将占据固定空间。


### flex属性

- flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
- 该属性有两个快捷值：
  - `flex: auto;` ：(1 1 auto) 
  - `flex: none;` (0 0 auto)。

    

## 绘制三角形

- 当 border 足够宽的时候，图形就有4个三角形拼凑而成
- 给其他的 3 个图形设置透明色

```css
#demo {
  width: 0px;
  height: 0px;
  /* 其他设置成 透明色 */
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 40px solid red;
}
```

## 垂直水平局中

1、知道元素宽高

```css
.div {
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -50%; // 元素高度
}
```

2、不知道元素宽高

```css
.div {
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%)
}
```

3、flex 布局

```css
.div {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## position 定位

- static：默认属性，static 定位所导致的元素位置，是浏览器自主决定的，所以这时top、bottom、left、right这四个属性无效。 
- relative：相对定位，
- fixed
- absolute 
- sticky

元素相对最近的 position 为 absolute / relative / fixed 的祖先元素

## 重绘和回流

**回流：**
> 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。

回流必将引起重绘，而重绘不一定引起回流

1. 尺寸、位置、显示、隐藏 `dispaly:none/block` 发生了改变的时候，导致页面需要重新构建，
2. 添加或删除可见的 dom 元素

**重绘：**

当元素的某些样式，比如背景色、border颜色发生变化时，但不影响页面布局，这就是重绘；

优化方法：

1.给 dom 添加 class，而不是修改样式 2.如果需要对dom进行多次样式修改，也可以先将dom隐藏掉，修改完在显示出来（这样只产生两次回流：显示、隐藏）
