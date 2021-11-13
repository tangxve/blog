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

// #region flatten
/**
 *
 * @param obj
 * @param deleteProps 如果匹配到对应的值，将对删除对应的属性
 * @returns {{}}
 */

export const flatten = function (obj, deleteProps = [null, undefined]) {
  const result = {}

  const toString = Object.prototype.toString
  const isArray = '[object Array]'
  const isObject = '[object Object]'

  function recurse(params, key) {
    if (toString.call(params) === isArray) {
      if (params.length == 0) {
        result[key] = []
      }

      if (params.length) {
        params.forEach((param, index) => {
          recurse(param, `${ key }[${ index }]`)
        })
      }

    }

    if (toString.call(params) === isObject) {

      const isEmpty = Object.keys(params).length === 0

      if (isEmpty && key) {
        result[key] = {}
      }

      if (!isEmpty) {
        for (let itemKey in params) {
          // 是否有可以删除的属性
          const isDeleteProp = deleteProps.some(v => v === params[itemKey])
          if (!isDeleteProp) {
            recurse(params[itemKey], key ? `${ key }.${ itemKey }` : itemKey)
          }
        }
      }

    }

    // else if 看着不舒服，还是这样吧
    if (toString.call(params) !== isArray || toString.call(params) !== isObject) {
      result [key] = params
    }
  }

  recurse(obj, '')

  return result
}

var input = {
  a: 1, b: [1, 2, { c: true }, [3]], d: { e: 2, f: 3 }, g: null
}

flatten(input)
// #endregion flatten


