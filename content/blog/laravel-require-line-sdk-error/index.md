---
title: 【Laravel】composer require で laravel-line-sdkを導入すると失敗する
date: "2022-02-12T22:40:32.169Z"
description: 【Laravel】composer require で laravel-line-sdkを導入すると失敗する
hero: ./images/thumbnail.png
tags: ['Tech', 'PHP', 'Laravel', '備忘録']

---

## なにこれ

Laravelをline連携させようとした際に困ったことの備忘録です

## エラー内容

```bash
$ composer require revolution/laravel-line-sdk
Using version ^1.3 for revolution/laravel-line-sdk
./composer.json has been updated
Running composer update revolution/laravel-line-sdk
Loading composer repositories with package information
Updating dependencies
Your requirements could not be resolved to an installable set of packages.

  Problem 1
    - revolution/laravel-line-sdk 1.3.0 requires linecorp/line-bot-sdk ^6.0 -> satisfiable by linecorp/line-bot-sdk[6.0.0, 6.1.0, 6.2.0, 6.3.0].
    - revolution/laravel-line-sdk[1.3.1, ..., 1.3.2] require linecorp/line-bot-sdk ^6.0||^7.0 -> satisfiable by linecorp/line-bot-sdk[6.0.0, 6.1.0, 6.2.0, 6.3.0, 7.0.0, 7.1.0, 7.2.0].
    - linecorp/line-bot-sdk[6.0.0, ..., 6.3.0, 7.0.0, ..., 7.2.0] require ext-sockets * -> it is missing from your system. Install or enable PHP's sockets extension.
    - Root composer.json requires revolution/laravel-line-sdk ^1.3 -> satisfiable by revolution/laravel-line-sdk[1.3.0, 1.3.1, 1.3.2].

To enable extensions, verify that they are enabled in your .ini files:
    - /usr/local/etc/php/php.ini
    - /usr/local/etc/php/conf.d/docker-php-ext-bcmath.ini
    - /usr/local/etc/php/conf.d/docker-php-ext-intl.ini
    - /usr/local/etc/php/conf.d/docker-php-ext-pdo_mysql.ini
    - /usr/local/etc/php/conf.d/docker-php-ext-sodium.ini
    - /usr/local/etc/php/conf.d/docker-php-ext-zip.ini
You can also run `php --ini` inside terminal to see which files are used by PHP in CLI mode.

Installation failed, reverting ./composer.json and ./composer.lock to their original content.
```

## 原因

> `require ext-sockets * -> it is missing from your system.`

とあるので、socketsモジュールが使えるように整えれば良さそう。

## 対処法

環境起因なので状況に合わせた対応が必要

### ①既にモジュールは存在していている場合

このエラー[こちら](https://qiita.com/mktro/items/d164bd4a88fc51f2a99d)のQiita記事で紹介されている通り、モジュール導入済みの場合だと **php.ini** のsocketsを有効にしてあげるだけでok

```sh:title=php.ini
;extension=sockets
```

この箇所の `;` を外してあげる

ちなみにsocketsモジュールの有無は

`php -m` を実行してcurlを確認することで判断できる。

### ②  ①の手順で解決しない場合

モジュール追加をします。

doccker環境でphp公式のイメージを使っている場合、Dockerfileに

```Dockerfile:title=Dockerfile
docker-php-ext-install sockets
```

を追加でビルドしてあげると導入できました。

複数のモジュールを追加する場合はスペース区切りです。

Ubuntuなどで直接コマンドからモジュールを導入する場合は

```shell
$ sudo apt-get update -y
$ sudo apt-get install -y php-sockets
```

でいけるはず（動作未確認）