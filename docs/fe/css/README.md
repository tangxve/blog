# css 相关

## BFC

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
  margin-top: -50% 元素高度;
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
