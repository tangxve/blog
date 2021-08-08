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

// console.log(urlParsing('http://www.baidu.com?a=aa&b=bb&c=cc&d&'));

class EventBus {
  constructor() {
    this._events = {}
  }

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

const _get = function (obj, path, defaultValue = '') {
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
// console.log(_get({ a: [{ b: [{c: 2}] }]}, 'a[0].b[0].c', 3));
// console.log(_get({ a: [[{c: 4}] ]}, 'a[0][0].c', 3));
const object = {'a': [{'b': {'c': 3}}]} // path: 'a[0].b.c'
const array = [{'a': {b: [1]}}] // path: '[0].a.b[0]'
console.log(_get(object, 'a[0].b.c', 'null'))
console.log(_get(array, '[0].a.b[0]', 'null'))

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
console.log(_flat([1, [2, [3, 4, [5, [7]]]]]));

const tuofen = function (obj) {
  const transfer = function (str) {
    if (!str) {
      return ''
    }
    if (typeof str !== 'string') {
      return str
    }
    const strList = str.split('_')
    return strList.reduce((pre, next) => {
      next = next.replace(next[0], next[0].toUpperCase())
      return `${pre}${next}`
    })
  }
  if (typeof obj === 'string') {
    return transfer(obj)
  }
  const _tuofen = function (o) {
    const result = Array.isArray(o) ? [] : {}
    for (const key in o) {
      const value = o[key]
      if (Array.isArray(o)) {
        if (typeof value == 'object') {
          result.push(_tuofen(value))
        } else {
          result.push(transfer(value))
        }
      } else {
        if (typeof value === 'object') {
          result[transfer(key)] = _tuofen(value)
        } else {
          result[transfer(key)] = value
        }
      }
    }
    return result
  }
  return _tuofen(obj)
}
const testData = {
  a_bbb: 123,
  a_g: [1, 2, 3, 4],
  a_d: {
    s: 2,
    s_d: 3
  },
  a_f: [1, 2, 3, {
    a_g: 5
  }, 'a_b_c'],
  a_d_s: 1
}
console.log(tuofen(testData))
// console.log(tuofen(['a_b_c', 'bb_cc_dd', 'c']));
// console.log(tuofen('aa_bb_cc_dd_ee_ff'));
// console.log(tuofen(['aa_bb_cc', ['aaa_bbb_ccc', ['xxx_yyy_zzz']]]))
// console.log(tuofen({
//     aa_aa_aa: 'a',
//     bb_bb_bb: 'b'
// }));
// console.log(tuofen({
//     aa_aa_aa: {
//         cc_cc_cc: {
//             dd_dd_dd: 'b'
//         }
//     },
//     bb_bb_bb: 'b'
// }));

const maxLength = function (str) {
  const result = []
  let maxCount = 0
  for (let i = 0; i < str.length; i++) {
    const s = str[i]
    result[i] = 0
    if (s == 1) {
      result[i] = (result[i - 1] || 0) + 1
      if (maxCount < result[i]) {
        maxCount = result[i]
      }
    }
  }
  return maxCount
}
console.log(maxLength('1011101101111110101'));

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

// 时间转换
function timeBitmapToRanges(bitmap) {
  function addZero(str) {
    if (+str < 10) {
      return `0${str}`
    }
    return str
  }

  function arrayToDate(arr) {
    return `${addZero(arr[0])}:${addZero(arr[1])}`
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
        result.push(`${arrayToDate(start)}~${arrayToDate(end)}`)
      }
    } else {
      if (endIndex >= startIndex) {
        result.push(`${arrayToDate(start)}~${arrayToDate(end)}`)
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

console.log(timeBitmapToRanges('000010100000000000000000000000000000000000000011'));
