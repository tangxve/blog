const curry = (fn, ...args) => {
  console.log(fn, args)
// 函数的参数个数可以直接通过函数数的.length属性来访问
  return args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
         ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
     */
         : (..._args) => curry(fn, ...args, ..._args)
}

function add1(x, y, z) {
  console.log([...arguments])
}

// const add = curry(add1, 'a', 'b', 'c', 'd')
// console.log(add(1, 2, 3))
// console.log(add(1)(2)(3))
// console.log(add(1, 2)(3))
// console.log(add(1)(2, 3))

function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  })
}

function add(...args1) {
  let sum1 = argsSum(args1)
  let fn = function (...args2) {
    let sum2 = argsSum(args2)
    return add(sum1 + sum2)
  }
  console.log('fn', fn)
  fn.toString = function () {
    return sum1
  }
  return fn
}

console.log(add(1, 2)(3)(4)(10))


function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  //
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}


const list = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]

console.log(JSON.stringify(arrayToTree(list)))


// setTimeout(() => {
//   console.log(1)
//   setTimeout(() => {
//     console.log(2)
//   })
//   new Promise((resolve, reject) => {
//     console.log(3)
//     resolve(4)
//   }).then((s) => {
//     console.log(s)
//   })
// })
//
// setTimeout(() => {
//   console.log(5)
// })
//
// console.log(6)

console.log('=======')

console.log('1');

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3);
    process.nextTick(function foo() {
      console.log(4);
    });
  })
})

Promise.resolve().then(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6)
  })
  Promise.resolve().then(() => {
    console.log(7);
  })
})

process.nextTick(function foo() {
  console.log(8);
  process.nextTick(function foo() {
    console.log(9);
  });
});

console.log('10')
