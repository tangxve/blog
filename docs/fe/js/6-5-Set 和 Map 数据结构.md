# Set 和 Map 数据结构

[怎么理解ES6新增Set、Map两种数据结构的？](https://vue3js.cn/interview/es6/set_map.html#%E4%B8%80%E3%80%81set)


`Set`: 集合的数据结构

`Map`: 字典的数据结构

- 集合：
    - 一堆无序的、相关联的，且不重复的元素组成的组合
- 字典：
    - 元素的集合。每个元素有一个称作 key 的域，不同元素的 key 各不相同
    
    
- 共同点：元素都不能重复
- 不同点：
    - Set：`[值, 值]` 的形式存储元素
    - Map：`[键, 值]` 的形式存储元素
    

## Set

### 方法
- add() 添加
- delete() 删除
- has() 返回一个布尔值，判断该值是否为Set的成员
- clear() 清除所有成员，没有返回值

### 遍历
- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员


### JavaScript 中 Map 和 Object 的区别
Map对象是一种有对应 键/值 对的对象， JS的Object也是 键/值 对的对象 ；

ES6中Map相对于Object对象有几个区别：

1. Object对象有原型， 也就是说他有默认的key值在对象上面， 除非我们使用Object.create(null)创建一个没有原型的对象；

2. 在Object对象中， 只能把String和Symbol作为key值， 但是在Map中，key值可以是任何基本类型(String, Number, Boolean, undefined, NaN….)，或者对象(Map, Set
   , Object, Function , Symbol , null….);

3. 通过Map中的size属性， 可以很方便地获取到Map长度， 要获取Object的长度， 你只能用别的方法了；

Map实例对象的key值可以为一个数组或者一个对象，或者一个函数，比较随意 ，而且Map对象实例中数据的排序是根据用户push的顺序进行排序的， 而Object实例中key,value的顺序就是有些规律了， (他们会先排数字开头的key值，然后才是字符串开头的key值)；

另: 关于 Array 和 Set, 区别就是 Set 不可以有重复元素, 而 Array 可以有

## Map

### 方法
- size 属性 
- set()
- get()
- has()
- delete()
- clear()

