# TypeScript

[了不起的 tsconfig.json 指南](https://segmentfault.com/a/1190000022809326)

## typescript.json 配置说明

`typescript.json` 文件中指定了用来编译这个项目的根文件和编译选项。

```json lines
{
  "compilerOptions": {
    "baseUrl": "./src",
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```

### 顶层属性

### compilerOptions 编译选项

## interface 接口 和 type 的区别

[type 和 interface 区别](https://zhuanlan.zhihu.com/p/351213183)

> 首先我们从官方的定义中可以看出，对 type 的定义叫 `type alias` (类型别名) 而非直接就叫 type


`interface` 是接口， `type` 是类型，本身就是两个概念，只是碰巧表现上比较相似。

主要区别：

- 接口是通过继承的方式 `extends` 来扩展，类型别名是通过 `&` 来扩展。
- 接口可以自动合并，而类型别名不行

希望定义一个变量类型，就用 `type`，更像类型的一个别名

```ts
// 定义一个类型 Age，她的真正类型是 number
type Age = number

let age: number = 10
let age: Age
```

如果希望能够继承并约束，就用 `interface`，**约束**


如果你不知道该用那个，说明你只是想定义一个类型而非接口，所以应该用type。

### 扩展方式

- 接口：是通过继承的方式 `extends` 来扩展，
- 类型别名：是通过 `&` 来扩展。

```ts
// 接口扩展
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

// 类型别名扩展
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}
```

### 自动合并

接口可以自动合并，而类型别名不行

```ts

interface User {
  age: number
}

interface User {
  name: string
}

/* 接口 User 合并为：

interface User {
  name: string
  name: string
}
 */


// 同名类型会报错（重复定义）
type User = {
  age: number
}

type User = {
  name: string
}

// Error: Duplicate identifier 'User'
```

