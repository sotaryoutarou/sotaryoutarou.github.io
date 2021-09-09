---
title: 【Laravel】tinker上でログイン状態にしてAuthファサードからUserモデルを取得したい
date: "2021-09-10T22:40:32.169Z"
description: tinker上でログイン状態にしてAuthファサードからUserモデルを取得したい
hero: ./thumbnail.png
tags: ['Tech', '備忘録', 'PHP', 'Laravel']
---

## これなに

Laravel開発していると、たまーにtinkerで動作確認した方が早い時があるのですが、AuthファサードからUserモデルを呼びたくなった時にちょっと困ったので備忘録です。

## 結論


```php
Auth::loginUsingId(N);
```

上記のメソッドで、tinker上のプロセスをログイン状態にできます。Nはログインしたいユーザのidを入れます。

## 本当にログインできているか色々確認

### 前提

```shell:title=Usersテーブル
mysql> select id,name,email from users;
+----+------+-----------------+
| id | name | email           |
+----+------+-----------------+
|  1 | 鰻   | unagit@fish.com |
+----+------+-----------------+
1 row in set (0.00 sec)

```

```shell:title=Postsテーブル
mysql> select id,user_id,content from posts;
+----+---------+-----------------+
| id | user_id | content         |
+----+---------+-----------------+
|  1 |       1 | ひつまぶし      |
|  2 |       1 | 鰻重            |
+----+---------+-----------------+
2 rows in set (0.00 sec)
```

テキトーに作ったテーブル達です。Authファサードの動作確認がてらtinker上で遊んでみる

```php
>>> Auth::loginUsingId(1);
<warning>PHP Warning:  unlink(/work/backend/storage/framework/sessions/TyjRN0eOxABzlgCLj6ySoiYmzTEwxIZ3WuzTdMLd): No such file or directory in /work/backend/vendor/laravel/framework/src/Illuminate/Filesystem/Filesystem.php on line 285</warning>
=> App\Models\User {#4287
     id: 1,
     name: "鰻",
     email: "unagit@fish.com",
     email_verified_at: null,
     #password: "$2y$10$JQAjsapiPwD5WiHfVdjhp.ns/5cAA7it5idcyMO8eMQDbEhB0kREm",
     #remember_token: null,
     created_at: "2021-09-09 12:30:06",
     updated_at: "2021-09-09 12:30:06",
   }
>>> Auth::user()->id;
=> 1
>>> Auth::user()->name;
=> "鰻"
>>> Auth::user()->email;
=> "unagit@fish.com"
```

warning出ていますが、問題なく鰻の情報が取れていますね！

```php
>>> Auth::user()->posts()->get();
=> Illuminate\Database\Eloquent\Collection {#4500
     all: [
       App\Models\Post {#4497
         id: 1,
         user_id: 1,
         content: "ひつまぶし",
         created_at: "2021-09-09 12:38:58",
         updated_at: "2021-09-09 12:38:58",
       },
       App\Models\Post {#4288
         id: 2,
         user_id: 1,
         content: "鰻重",
         created_at: "2021-09-09 12:39:09",
         updated_at: "2021-09-09 12:39:09",
       },
     ],
   }
```

もちろんUserモデルに設定していた `hasMany` のようなリレーションも利用できます。

## おしまい

ちゃんちゃん
