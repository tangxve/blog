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



// #region
// #endregion
// #region
// #endregion
// #region
// #endregion
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
  return  acc
}, [])

console.log('result', result)
