# quillEditor 自动获取焦点问题

## 问题

quillEditor 编辑会页面初始化的时候，自动获取焦点，并且滚动到对应的位置，对页面交互很不友好

## 解决方法

### 使用 `enable` 方法来做判断

enable：设置编辑器能够通过输入设备（如鼠标或键盘）的能力。

- 方法接收一个 boolean 值
- 默认关闭
- 异步后开启，也可以用 `nextTick`，**目前项目使用 `nextTick` 不生效，使用了 `setTimeout`**

```js
// 默认关闭
quill.enable(false)

// 异步开启
setTimeout(() => {
  quill.enable(false)
}, 300)
```

### 方法一、ready 方法中调用

支持多个 quill-editor 组件调用，每个组建是一个实例

```vue

<template>
  <quill-editor @ready="setEditorEnable($event)" />
  <quill-editor @ready="setEditorEnable($event)" />
</template>
<script>
export default {
  methods: {
    setEditorEnable(quill) {
      quill.enable(false)
      setTimeout(() => {
        quill.enable(true)
      }, 300)
    }
  }
}
</script>
```

### 方法二、获取实例调用 $refs

```vue

<template>
  <quill-editor ref="quillEditorRef1" />
  <quill-editor ref="quillEditorRef2" />
</template>
<script>
export default {
  methods: {
    setEditorEnable() {
      const quillEles = [this.$refs['quillEditorRef1'], this.$refs['quillEditorRef2']]
      quillEles.forEach(el => {
        el.quill.enable(false)
        setTimeout(() => {
          e.lquill.enable(true)
        }, 300)
      })
    }
  }
}
</script>
```
