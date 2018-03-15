webpackJsonp([0x992155b10d21],{510:function(n,s){n.exports={data:{site:{siteMetadata:{title:"长天之云",author:"ambar"}},markdownRemark:{id:"/Users/lj/dev/ambar.github.com/src/posts/2018-02-05---css-dark-mode.md absPath of file >>> MarkdownRemark",html:'<p>实现主题配色的通常需求有：</p>\n<ul>\n<li>只引用单个颜色变量，在切换主题时自动切换变量对应其他色值</li>\n<li>在一条 CSS 声明中可能会使用到多个颜色，例如多层阴影叠加和渐变色定义</li>\n<li>进行颜色的微调，不同的场景下调整的属性和幅度可能不一样，例如按钮通过降低当前填充色的亮度来应用悬停样式</li>\n<li>在不刷新页面条件下动态切换主题</li>\n</ul>\n<h2>A. 原生 <code>var</code> 实现</h2>\n<p>两种方式：</p>\n<ul>\n<li>调用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model">CSSOM API</a> 设置或改变 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*">custom properties</a></li>\n<li>将颜色变量同时绑定到 <code>:root</code> 和某个公共元素容器上，通过切换容器的属性来切换变量对应的色值</li>\n</ul>\n<p>前者在服务器渲染的场景下不适用，后者的例子：</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token comment">/* 定义颜色 */</span>\n<span class="token selector">:root</span> <span class="token punctuation">{</span>\n  <span class="token property">--myColor</span><span class="token punctuation">:</span> <span class="token string">\'#fff\'</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/* 利用公共元素，当它匹配了特定属性时，改变变量对应色值 */</span>\n<span class="token selector">html[data-theme=\'dark\']</span> <span class="token punctuation">{</span>\n  <span class="token property">--myColor</span><span class="token punctuation">:</span> <span class="token string">\'#000\'</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/* 引用颜色 */</span>\n<span class="token selector">.myComponent</span> <span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--myColor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>原生 var 的缺陷有两个：</p>\n<ul>\n<li>\n<p>不兼容部分浏览器（IE 11 和 Android 4）</p>\n</li>\n<li>\n<p>无法对颜色进行调整：</p>\n</li>\n<li>\n<p>有标准 <a href="https://www.w3.org/TR/css-color-4/#modifying-colors">color-mod</a> 函数，但还未有浏览器实现（更希望浏览器能让开发者自行实现不被支持 API，类似于 <a href="https://github.com/w3c/css-houdini-drafts">w3c/css-houdini-drafts</a>）</p>\n</li>\n<li>\n<p>也无法提前编译（如使用 <a href="https://github.com/postcss/postcss-color-function">postcss-color-function</a>），因为变量的值在编译时还未决定。如果把调整之后的值保存到变量，则需要将每一种重要或不重要的边框、阴影或渐变定义到变量（并且每主题一份），这会使变量表不断增长</p>\n</li>\n</ul>\n<hr>\n<h2>B. PostCSS 实现</h2>\n<p><a href="https://www.npmjs.com/package/postcss-theme-colors">postcss-theme-color</a></p>\n<p>利用 <a href="http://postcss.org/">PostCSS</a> 我们可以定制想要的 CSS API，像原生 var 一样引用颜色，再继续使用 color function 来调整颜色。</p>\n<p>输入:</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">a</span> <span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">cc</span><span class="token punctuation">(</span>G01<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">color</span><span class="token punctuation">(</span><span class="token function">cc</span><span class="token punctuation">(</span>G01<span class="token punctuation">)</span> <span class="token function">alpha</span><span class="token punctuation">(</span>-8%<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>输出:</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">a</span> <span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>\n  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>238, 238, 238, 0.92<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">html[data-theme=\'dark\'] a</span> <span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> #111<span class="token punctuation">;</span>\n  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>17, 17, 17, 0.92<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>配置颜色的例子，<code>postcss.config.js</code>：</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/* 为颜色命名 */</span>\n<span class="token keyword">const</span> colors <span class="token operator">=</span> <span class="token punctuation">{</span>\n  C01<span class="token punctuation">:</span> <span class="token string">\'#eee\'</span><span class="token punctuation">,</span>\n  C02<span class="token punctuation">:</span> <span class="token string">\'#111\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n<span class="token comment">/* 按主题分组 */</span>\n<span class="token keyword">const</span> groups <span class="token operator">=</span> <span class="token punctuation">{</span>\n  G01<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'C01\'</span><span class="token punctuation">,</span> <span class="token string">\'C02\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'postcss-theme-colors\'</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">{</span>colors<span class="token punctuation">,</span> groups<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>缺陷：</p>\n<ul>\n<li>生成的 CSS 文件比无主题使用要大一些</li>\n<li>非默认主题下如果需要重置去掉颜色，会遇到优先级的问题（尽管不太常见）</li>\n</ul>\n<hr>\n<h2>C. 静态编译</h2>\n<p>为每一份主题生成一份 CSS 文件，例如 bundle.light.css、bundle.dark.css。如要切换主题，改变 link 指向的 CSS 文件路径。</p>\n<p>缺陷：对工具使用和引用有过多的要求，尤其是在跨项目引用组件库时会很麻烦（为每个组件生成多份 CSS 或需要将 CSS 配置成源码模式编译）。</p>\n<hr>\n<h2>结论</h2>\n<ul>\n<li>方案 A 最理想，但暂时达不到我们的兼容性要求</li>\n<li>方案 B 最实用，它还能在后期调整参数编译成方案 A 或方案 C</li>\n<li>方案 C 适合有耐心、追求极限文件尺寸的开发者，是一种很快会过时的方案</li>\n</ul>\n<p>PS，我们的配色迁移案例是：</p>\n<ol>\n<li>设计新的色表</li>\n<li>统计项目中所有被使用的颜色（hex/rgb/hsl）</li>\n<li>根据人工决定和<a href="https://zh.wikipedia.org/wiki/%E9%A2%9C%E8%89%B2%E5%B7%AE%E5%BC%82">颜色差异</a>算法生成替换表，替换所有颜色到新色表（448 种颜色使用减少为 20 个色组使用）</li>\n</ol>\n<p>PPS，两个额外的夜间适配技巧：</p>\n<ul>\n<li>对于前景图片或背景图片或 SVG 元素图标，可以应用滤镜：<code>filter: brightness(0.7)</code> 来降低亮度</li>\n<li>对于外链 SVG 的纯文字信息（例如公式），虽然不能继承当前页面文本样式，但也可以使用滤镜 <code>filter: invert(0.6) hue-rotate(180deg)</code> 转换到当前文本的颜色（<code>0.6 = 0x99/0xff</code>）</li>\n</ul>',frontmatter:{title:"CSS 实现夜间模式",date:"2018-02-05 14:44"}}},pathContext:{slug:"/2018-02-05---css-dark-mode/",previous:{fields:{slug:"/2017-11-15---webkit-font-synthesis-bug/"},frontmatter:{title:"用 CSS 修复 WebKit 伪粗体问题"}},next:{fields:{slug:"/2018-02-05---cjkspace/"},frontmatter:{title:"JavaScript 实现中英文空格"}}}}}});