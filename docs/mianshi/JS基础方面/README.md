# JS 基础方面

### JS 数组

#### push() 数组 尾部 添加，返回该数组的新长度。
```javascript
const arr = ['a','b']

console.log(arr.push('c'))  // ==> 3 返回数组长度

console.log(arr) // ==> ['a','b','c'] 数组尾部添加 
```

#### unshift() 数组 头部 添加，返回该数组的新长度。
```javascript
const arr = ['a','b']

console.log(arr.unshift('c'))  // ==> 3 返回数组长度

console.log(arr) // ==> ['c','a','b'] 数组头部添加 

```

#### pop() 删除数组 末尾 元素，返回被删除的元素的值
```javascript
const arr = ['a','b','c']

console.log(arr.pop())  // ==> 'c' 返回被删除的元素的值

console.log(arr) // ==> ['a','b'] 删除数组末尾的元素
```

#### shift() 删除数组 头部 元素，返回被删除的元素的值
```javascript
const arr = ['a','b','c']

console.log(arr.shift())  // ==> 'a' 返回被删除的元素的值

console.log(arr) // ==> ['b','c']  删除数组 头部 元素
```

#### indexOf 找出某个元素在数组中的索引
     
     
## 算法
### 除了用for，实现一个0-n的数组
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
  
  res.push(first)
  
  return replay(first + 1, end, res)
}
```
