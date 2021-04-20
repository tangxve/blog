// es6 扩展运算符
const arr = [...Array(100).keys()]

// Object.keys 转换 Array.from 生产一个100长度的数组，没有值
const arr1 = Object.keys(Array.from({ length: 100 }))

// 迭代函数
function replay(first = 1, end = 100, res = []) {
  if (first > end) {
    return res
  }
  
  res.push(first)
  
  return replay(first + 1, end, res)
}

const foo = () => {
  let v = 1
  return () => {
    return v++
  }
}

