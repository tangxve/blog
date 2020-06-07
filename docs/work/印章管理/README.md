# 任务中心

任务中心技术方案

## 一、需求背景

### 1. 迭代名称
迭代名称
wiki地址

### 2. 目标

目标是什么

## 二、难点调研（包含技术选型）
写出详细的难点，没有则填无

## 三、技术方案

### 1. 流程图
1.1 前端代码模块变更需要单独罗列
1.2 流程图

### 2. 接口/页面设计
页面和接口的关系

### 3. 前端组件
### 模版列表组件 (template-list)

### List Attributes

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| data | 显示的数据 | Array | - | - | 
| tpye | 显示的类型。<br>``radio``: 单选<br> ``checkbox``: 多选 | String | radio / checkbox | - | 
| max-selection | 多选情况下，最多可以选择的数据。<br>``超出后其他未选择数据为 disabled 状态``。 <br>``list-item (单个数据)`` 如果设置了 disabled 状态，优先 list-item 自身的状态 | number | - | - | 


### List Event

|事件名称|说明|返回参数|
|---|---|---|
| select | 当前用户选择的数据时触发的事件 | ``selection``: 已经被选择数据<br>`row`: 当前选择的数据 |
| selection-change | 当选择项发生变化时会触发该事件 | ``selection``: 已经被选择数据 |

### List-item Attributes
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
| disabled | 是否禁用 | boolean | - | false |

### List-item Scoped Slot
|name|说明|
|---|---|
| - | 自定义内容，参数为 { row } |

```vue
<template>
  <list :data="listData" tpye="checkbox" :max-selection="20">
    <list-item slot-scope="{row}" :disabled="row.disabled">
      <span>{{ row.tempName }}</span>
    </list-item>
  </list>
</template>
```
 

### 4. 兼容性

某些特性是否支持到绝大多数浏览器

### 5. 性能问题

## 四、任务排期
排期表：xxxx

