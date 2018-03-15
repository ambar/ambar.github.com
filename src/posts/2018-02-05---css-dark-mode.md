---
title: CSS 实现夜间模式
date: "2018-02-05T14:44:00.000Z"
---

实现主题配色的通常需求有：

* 只引用单个颜色变量，在切换主题时自动切换变量对应其他色值
* 在一条 CSS 声明中可能会使用到多个颜色，例如多层阴影叠加和渐变色定义
* 进行颜色的微调，不同的场景下调整的属性和幅度可能不一样，例如按钮通过降低当前填充色的亮度来应用悬停样式
* 在不刷新页面条件下动态切换主题

## A. 原生 `var` 实现

两种方式：

* 调用 [CSSOM API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model) 设置或改变 [custom properties](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)
* 将颜色变量同时绑定到 `:root` 和某个公共元素容器上，通过切换容器的属性来切换变量对应的色值

前者在服务器渲染的场景下不适用，后者的例子：

```css
/* 定义颜色 */
:root {
  --myColor: '#fff';
}

/* 利用公共元素，当它匹配了特定属性时，改变变量对应色值 */
html[data-theme='dark'] {
  --myColor: '#000';
}

/* 引用颜色 */
.myComponent {
  color: var(--myColor);
}
```

原生 var 的缺陷有两个：

* 不兼容部分浏览器（IE 11 和 Android 4）
* 无法对颜色进行调整：

* 有标准 [color-mod](https://www.w3.org/TR/css-color-4/#modifying-colors) 函数，但还未有浏览器实现（更希望浏览器能让开发者自行实现不被支持 API，类似于 [w3c/css-houdini-drafts](https://github.com/w3c/css-houdini-drafts)）
* 也无法提前编译（如使用 [postcss-color-function](https://github.com/postcss/postcss-color-function)），因为变量的值在编译时还未决定。如果把调整之后的值保存到变量，则需要将每一种重要或不重要的边框、阴影或渐变定义到变量（并且每主题一份），这会使变量表不断增长

---

## B. PostCSS 实现

[postcss-theme-color](https://www.npmjs.com/package/postcss-theme-colors)

利用 [PostCSS](http://postcss.org/) 我们可以定制想要的 CSS API，像原生 var 一样引用颜色，再继续使用 color function 来调整颜色。

输入:

```css
a {
  color: cc(G01);
  background-color: color(cc(G01) alpha(-8%));
}
```

输出:

```css
a {
  color: #eee;
  background-color: rgba(238, 238, 238, 0.92);
}

html[data-theme='dark'] a {
  color: #111;
  background-color: rgba(17, 17, 17, 0.92);
}
```

配置颜色的例子，`postcss.config.js`：

```js
/* 为颜色命名 */
const colors = {
  C01: '#eee',
  C02: '#111',
}
/* 按主题分组 */
const groups = {
  G01: ['C01', 'C02'],
}

module.exports = {
  plugins: [require('postcss-theme-colors')({colors, groups})],
}
```

缺陷：

* 生成的 CSS 文件比无主题使用要大一些
* 非默认主题下如果需要重置去掉颜色，会遇到优先级的问题（尽管不太常见）

---

## C. 静态编译

为每一份主题生成一份 CSS 文件，例如 bundle.light.css、bundle.dark.css。如要切换主题，改变 link 指向的 CSS 文件路径。

缺陷：对工具使用和引用有过多的要求，尤其是在跨项目引用组件库时会很麻烦（为每个组件生成多份 CSS 或需要将 CSS 配置成源码模式编译）。

---

## 结论

* 方案 A 最理想，但暂时达不到我们的兼容性要求
* 方案 B 最实用，它还能在后期调整参数编译成方案 A 或方案 C
* 方案 C 适合有耐心、追求极限文件尺寸的开发者，是一种很快会过时的方案

PS，我们的配色迁移案例是：

1.  设计新的色表
2.  统计项目中所有被使用的颜色（hex/rgb/hsl）
3.  根据人工决定和[颜色差异](https://zh.wikipedia.org/wiki/%E9%A2%9C%E8%89%B2%E5%B7%AE%E5%BC%82)算法生成替换表，替换所有颜色到新色表（448 种颜色使用减少为 20 个色组使用）

PPS，两个额外的夜间适配技巧：

* 对于前景图片或背景图片或 SVG 元素图标，可以应用滤镜：`filter: brightness(0.7)` 来降低亮度
* 对于外链 SVG 的纯文字信息（例如公式），虽然不能继承当前页面文本样式，但也可以使用滤镜 `filter: invert(0.6) hue-rotate(180deg)` 转换到当前文本的颜色（`0.6 = 0x99/0xff`）
