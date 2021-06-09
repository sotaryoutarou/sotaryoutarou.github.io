---
title: 【Gatsby】Prismで良さげなコードハイライトにして行番号表示もいい感じに調整するで
date: "2021-05-15T22:40:32.169Z"
description: デフォルトのコードブロックの視認性が悪いので調整するよ
hero: ./images/thumbnail.png
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

