---
title: PostgreSQLへCSV入稿したあと単品でレコード登録するときに『duplicate key value violates unique constraint “hoge_pkey”』って怒られたときの備忘録
date: "2022-05-27T22:40:32.169Z"
description: PostgreSQLへCSV入稿したあと単品でレコード登録するときに『duplicate key value violates unique constraint “hoge_pkey”』って怒られたときの備忘録
hero: ./thumbnail.png
tags: ['Tech', '備忘録', 'PostgreSQL', 'Laravel', 'Heroku']
---

## これなに

HerokuにLaravelを動作させるとCSVインポート機能で複数レコードを一気に登録後、個別でレコードを登録するタイミングでエラーになったので備忘録。

（ローカルの開発環境ではMySQLで動かしてたけど、公開する際は無料枠のあるHerokuを利用してたとき、HerokuはデフォルトでPostgreSQLなので、そのタイミングでローカル（MySQL）では出ないエラーを吐いてた）

## エラー内容

```
SQLSTATE[23505]: Unique violation: 7 ERROR: duplicate key value violates unique constraint "hoge_pkey"
```

　

### 関連記事

- [PostgreSQLに新規登録しようとしたら、「duplicate key value violates unique constraint」と怒られた。](https://qiita.com/hanlio/items/abdd50808e77c3e697a0)
- [PostgreSQLでINSERT時に自動採番の主キーが重複してエラーが出る場合の対処法](https://www.xmisao.com/2014/06/07/duplicate-key-value-violates-unique-constant-primary-key-on-postgresql.html)

## 原因

⬆️のタイトル通りだけど、自動採番のキー番号と実際のidがズレてしまうので発生していた

## 解決方法


関連記事では

```
SELECT setval('hoge_id_seq', (SELECT MAX(id) FROM table));
```

で自動採番を動かしている、これでもいけるけど根本解決にはなっていなかったので、別の方法考えたい

　

### 結論

insert時にcsvで渡ってきたidを指定して登録しちゃってたため、PostgreSQL内部のオートインクリメント（自動採番）が動かずidと乖離が起きてしまいエラーが発生していたっぽい。

特に困らなかったのでid指定のinsertをやめて解決。
