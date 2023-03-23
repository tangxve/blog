const type = ['分类', '方法', '定义', '语法']
const createArray = [
  '1',
  'ES6 Array.of()\n',
  '返回所有参数值组成的数组，如果没有参数就返回一个空数组',
]
const changeArray = [
  {
    method: 'splice()\n',
    docs: '如果有元素被删除,返回包含被删除项目的新数组',
    // code: 'array.splice(index,howmany,item1,.....,itemX)',
  },
  {
    method: 'sort()\n',
    docs: '对数组元素进行排序，并返回这个数组',
    code: '-',
  },
  {
    method: 'pop()\n',
    docs: '删除一个数组中的最后的一个元素，并且返回这个元素',
    code: '-',
  },
  {
    method: 'shift()\n ',
    docs: '删除数组的第一个元素，并返回这个元素',
    code: '-',
  },
  {
    method: 'push()\n ',
    docs: '可向数组的末尾添加一个或多个元素，并返回新的长度',
    code: '-',
  },
  {
    method: 'unshift()\n',
    docs: '可向数组的开头添加一个或更多元素，并返回新的长度',
    code: '-',
  },
  {
    method: 'reverse()\n',
    docs: '方法用于颠倒数组中元素的顺序',
    code: '-',
  },
  {
    method: 'ES6: copyWithin()\n',
    docs: '在当前数组内部，将指定位置的成员复制到其他位置,并返回这个数组',
    code: '-',
  },
  {
    method: 'ES6: fill()\n',
    docs: '使用给定值，填充一个数组。',
    code: '-',
  },
]
const originArray = [
  {
    method: 'slice()\n 浅拷贝数组的元素',
    docs: '方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且原数组不会被修改',
    code: 'array.slice(begin, end)',
  },
  {
    method: 'join()\n数组转字符串',
    docs: '方法用于把数组中的所有元素通过指定的分隔符进行分隔放入一个字符串，返回生成的字符串。',
    code: '',
  },
  {
    method: 'toLocaleString()\n数组转字符串',
    docs: '返回一个表示数组元素的字符串。该字符串由数组中的每个元素的 toLocaleString()\n 返回值经调用 join()\n 方法连接（由逗号隔开）组成。',
    code: 'array.toLocaleString()\n',
  },
  {
    method: 'cancat()\n数组合并',
    docs: '方法用于合并两个或多个数组，返回一个新数组。',
    code: '',
  },
  {
    method: 'indexOf()\n 查找数组是否存在某个元素，返回下标',
    docs: '返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。',
    code: '',
  },
]
const loopArray = []

export { type, createArray, changeArray, originArray, loopArray }