// #region myNew
// 实现一个 new
export const myNew = function () {

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
// 实现远程相加
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
// 实现远程相加
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

/* 大数相加 */
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


// #region urlParsing
// 获取 url 参数
const urlParsing = function (url) {
  const queryStr = url.split('?')[1] || ''
  if (!queryStr) {
    return {}
  }
  const queryList = queryStr.split('&')
  const params = {}
  for (let i = 0; i < queryList.length; i++) {
    const q = queryList[i]
    if (!q) {
      continue
    }
    if (/=/.test(q)) {
      const [key, val] = q.split('=')
      params[key] = encodeURIComponent(val || '')
    } else {
      params[q] = ''
    }
  }
  return params
}

console.log(urlParsing('http://www.baidu.com?a=aa&b=bb&c=cc&d&'))
// #endregion urlParsing
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

// #region EventBus
class EventBus {
  constructor() {
    this._events = {}
  }

  // 订阅事件
  on(type, fn) {
    if (Array.isArray(type)) {
      for (let i = 0; i < type.length; i++) {
        const e = type[i]
        this.on(e, fn)
      }
    } else {
      const event = this._events[type]
      if (event) {
        event.push(fn)
      } else {
        this._events[type] = [fn]
      }
    }
  }

  // 只执行一次
  once(type, fn) {
    if (Array.isArray(type)) {
      for (let i = 0; i < type.length; i++) {
        const e = type[i]
        this.once(e, fn)
      }
    } else {
      const self = this

      function hander() {
        self.off(type, fn)
        fn.apply(this, arguments)
      }

      this.on(type, hander)
    }
  }

  // 触发事件
  emit(type, ...ars) {
    if (Array.isArray(type)) {
      for (let i = 0; i < type.length; i++) {
        const e = type[i]
        this.emit(e)
      }
    } else {
      const events = this._events[type]
      if (events) {
        for (let i = 0; i < events.length; i++) {
          const e = events[i]
          e.apply(this, ars)
        }
      }
    }
  }

  // 删除事件
  remove(type, fn) {
    if (!this._events[type]) return

    const events = this._events[type]
    let index = events.findIndex(f => f === fn)
    events.splice(index, 1)
  }

  // 关闭所有
  off(type, fn) {
    if (!type) {
      this._events = []
    }
    if (Array.isArray(type)) {
      type.forEach(e => {
        this.off(e, fn)
      })
    } else {
      if (!fn) {
        this._events[type] = []
      }
      const events = this._events[type]
      let index = events.findIndex(f => f === fn)
      while (index !== -1) {
        events.splice(index, 1)
        index = events.findIndex(f => f === fn)
      }
    }
  }
}

// #endregion EventBus

// #region format
/**
 * 千分位数
 * 1、\d{1,3}(?=(\d{3})+$) 表示前面有1~3个数字，后面的至少由一组3个数字结尾
 * 2、?= 表示正向引用，可以作为匹配的条件，但匹配到的内容不获取，并且作为下一次查询的开始
 * 3、$& 表示与正则表达式相匹配的内容
 */
function format1(num) {
  if (!num) return
  const reg = /\d{1,3}(?=(\d{3})+$)/g

  return (num + '').replace(reg, '$&,')
}

console.log(format1(1234556788))
// #endregion format

// #region qianfenwei-reduce
// 千分位数 - reduce 版本
function formatReduce(num) {
  if (!num) return

  const str = num + ''

  // [9,8,7,6,5,4,3,2,1]
  return str.split('')
            .reverse()
            .reduce((pre, next, i) => {
              const acc = (i % 3) ? next : next + ','
              return acc + pre
            })
}

console.log(formatReduce(123456789))
// #endregion qianfenwei-reduce

// #region getValue
// 实现 getValue 函数来获取path对应的值
const getValue = function (obj, path, defaultValue = '') {
  // 1、将[ 替换 .
  // 2、将 ] 替换为空
  // 3、然后更具 . 进行截取
  const paths = path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
  let result = obj
  while (paths.length) {
    const key = paths.shift()
    if (key) {
      result = result[key]
      if (!result) {
        return defaultValue
      }
    }
  }
  return result
}
// #endregion getValue

// #region getValue2
// 字符串 + reduce
const getValue = function (from, ...selectors) {
  const r = selectors.map(s => {
    return s
      // target[xxx] => target.xxx
      .replace(/\[(\w+)\]/g, '.$1')
      .splice('.')
      .reduce((prev, cur) => {
        return prev && prev[cur]
      }, from)
  })
}
// #endregion getValue2

// #region transferKey
const transferKey = function (obj) {
  const transfer = function (str) {
    if (!str) {
      return ''
    }
    if (typeof str !== 'string') {
      return str
    }
    const strList = str.split('_')
    return strList.reduce((pre, next) => {

      // 把字符串的第一位转换成 大写，a => A, bbb => Bbb,
      next = next.replace(next[0], next[0].toUpperCase())

      return `${ pre }${ next }`
    })
  }

  if (typeof obj === 'string') {
    return transfer(obj)
  }

  const _getValue = function (o) {
    const result = Array.isArray(o) ? [] : {}
    for (const key in o) {
      const value = o[key]
      if (Array.isArray(o)) {
        if (typeof value == 'object') {
          result.push(_getValue(value))
        } else {
          result.push(transfer(value))
        }
      } else {
        if (typeof value === 'object') {
          result[transfer(key)] = _getValue(value)
        } else {
          result[transfer(key)] = value
        }
      }
    }
    return result
  }

  return _getValue(obj)
}
const testData = {
  a_bbb: 123, a_g: [1, 2, 3, 4], a_d: {
    s: 2, s_d: 3
  }, a_f: [1, 2, 3, {
    a_g: 5
  }, 'a_b_c'], a_d_s: 1
}
console.log(transferKey(testData))
// #endregion transferKey


// #region parseTree
const text = `
- 章节一
  - 标题一
  - 标题二 
    - 子标题三
      - 子子标题一
  - 标题三
- 章节二
  - 标题一
  - 标题二
`

// 每个节点的内容
class Node {
  constructor({ value, level }) {
    this.value = value
    this.level = level
    this.children = []
  }
}

function parseTree(text) {
  // 根据关键字分割
  const res = text.split('\n').filter(item => item !== '')

  const result = []

  const curNodeArr = []

  let curParent = null

  let curNode = null

  for (let i = 0; i < res.length; i++) {
    if (res[i][0] === '-') {
      curParent = result
      curNode = new Node({ value: res[i].split('- ')[1], level: 1 })
      curParent.push(curNode)
      curNodeArr[0] = curNode
    } else {
      const childArr = res[i].split('- ')
      const level = childArr[0].length / 2 + 1
      const value = childArr[1]
      const nowNode = new Node({ value, level })
      if (curNode.level < level) {
        curNode.children.push(nowNode)
        curParent = curNode
        curNodeArr[level - 1] = curNode = nowNode
      } else if (curNode.level === level) {
        curParent.children.push(nowNode)
        curNodeArr[level - 1] = curNode = nowNode
      } else {
        curNode = nowNode
        curParent = curNodeArr[level - 2]
        curParent.children.push(nowNode)
      }
    }
  }

  console.log(result)

  return result
}

parseTree(text)
// #endregion parseTree


/* 下面是待整理的  */

const _flat = function (arr) {
  // return arr.toString().split(',');
  // while (arr.some(i => Array.isArray(i))) {
  //     arr = [].concat(...arr);
  // }
  // return  arr;
  const result = []
  const foo = function (l) {
    l.forEach(i => {
      if (Array.isArray(i)) {
        foo(i)
      } else {
        result.push(i)
      }
    })
  }
  foo(arr)
  return result
}
console.log(_flat([1, [2, [3, 4, [5, [7]]]]]))

const maxLength = function (str) {
  const result = []
  let maxCount = 0
  for (let i = 0; i < str.length; i++) {
    const s = str[i]
    result[i] = 0
    if (s === 1) {
      result[i] = (result[i - 1] || 0) + 1
      if (maxCount < result[i]) {
        maxCount = result[i]
      }
    }
  }
  return maxCount
}
console.log(maxLength('1011101101111110101'))

// 时间转换
function timeBitmapToRanges(bitmap) {
  function addZero(str) {
    if (+str < 10) {
      return `0${ str }`
    }
    return str
  }

  function arrayToDate(arr) {
    return `${ addZero(arr[0]) }:${ addZero(arr[1]) }`
  }

  const result = []
  let start = [0, 0]
  let end = [0, 0]
  let startIndex = 0
  let endIndex = -1
  for (let i = 0; i < bitmap.length; i++) {
    const b = bitmap[i]
    if (b == 1) {
      if (endIndex < startIndex) {
        endIndex = startIndex
        end = [...start]
      }
      end[1] += 30
      if (end[1] === 60) {
        end[0] += 1
        end[1] = 0
      }
      endIndex = i
      if (i === bitmap.length - 1) {
        result.push(`${ arrayToDate(start) }~${ arrayToDate(end) }`)
      }
    } else {
      if (endIndex >= startIndex) {
        result.push(`${ arrayToDate(start) }~${ arrayToDate(end) }`)
        start = [...end]
      }
      start[1] += 30
      if (start[1] === 60) {
        start[0] += 1
        start[1] = 0
      }
      startIndex = i
    }
  }
  return result
}

console.log(timeBitmapToRanges('000010100000000000000000000000000000000000000011'))


const debounce1 = function (fn, delay) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const debounce = function (fn, delay, immediate) {
  let timer = null
  const _debounce = function (...args) {
    let context = this
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let isRunNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (isRunNow) {
        fn.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
}

const throttle = function (fn, wait) {
  let curry = 0
  let context
  return (...args) => {
    context = this
    let now = +new Date()
    if (now - curry >= wait) {
      fn.apply(context, args)
      curry = now
    }
  }
}

class validate {
  constructor() {
    this.inputValus = []
  }


  add
}

const eleValue = {}

function inputV(event, err) {
  const value = event.target.value

  const errMsg = validate(value)

  err.innerHTML = errMsg

  const className = event.target.className

  delete eleValue[className]

  if (Object.values(eleValue).some(otherV => otherV === value)) {
    err.innerHTML = '存在重复的value'
  }

  eleValue[className] = value
}


function validate(v) {
  console.log(v)
  if (!v.length) {
    return '不能为空'
  }

  if (v.length > 10) {
    return 'overlength'
  }
  return ''
}

const inputEle1 = document.getElementById(1)
const inputEle2 = document.getElementById(2)
const inputEle3 = document.getElementById(3)
const spanEle1 = document.getElementById('span1')
const spanEle2 = document.getElementById('span2')
const spanEle3 = document.getElementById('span3')

inputEle1.addEventListener('input', function (e) {
  inputV(e, spanEle1)
})


/*
实现一个带井发控制的 Promise.allSettled

Tips:

1.相比于 Promise.all()，Promise.allSettled()
当遇到 promise reject 时，会收集错误信息而不是直接 reject。

2. 因为需要控制并发，所以要实现的方法接受的参数不是 promise 数组，
而是 async function 数组（或者一个返回 promise 的普通方法）
*/

function allSettledWithConcurrency(tasks, concurrency) {
  let index = 0
  const stack = []
  const resultArr = []
  const operatePromise = (i, promise, lastest) => {
    if (i >= stack.length) {
      return
    }

    promise()
      .then((res) => {
        resultArr[i] = { status: 'fulfilled', value: res }
        stack.push(1)

        if (stack.length === tasks.length) {
          lastest(resultArr)
          return
        }

        operatePromise(index, tasks[index], lastest)

        index++
      })
      .catch((err) => {
        resultArr[i] = { status: 'rejected', value: err }
        stack.push(1)

        if (stack.length === tasks.length) {
          lastest(resultArr)
          return
        }

        operatePromise(index, tasks[index], lastest)

        index++
      })
  }

  return new Promise((res) => {
    const arr = new Array(tasks.length > concurrency ? concurrency : tasks.length)

    Array.from(arr).forEach(() => {
      operatePromise(index, tasks[index], res)
      index++
    })
  })
}

function successTask(input) {
  return () => new Promise(resolve => {
    setTimeout(() => resolve(input), 1000)
  })
}

function errorTask(input) {
  return () => new Promise((_, reject) => {
    setTimeout(() => reject(input), 1000)
  })
}

console.time('test')

allSettledWithConcurrency([
  successTask(1),
  successTask(2),
  errorTask(3),
  errorTask(4),
  successTask(5)
]).then(res => {
  console.time('test')
  console.log(res)
})


class InputOperator {
  static inputNodeArray = []

  constructor(inputNode, spanNode) {
    this.inputNode = inputNode
    this.spanNode = spanNode
    InputOperator.inputNodeArray.push(this)
  }

  listen() {
    this.inputNode.addEventListener('input', () => {
      InputOperator.inputNodeArray.forEach((item) => {
        item.verify()
      })
    })
  }

  clearSpanText() {
    this.spanNode.innerText = ''
  }

  getInputValue() {
    return this.inputNode.value
  }

  appendMsgToSpan(text) {
    this.spanNode.innerText = text
  }

  verify() {
    this.clearSpanText()

    const value = this.getInputValue()
    if (!value) {
      this.appendMsgToSpan('empty')
    }

    const isInputValue = InputOperator.inputNodeArray
                                      .map(({ inputNode }) => inputNode.value)
                                      .filter(v => v === value).length > 1
    if (isInputValue) {
      this.appendMsgToSpan('有相同的值')
    }

    if (value.length > 10) {
      this.appendMsgToSpan('长度超出')
    }
  }

}


const inputEle1 = document.getElementById(1)
const inputEle2 = document.getElementById(2)
const inputEle3 = document.getElementById(3)
const spanEle1 = document.getElementById('span1')
const spanEle2 = document.getElementById('span2')
const spanEle3 = document.getElementById('span3')

const inputOperator1 = new InputOperator(inputEle1, spanEle1)
const inputOperator2 = new InputOperator(inputEle2, spanEle2)
const inputOperator3 = new InputOperator(inputEle3, spanEle3)

inputOperator1.listen()
inputOperator2.listen()
inputOperator3.listen()















