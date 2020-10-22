// sort 排序
const arr = [1, 5, 1, 3, 21, 51]

// 生序
console.log(arr.sort((a, b) => a - b))
// ==> [1, 1, 3, 5, 21, 51]

// 降序
console.log(arr.sort((a, b) => b - a))
// ==> [51, 21, 5, 3, 1, 1]

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
