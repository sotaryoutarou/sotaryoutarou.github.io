---
title: 【Gatsby】Prismで良さげなコードハイライトにして行番号表示もいい感じに調整するで
date: "2021-05-15T22:40:32.169Z"
description: デフォルトのコードブロックの視認性が悪いので調整するよ
hero: ./images/thumbnail.png
tags: ['gatsby', 'prism', 'Tech']

---

## これなに

[Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)のデフォルトで用意されているコードハイライトがちょいダサなので、いい感じにしたい。

![デフォルトのコードハイライト](./images/ASIS.png)

### 前提

Gatsbyのテーマは[Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)を利用しています。

## ちょい調べた結果

[Prism JS](https://prismjs.com/)というものを使っているらしいので、このパラメータをカスタマイズすれば良さそう。

## テーマ変更

デフォルトで設定されているテーマのimportは削除しておきます。

```js:title=gatsby-browser.js
import "prismjs/themes/prism.css"
```

[Prism JS](https://prismjs.com/)のページでお好きなテーマを探してください。

![prismjsのテーマ確認](./images/prismjs.gif)

今回はTOMORROW NIGHTを利用するので、以下のようにimportします。 `"prismjs/themes/prism-{テーマ名}.css"`

```js:title=gatsby-browser.js
import "prismjs/themes/prism-tomorrow.css"
```

ここまででテーマが変わります。


### [Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)を利用していない場合

パッケージ導入

```shell
$ npm install -S prismjs gatsby-remark-prismjs gatsby-remark-prismjs-title
```

`gatsby-config` の書き換え

```js:title=gatsby-config.js
resolve: `gatsby-transformer-remark`,
options: {
  plugins: [
    `gatsby-remark-prismjs-title`,
    `gatsby-remark-prismjs`,
  ]
},
```

## 行番号付与

ついでに行番号も付与します。 `gatsby-remark-prismjs` のオプションを設定していきます。

Before

```js:title=gatsby-config.js
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          /* ~略~ */
          `gatsby-remark-prismjs`,
```

After

```js:title=gatsby-config.js
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          /* ~略~ */
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
```

次にCSSを読み込みます。

```js:title=gatsby-browser.js
import "prismjs/plugins/line-numbers/prism-line-numbers.css" 
```

ここで問題なのが、行番号の表示がずれてしまっています。こりゃいかん。

![行番号CSS当てる前](./images/before-css.png)

CSSで調整します。今回はグローバルなCSSで当ててますがお好みでどうぞ。

```css:title=global.css
.line-numbers .line-numbers-rows {
    padding: 1rem 0 1rem 0.5rem;
}
```

グローバルCSSはこんな感じで読み込みました。

```js:title=gatsby-browser.js
import "./src/styles/global.css"
```

完成！なんとなくいい感じになった気がする

![行番号CSS当てた後](./images/after-css.png)

## 参考記事

- [Gatsby Material Starterで行番号を表示する](https://www.yo1000.com/gatsby-number-lines)
- [GatsbyJSで作っているブログでシンタックスハイライトが適用されるようにした](https://kikunantoka.com/2019/12/03--install-syntax-highlight/)

## PR

- [シンタックスハイライト導入](https://github.com/sotaryoutarou/sotaryoutarou.github.io/pull/44)