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

## 接口 和 type 的区别
