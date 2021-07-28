// #region flat
export const flat = function (arr = [], depth = 1) {
  
  if (!arr.length) {
    return []
  }
  
  if (!Number(depth) || depth > 0) {
    return this
  }
  
  let result = []
  
  if (depth > 0) {
    result = arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat(cur, depth--) : cur)
    }, [])
    
  } else {
    result = arr.slice()
  }
  
  return result
  
}
// #endregion flat

// #region myNew
function myNew() {
  
  // 创建一个新的对象
  var obj = new Object()
  
  // 获取外部传入的构造函数，并且删除第一次参数
  var Constructor = [].shift.apply(arguments)
  
  // 用的 __proto__ 指向构造函数的原型，来获取原型的属性
  obj.__proto__ = Constructor.prototype
  
  // 继承构造函数的属性，并获取返回值
  var ret = Constructor.apply(obj, arguments)
  
  // 如果构造函数返回值是对象，就返回它，如果不是就返回 新对象
  return typeof ret === 'object' ? ret || obj : obj
  
}

// #endregion myNew

// #region add1
function add(...args) {
  
  if (args.length <= 1) return Promise.resolve(args[0])
  
  const promiseList = []
  
  // 获取2个相邻的参数，传给 addRemote
  for (let i = 0; i * 2 < args.length - 1; i++) {
    const promise = addRemote(args[i * 2], args[i * 2 + 1])
    promiseList.push(promise)
  }
  
  // 对2取余，最后一个参数push
  if (args.length % 2) {
    const promise = Promise.resolve(args[args.length - 1])
    promiseList.push(promise)
  }
  
  return Promise.all(promiseList).then(results => add(...results))
  
}

// #endregion add1

// #region add2
async function add(...input) {
  const promiseList = []
  
  while (promiseList) {
    const [a = 0, b = 0] = input.splice(0, 2)
    
    promiseList.push(addRemote(a, b))
  }
  
  return Promise.all(promiseList).then((res) => {
    
    if (res.length === 1) return res[0]
    
    return add(...res)
  })
}

// #endregion add2

// #region bigNumAdd
let a = '900719925474099'
let b = '123456789999999999'

export const bigNumAdd = function (a, b) {
  // 取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length)
  
  // 用0去补齐长度
  a = a.padStart(maxLength, 0)  // "000900719925474099"
  b = b.padStart(maxLength, 0)  // "123456789999999999"
  
  //定义加法过程中需要用到的变量
  let t = 0
  let f = 0   // 满 10 进位
  let sum = ''
  
  // 从尾端开始计算，也就是从个位开始计算，个十百千万
  for (let i = maxLength - 1; i >= 0; i--) {
    // 对应的下标相加，加上上一的进位 （9 + 9 = 18）
    t = parseInt(a[i]) + parseInt(b[i]) + f
    
    // 相加值，除以10（满10进1位），向下取整，获取到进位（18 / 10 = 1）
    f = Math.floor(t / 10)
    
    // 相加值，对10取余，获取对应的位置的数字（18 % 10 = 8）
    sum = t % 10 + sum
    
    // 第一轮 sum = 8
    // 第二轮 sum = 98
    
  }
  
  // 相加后字符串的第一位（这里指下标的第一位）对应数值应该是最大位（个十百千万）
  if (f == 1) {
    sum = '1' + sum
  }
  return sum
  
}

bigNumAdd(a, b)

// #endregion bigNumAdd

// #region
// #endregion
// #region
// #endregion
// #region
// #endregion
// #region
// #endregion
const arr = [1, 2, 3, 4]
const deleteIndex = 3

const result = arr.reduce((acc, cur, i) => {
  if (i !== deleteIndex) {
    return acc.concat(cur)
  }
  return acc
}, [])

console.log('result', result)
