webpackJsonp([0x7372a98af4f6],{507:function(n,a){n.exports={data:{site:{siteMetadata:{title:"长天之云",author:"ambar"}},markdownRemark:{id:"/Users/lj/dev/ambar.github.com/src/posts/2017-11-04---align-svg-icon-to-text.md absPath of file >>> MarkdownRemark",html:'<p>关于对齐的常见问题：</p>\n<ol>\n<li>浏览器本身如何对齐图标和文本？</li>\n<li>如何封装一个图标组件，使其无论大小如何变化，都能自动对齐临近的文本？</li>\n<li>为什么明明使用了 flex，图标还是看起来差了 1 像素没对齐？</li>\n</ol>\n<hr>\n<p>有两种让浏览器自行对齐的方式（<a href="http://link.zhihu.com/?target=https%3A//codepen.io/ambarli/pen/vWLova%3Feditors%3D0010">CodePen demo：浏览器对齐</a>）：</p>\n<p><strong>一、 flex container</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token operator">&lt;</span>button style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>display<span class="token punctuation">:</span> <span class="token string">\'inline-flex\'</span><span class="token punctuation">,</span> alignItems<span class="token punctuation">:</span> <span class="token string">\'center\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span>Icons<span class="token punctuation">.</span>Heart <span class="token operator">/</span><span class="token operator">></span>\n  Like\n<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n</code></pre>\n      </div>\n<p>缺陷：需要创建 flex 容器来包裹图标和文本，而不是仅仅通过修改图标的样式。</p>\n<p><strong>二、 vertical-align middle</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token operator">&lt;</span>button<span class="token operator">></span>\n  <span class="token operator">&lt;</span>Icons<span class="token punctuation">.</span>Heart style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>verticalAlign<span class="token punctuation">:</span> <span class="token string">\'middle\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span>span style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>verticalAlign<span class="token punctuation">:</span> <span class="token string">\'middle\'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>Like<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n</code></pre>\n      </div>\n<p>缺陷：需要创建额外标签将文本包裹起来，并且文本偏移了 baseline（将影响上下间距和相邻元素的对齐）。</p>\n<hr>\n<p>虽然上面的方式达到了对齐效果，但浏览器本身如何决定图标放置，参照什么来放置？</p>\n<p>可以先从字体特征与 CSS <code>vertical-align</code> 开始探索：</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-60d3b.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 26.46484375%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFABQDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAECBf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdm4SD//xAAWEAEBAQAAAAAAAAAAAAAAAAABAhD/2gAIAQEAAQUCIoEc/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAGBAAAgMAAAAAAAAAAAAAAAAAAAEQMTL/2gAIAQEABj8C22XH/8QAGhAAAgIDAAAAAAAAAAAAAAAAAAERITFBgf/aAAgBAQABPyGIO4MYdcLW5P/aAAwDAQACAAMAAAAQcA//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/ED//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/ED//xAAaEAEBAAIDAAAAAAAAAAAAAAABEQAxIUFR/9oACAEBAAE/EGCpTUOC6xSmySHOhp7N5//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="vertical-align"\n        title=""\n        src="/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-b80fa.jpg"\n        srcset="/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-cf410.jpg 163w,\n/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-62f2a.jpg 325w,\n/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-b80fa.jpg 650w,\n/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-08cb4.jpg 975w,\n/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-f2bf9.jpg 1300w,\n/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-fd4ba.jpg 1950w,\n/static/2017-11-04---01-39454b17f1a3327c9dda72a69255e200-60d3b.jpg 2048w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>图 1：vertical-align</p>\n<p>简要说明：</p>\n<ul>\n<li>\n<p>最左侧是一个已对齐的图标，尺寸为 1.2em</p>\n</li>\n<li>\n<p>最右侧文字标注了横向参考线，除 <code>cap-line</code> 外都是 <code>vertical-align</code> 的可选值</p>\n</li>\n<li>\n<p><code>vertical-align</code> 作用于文本和非文本（如图片元素）效果不同，以应用 <code>vertical-align: baseline</code> 样式为例：</p>\n</li>\n<li>\n<p>同一行内不同字体类型、字体大小或不同行高的文本对齐在相同 baseline 上</p>\n</li>\n<li>\n<p>同一行内不同尺寸的图片底边对齐在 baseline 上</p>\n</li>\n<li>\n<p><code>xHeight</code> 为小写字母 x 的高度（CSS 有 <code>ex</code> 单位表示它，<code>1ex</code> 约为 <code>0.5em</code> 左右 ）， <code>vertical-align: middle</code> 的定义就是它的一半高度，因此仅仅对图片应用 <code>vertical-align: middle</code>样式图片会看起来太靠下</p>\n</li>\n<li>\n<p><code>capHeight</code> 为大写字母高度（CSS/JS 均无法获取，多数字体约为 <code>0.7em</code>）</p>\n</li>\n</ul>\n<h2>近似对齐：放置在 cap-line 与 baseline 中间</h2>\n<p>从图 1 的直接猜测是把图片对齐在大写字母中间，即在 baseline 往上移动 <code>capHeight</code> 的一半。</p>\n<p>这种对齐有两种实现方式（<a href="http://link.zhihu.com/?target=https%3A//codepen.io/ambarli/pen/NwNKwN%3Feditors%3D0010">CodePen demo：Cap 对齐</a>）：</p>\n<p><strong>一、从 baseline 开始偏移</strong></p>\n<p>默认，图标底边贴在 baseline 上，先移动图标自身 50% 使图标中间对齐 baseline，然后上移<code>capHeight</code>的一半。</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token comment">/* 计算公式：capHeight / 2 / unitsPerEm ≈ 0.35em */</span>\n\n<span class="token selector">.center</span> <span class="token punctuation">{</span>\n  <span class="token property">vertical-align</span><span class="token punctuation">:</span> baseline<span class="token punctuation">;</span>\n  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span><span class="token function">calc</span><span class="token punctuation">(</span>50% - 0.35em<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/* 或者将 `capHeight` 可能成变量，动态获取 */</span>\n<span class="token comment">/* translateY(calc(50% - var(—capHeight, .35em))) */</span>\n</code></pre>\n      </div>\n<p>缺陷：添加 CSS 动画会因占用了属性而冲突。</p>\n<p><strong>二、</strong>从 <strong>middle-line 开始偏移</strong></p>\n<p>图标中央就在 middle-line 上，因此先下移<code>xHeight</code>的一半，再上移<code>capHeight</code>的一半。</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/*\n// 计算公式\ntop\n  = (xHeight/2 - capHeight/2) / unitsPerEm\n  ≈ .5em/2 - .7em/2\n  ≈ -.1em\n\n// 或复用 ex 单位来计算\ntop\n  = 1ex/2 - capHeight/2 / unitsPerEm\n  ≈ calc(0.5ex - 0.35em)\n*/</span>\n\n<span class="token comment">// JSX</span>\n<span class="token operator">&lt;</span>button<span class="token operator">></span>\n  <span class="token operator">&lt;</span>Icons<span class="token punctuation">.</span>Heart\n    style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n      verticalAlign<span class="token punctuation">:</span> <span class="token string">\'middle\'</span><span class="token punctuation">,</span>\n      position<span class="token punctuation">:</span> <span class="token string">\'relative\'</span><span class="token punctuation">,</span>\n      top<span class="token punctuation">:</span> <span class="token string">\'-.1em\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">}</span>\n  <span class="token operator">/</span><span class="token operator">></span>\n  Like\n<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n</code></pre>\n      </div>\n<p>无论选择哪种偏移方式，偏移值都会根据当前字体不同而有细微差异，见下图的高亮列：</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-26561.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 29.715639810426538%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAyklEQVQY012RiQ4EIQhD/f9/nds5Fdg+s042a0KKUlrRtO97uHuwaq2xrmvknCNvW8O233JUs7cOsuw8w44jXDW48zxH2tR433cjPc/T8o6llLiu6yUfauYCBAYmjsnAv2doJRwhgwidckUERBSkNgxDLMvSxMdxbPsiA9OZSQixaZoiIUbSxlT8CoIEHGoYIA7/lnlFUEKunNtTTxBR58r/I3ekbhqRt+7CLBe6noUfqEJWYgyChv5mBE09qFNDsJt7/xQZkDMRGh+3EtLu9051NAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Font Metrics"\n        title=""\n        src="/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-10273.png"\n        srcset="/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-9b14a.png 163w,\n/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-94962.png 325w,\n/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-10273.png 650w,\n/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-2fc6f.png 975w,\n/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-a8a2c.png 1300w,\n/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-173d2.png 1950w,\n/static/2017-11-04---fm-bccb88c74d4b6a5a748cee2333621696-26561.png 2110w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>图 2：Font Metrics</p>\n<h2>精确对齐：对齐定高文本</h2>\n<p>「精确」指达到与浏览器自行对齐相同的效果。需求来自问题 2，如何封装一个图标组件，仅通过修改图标本身来对齐相邻文本。</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-ec77b.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 61.58038147138964%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAAChElEQVQoz2VTS08TURjtv2Phhq0LY2JcGNEYU9lUAU0QFhIDGDAuCuGRoCyMwURbwWKAtJSWvqSP2AFKoQ/6YGbamWE6j3v42ukUiDM5+eZ+537nfnfuuQ7DMGAYOqx4Dc3QerjOm9B1hSASGt3Y6uTtOQ7GGEwAnWiaMBmNGP572hxNIYECVDVCiOPych/5/L8bPCNB+oAqg+maVUlFoiHCJ/ngk33YErYgK7JFEadpBRKN0yhDolHwfKkraBBvkmCjDmF+GMXIDnhZ6QgWqIux2jje1sYwWZxE6bxsr0VPBaIYBHe4QcIJCEIZl6rW24nDFKoIjD7Cof837HRBLWKqPoXpxjTclTnkTk6QTqeh078qlVKYnX2DpaX3cLvHUS7nwHFHyHIcdctTh2INnlcPkdnyoiaIlqBSwMDKAFy7Lgx9HUIsGUM0Eu1wseg2Rkaeolr1I5v10ELEReMkykGSJDh0voyPT+4i7P1GhQdQRBnn9A5uDKLvQR9mcjOIJCLI5Y6pQ0bbLiEUXsXU9DC+rE4inYniIJlES2tZWzaECuaf30Ni8wf8oT1srvuQrKfgXHOi/0U/JsITSGT+wvvLi1g8jv3IH6xvuHEhBOF6+Ri7wR1CEB6vB7WLOnVYLeLD/Ts4CfjQamkwZRWn/DGcP59hNPsaw99daDR4qE0JZktHk+fwefkd3J/GENhehtw4hyopBKntKTiOuCzWluegCrWe/Sp6BYvSIhakBazUV+gk+Z5tGGufeBrMTFFModms9k7Y8iFjtxI2OibvmtXibGOfkaFDtJsYFGUPp6fZGzwJtot03bp6tsgtdK9V27imyWguT+bOE85INE+erHfydv0VhbVoxt3UDe0AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="line-height"\n        title=""\n        src="/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-10273.png"\n        srcset="/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-9b14a.png 163w,\n/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-94962.png 325w,\n/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-10273.png 650w,\n/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-2fc6f.png 975w,\n/static/2017-11-04---lh-38501868abaab5c414630d5e7ac59db0-ec77b.png 1101w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>图 3：三种 line-height</p>\n<p>这个图很有趣，内联元素在不同条件下产生了不同的边界（颜色填充区域），简要说明（<a href="http://link.zhihu.com/?target=https%3A//codepen.io/ambarli/pen/bYpbvp%3Feditors%3D0010">CodePen demo：浏览器本身如何对齐</a>）：</p>\n<ul>\n<li><code>j</code> 表示基础的 <code>line-height</code>，也就是 <code>1em</code> 高，等同于当前的 <code>font-size</code> 100px，当 inline-block 元素（也可以是 inline-flex item）设置为 <code>line-height: 1</code> 时可以得到它。值得注意 <code>j</code> 的边界不在任何参考线上。此图也能说明不要误用这个值，有可能（如应用 overflow 样式）内容溢出导致截断。</li>\n<li><code>x</code> 表示安全的 <code>line-height</code>，是 inline 元素默认的高度（也是 <code>text-top</code> 到 <code>text-bottom</code> 的距离）。也可以由图 2 中的 <code>(ascender + descender) / unitsPerEm</code> 计算得到（当前字体对应表格中第三行的值，1.1777）。</li>\n<li><code>S</code> 表示实际的 <code>line-height</code> ，是 inline-block 或 inline-flex 元素默认高度（也是<code>top</code> 到 <code>bottom</code> 的距离）。当设置父容器 <code>line-height: 1.7</code> 时，实际 <code>line-height</code> 将是 <code>100px * 1.7 = 170px</code>。</li>\n</ul>\n<p>有了上面的图例，精确对齐思路可以借鉴 CSS 规范中的 <a href="http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS22/visudet.html%23strut">strut</a> 概念，创建一个局部的容器，生成不可见文本（零宽空格，模拟 strut），让不可见文本对齐 line-box 中其他文本，让图标对齐这个不可见文本：</p>\n<blockquote>\n<p>On a <a href="http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS22/visuren.html%23block-boxes">block container element</a> whose content is composed of <a href="http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS22/visuren.html%23inline-level">inline-level</a> elements, ‘line-height’ specifies the <em>minimal</em> height of line boxes within the element. The minimum height consists of a minimum height above the baseline and a minimum depth below it, exactly as if each line box starts with a zero-width inline box with the element’s font and line height properties<a href="https://zhuanlan.zhihu.com/p/30624268/edit">.</a> We call that imaginary box a “strut.”</p>\n</blockquote>\n<p>局部容器的高度可以是上图 <code>S</code> 的高度（inline-flex 居中），也可以跟随图标的高度（图标绝对定位，保持与容器位置相同），也可以固定（图标绝对定位居中，但缺陷是不能太大超过行高）。</p>\n<p>精确对齐的两种实现方式（<a href="http://link.zhihu.com/?target=https%3A//codepen.io/ambarli/pen/NwNPpo%3Feditors%3D0010">CodePen demo：模拟浏览器对齐</a>）：</p>\n<p><strong>一、<code>inline-block</code></strong> <strong>hack</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">MyIcon</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>width<span class="token punctuation">,</span> height<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>span\n    style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n      position<span class="token punctuation">:</span> <span class="token string">\'relative\'</span><span class="token punctuation">,</span>\n      display<span class="token punctuation">:</span> <span class="token string">\'inline-block\'</span><span class="token punctuation">,</span>\n      lineHeight<span class="token punctuation">:</span> height<span class="token punctuation">,</span> <span class="token comment">// 使文本高度为图标高度</span>\n      width<span class="token punctuation">,</span> <span class="token comment">// 占住横向空间</span>\n    <span class="token punctuation">}</span><span class="token punctuation">}</span>\n  <span class="token operator">></span>\n    <span class="token punctuation">{</span><span class="token string">\'\\u200b\'</span> <span class="token comment">/* ZWSP(zero-width space) */</span><span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span>svg width<span class="token operator">=</span><span class="token punctuation">{</span>width<span class="token punctuation">}</span> style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>position<span class="token punctuation">:</span> <span class="token string">\'absolute\'</span><span class="token punctuation">,</span> left<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> top<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>对齐效果完美。</p>\n<p><strong>二、<code>inline-flex</code></strong> <strong>hack（推荐）</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">MyIcon</span> <span class="token operator">=</span> props <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>span\n    style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n      display<span class="token punctuation">:</span> <span class="token string">\'inline-flex\'</span><span class="token punctuation">,</span>\n      alignItems<span class="token punctuation">:</span> <span class="token string">\'center\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">}</span>\n  <span class="token operator">></span>\n    <span class="token punctuation">{</span><span class="token string">\'\\u200b\'</span> <span class="token comment">/* ZWSP(zero-width space) */</span><span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span>svg <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>对齐效果完美（不支持过时的浏览器 <a href="http://link.zhihu.com/?target=http%3A//caniuse.com/%23search%3Dflex">caniuse.com/flex</a>）。</p>\n<hr>\n<h2>为什么明明使用了 flex，图标还是看起来差了 1 像素没对齐？</h2>\n<p>图标与文本的对齐误差取决于 <code>iconSize</code>、<code>fontSize</code> 和 <code>lineHeight</code> 之间奇偶关系（不同浏览器表现可能不同，<a href="http://link.zhihu.com/?target=https%3A//codepen.io/ambarli/pen/ZaWJQg%3Feditors%3D0010">CodePen demo: 奇偶对齐</a>）：</p>\n<table>\n<thead>\n<tr>\n<th>iconSize</th>\n<th>fontSize</th>\n<th>lineHeight</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>奇数</td>\n<td>偶数</td>\n<td>奇偶改变不影响图标对齐</td>\n</tr>\n<tr>\n<td>偶数</td>\n<td>奇数</td>\n<td>奇偶改变不影响图标对齐</td>\n</tr>\n<tr>\n<td>偶数</td>\n<td>偶数</td>\n<td>偶数对齐，奇数偏上 1px</td>\n</tr>\n<tr>\n<td>奇数</td>\n<td>奇数</td>\n<td>奇数对齐，偶数偏上 1px</td>\n</tr>\n<tr>\n<td>小数（.2/.5/.8）</td>\n<td>奇数</td>\n<td>奇偶改变不影响图标对齐，都上偏 1px（偶数时图标纵向拉伸了 1px）</td>\n</tr>\n<tr>\n<td>小数（.2/.5/.8）</td>\n<td>偶数</td>\n<td>偶数对齐，奇数偏上 1px（偶数时图标纵向拉伸了 1px）</td>\n</tr>\n</tbody>\n</table>\n<p>👆 测试环境：字体 PingFang SC，浏览器 Chrome，对齐 Flex。</p>\n<h2>相关</h2>\n<ul>\n<li><a href="http://link.zhihu.com/?target=https%3A//codepen.io/collection/XjyabO/">How to Align - a Collection on CodePen</a> 所有示例列表</li>\n<li><a href="http://link.zhihu.com/?target=http%3A//ambar.li/reiconify/md.icons/">md.icons</a> 自动生成的全套 Material icons，添加了方便的对齐参数</li>\n<li><a href="http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS22/visuren.html%23inline-formatting">W3C: Visual Formatting Model</a> 了解规范如何定义内联行为和行高计算</li>\n<li><a href="http://link.zhihu.com/?target=http%3A//iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align">Deep dive CSS: font metrics, line-height and vertical-align</a> 感谢作者的精彩图解</li>\n<li><a href="http://link.zhihu.com/?target=https%3A//github.com/yahoo/blink-diff">blink-diff</a> 用工具需要对比生成的对齐效果，而不是用肉眼</li>\n<li><a href="http://link.zhihu.com/?target=http%3A//designwithfontforge.com/zh-CN/What_Is_a_Font.html">什么是字体?</a> 了解 unitsPerEm/ascender/descender 等概念</li>\n<li><a href="http://link.zhihu.com/?target=https%3A//opentype.js.org/font-inspector.html">opentype.js</a>、<a href="http://link.zhihu.com/?target=https%3A//fontforge.github.io/">FontForge</a> 查询 font metrics</li>\n</ul>\n<h2>附</h2>\n<p>图标转 React 组件工具，集成了本文提到的对齐属性（<code>center</code>）：<a href="http://link.zhihu.com/?target=https%3A//github.com/ambar/reiconify">reiconify​</a></p>',frontmatter:{title:"图标如何对齐文本",date:"2017-11-04 09:57"}}},pathContext:{slug:"/2017-11-04---align-svg-icon-to-text/",previous:!1,next:{fields:{slug:"/2017-11-15---webkit-font-synthesis-bug/"},frontmatter:{title:"用 CSS 修复 WebKit 伪粗体问题"}}}}}});