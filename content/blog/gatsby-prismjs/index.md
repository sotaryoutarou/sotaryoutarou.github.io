---
title: 【Gatsby】Prismで良さげなコードハイライトにして行番号表示もいい感じに調整するで
date: "2021-05-15T22:40:32.169Z"
description: デフォルトのコードブロックの視認性が悪いので調整するよ
hero: ./images/thumbnail.png
---

## やること

[Starter Blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)のデフォルトで用意されているコードハイライトがちょいダサなので、いい感じにしたい。

![デフォルトのコードハイライト](./images/ASIS.png)

## ちょい調べた結果

[Prism JS](https://prismjs.com/)というものを使っているらしいので、このパラメータをカスタマイズすれば良さそう。

