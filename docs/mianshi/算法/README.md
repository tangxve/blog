# JS 算法

## 除了用for，实现一个0-n的数组
### es6 扩展运算符
```javascript
// es6 扩展运算符
const arr = [...Array(100).keys()]

// Object.keys 转换 Array.from 生产一个100长度的数组，没有值
const arr1 = Object.keys(Array.from({ length: 100 }))

// 迭代函数
// 注意，将res也放进去迭代
function replay(first = 1, end = 100, res = []) {
  if (first > end) {
    return res
  }
  
  res.push(first)，
  
  return replay(first + 1, end, res)
}
```

## 排序

### sort 排序
```javascript
// sort 排序
const arr = [1, 5, 1, 3, 21, 51]

// 生序
console.log(arr.sort((a, b) => a - b))
// ==> [1, 1, 3, 5, 21, 51]

// 降序
console.log(arr.sort((a, b) => b - a))
// ==> [51, 21, 5, 3, 1, 1]
```

### 冒泡排序 bubbleSort
```javascript
// 冒泡排序 bubbleSort
function bubbleSort(list) {
  // 控制轮数
  for (let i = 0; i < list.length - 1; i++) {
    // 控制每轮的比较次数
    for (let j = 0; j < list.length - 1 - i; j++) {
      // 前后做比较
      if (list[j] > list[j + 1]) {

        // 临时存储
        let temp = list[j]
        
        // 替换位置排序
        list[j] = list[j + 1]
        list[j + 1] = temp
      }
    }
  }
  return list
}
```

### 选择排序 insertSort
```javascript
// 选择排序 insertSort
function insertSort(list) {
  let min // 最小值
  let pos // 最小下标
  
  for (let i = 0; i < list.length - 1; i++) {
    // 假设一个最小
    min = list[i]
    pos = i
    
    for (let j = 0; j < list.length - 1; j++) {
      // 比较
      if (list[j] < min) {
        min = list[j]
        pos = j
      }
    }
    
    // 临时存储
    let temp = list[i]
    
    // 替换位置
    list[i] = min
    list[pos] = temp
  }
}
```

