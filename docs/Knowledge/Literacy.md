[[toc]]

## 严格模式

严格模式是引入一些限制来提高代码安全性和可维护性

- 对于一些静默错误, 严格模式下会直接抛出错误
- 严格模式修复了一些 Js 引擎难以执行优化的缺陷, 提升了性能
- 严格模式禁用了新式语法

具体规则:

- 禁止

## tsconfig.json

```json
// 当前配置为默认值
{
  // 相对路径或绝对路径的文件列表, 指定 tsc 编译器需要编译的文件列表
  "files": ["dir1/index.ts"],

  // 需要支持的文件列表, 支持 glob 通配符
  "include": ["dir2/**/*"],

  // 指定排除的文件列表, 但不能排除 files 直接指定的文件, 默认包含 node_modules
  "exclude": ["dir2/index2.ts"],

  // 从另一个文件继承配置
  "extends": "",

  // 编译配置
  "compileOptions": {
    "target": "es5",

    "jsx": "preserve",
    // 指定生成目标为 react JSX 时使用的 JSX 工厂函数
    "jsxFactory": "React.createElement",

    // 是否生成 sourcemap 文件
    "sourcemap": false,
    // 生成单个 sourcemap 文件, 需要开启 sourcemap 选项
    "inlineSourceMap": false,

    // 允许编译 js 文件
    "allowJs": false,

    // module === 'system' 或者设置了 esModuleInterop 且 module 不为 es2015/esnext
    // 允许从没有设置默认导出的模块中默认导入, 不影响代码输出, 仅作为类型检查
    "allowSyntheticDefaultImports": false,

    // 通过为导入内容创建命名空间, 实现 CommonJS 和 ES 模块之间的互操作性
    "esModuleInterop": false,

    // 不报告执行不到的代码错误
    "allowUnreachableCode": false,

    // 不报告未使用的标签错误
    "allowUnusedLabels": false,

    // 以严格模式解析, 并为每个源文件生成 "use strict" 语句
    "alwaysStrict": false,

    // 解析非相对模块名的基准目录
    "baseUrl": ".",

    // 输入文件的字符集
    "charset": "utf8",

    // 在 .js 文件中报告错误, 与 allowJs 配合使用
    "checkJs": false,

    // 生成相应的 .d.ts 文件
    "declaration": false,

    // 生成声明文件的输出路径
    "declarationDir": "",

    // 显示诊断信息
    "diagnostics": false,

    // 禁用 Js 工程体积大小的限制
    "disableSizeLimit": false,

    // 在输出文件的开头加入 BOM 头(UTF-8 Byte Order Mark), 用于标识文件编码格式
    "emitBOM": false,

    // 启用装饰器元数据的生成
    "emitDecoratorMetadata": false,
    // 启用实验性的ES装饰器
    "experimentalDecorators": false,

    // 不生成输出文件
    "noEmit": false,

    // 报错时不生成输出文件
    "noEmitOnError": false,

    // 在表达式和声明上有隐含的 any 类型时报错
    "noImplicitAny": false,

    // 不是函数的所有返回路径都有返回值时报错
    "noImplicitReturns": false,

    // 当 this 表达式的值为 any 类型时, 生成错误
    "noImplicitThis": false,

    // 不包含默认的库文件(lib.d.ts)
    "noLib": false,

    // 有未使用的局部变量则报错
    "noUnusedLocals": false,

    // 有未使用的参数则报错
    "noUnusedParameters": false,

    // 重定向输出目录, 不能和 outFile 同时使用
    "outDir": "dist",

    // 将输出文件合并为一个文件, 合并顺序根据传入编译器的文件顺序和 ///<reference``> 和 import 的文件顺序决定
    "outFile": "",

    // 模块别名配置
    "paths": {},

    // 是否保留 const 和 enum 声明, 用于优化输出或调试
    "preserveConstEnums": false,

    // 保留 watch 模式下过时的控制台输出
    "preserveWatchOutput": false,

    // 控制输出的目录结构, 例如: 当你的代码在 src 目录下, 输出会生成一层 src 目录, 将 rootDir 指定为 src 就可以去掉
    "rootDir": "",

    // 忽略所有声明文件(*.d.ts)的类型检查
    "skipLibCheck": false,

    // 禁用函数参数双向协变检查
    "strictFunctionTypes": false,

    // 确保类的非 undefined 属性已经在 构造函数里初始化, 需要同时启用 strictNullChecks
    "strictPropertyInitialization": false,
    // 在严格的 null 检查模式下, null 和 undefined 值不包含在任何类型里, 只允许用它们自己和 any 来赋值(undefined 可以 复制 void)
    "strictNullChecks": false
  }
}
```

### compileOptions

- target

  编译 Js 的版本, 默认为 ES3

  - ES3: 最广泛支持的版本
  - ES5: 大多数现代浏览器支持
  - ES6/ES2015: 引入了类、模块、箭头函数、Promise等新特性
  - ES7/ES2016: 引入了 Array.prototype.includes 和幂运算符
  - ES8/ES2017: 引入了 async/await
  - ES9/ES2018: 引入了异步迭代等特性
  - ES10/ES2019: 引入了 Array.prototype.flat 和 Object.fromEntries
  - ES11/ES2020: 引入了可选链和空值合并运算符
  - ES12/ES2021: 引入了 Promise.any 和逻辑赋值运算符
  - ES13/ES2022: 引入了类字段和顶级 await
  - ESNext: 编译为最新的 ECMAScript 版本, 包含所有新特性

- jsx

  如何处理 JSX 语法

  - preserve: 保留 JSX 语法, 不进行转换, 通常与 babel 等工具链结合使用
  - react: 将 JSX 转换为 React.createElement 调用
  - react-jsx: 将 JSX 转换为 新的 JSX 转换器(React 17 及以上版本引入), 不再需要显式导入 React
  - react-jsxdev: 与 react-jsx 类似, 但用于开发模式, 提供额外的调试信息

- module

  指定 TS 编译器生成的模块系统类型

  - commonjs: 适用于 Node.js 环境
  - es6/es2015: 使用 ES6 模块语法
  - esnext: 与 es6 类似, 但允许使用最新的 es 模块特性
  - amd: 异步模块定义, 主要用于浏览器环境, 使用 define 和 require
  - umd: 通用模块定义, 兼容 CommonJS 和 AMD, 适用于库的开发
  - system: 使用 SystemJS 模块加载器的模块格式
  - none: 不使用任何模块系统, 所有代码视为全局脚本
