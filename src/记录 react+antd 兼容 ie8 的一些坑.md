因为毕设要求兼容 ie8，所以这几天先把整个开发框架搭出来了，我整理过后会发出来

配置主要参考了以下链接：

-   [https://github.com/xcatliu/react-ie8](https://github.com/xcatliu/react-ie8)
-   [https://github.com/brickspert/react-family-ie8](https://github.com/brickspert/react-family-ie8)
-   [https://github.com/ant-design/antd-init](https://github.com/ant-design/antd-init)

### 首先，ReactV15 不支持 ie8，所以我只能妥协使用 0.14 的版本，由于 ie8 一些功能的缺失，需要引入一些库：

-   `es5-shim`：es5 兼容库
-   `es3ify-loader`：解决 es3 语法兼容问题
-   `es6-promise`：promise 的一个 polyfill
-   `console-polyfill`：由于 ie8 的奇葩特性，在打开控制台时才会有 console 属性，所以 console 也需要一个 polyfill

### 接着，我引入了`antd`，最开始我使用的时 0.12.x 版本

引入后报错，发现 antd 依赖的一个库 Velocity.js 在低版本的 ie 下需要 jq 辅助，遂在全局引入 jq

继续测试时发现，在 build 之后，icon 显示不正常，诡异的是，字体文件是向 file://也就是本地文件请求，但应该通过 http 请求才对，查看源码，它的 css 文件中 font-face 的属性是 src:url('//at.alicdn.com/xxxxx')，我自己写了一个 css 文件加上了 https，覆盖了这个 style，解决了这个问题。
最后，我把 antd 升级到了^1.11.6 版本，其 font-face 的 src: url('https://at.alicdn.com/xxxx')， 已经加上了 https，就不用多管了。

### 本来我是想自己写一个 router 的，但图方便，还是看看 router 的兼容性怎么样

最开始，我直接引入了`react-router-dom`@^4.2.2，报了 Exception thrown and not caught 的错，一看，是代码里出现了`Object.defineProperty`，这个方法很坑，模拟不了，加什么 polyfill 都没用，司徒正美说通过 VBScript 实现了，我没深究，感兴趣的可以研究一下。出现`Object.defineProperty`是因为 babel 把`export * from 'xxx`这种格式的代码转化为`Object.defineProperty`实现了。
我看了下`react-router-dom`的源码，很规矩的先引入再输出，并没有连在一起，但在其依赖库的 history 中出现了这种代码：

```js
export { createLocation, locationsAreEqual } from "./LocationUtils";
```

最后被 babel 转成了`Object.defineProperty`，
我当时想了两种解决方法，一是改源码，二是降级，最后我选择了降级，使用了`react-router`@2.3.0，不过这个版本的`react-router`写起来很难受，地址后面还要跟一串字符，体验很差。

一个简单的框架就搭起来了，但这才是刚刚开始，后续根据需求会考虑引入`redux`等，我在 ie8 开发中遇到的坑也会持续更新在这篇文章中
