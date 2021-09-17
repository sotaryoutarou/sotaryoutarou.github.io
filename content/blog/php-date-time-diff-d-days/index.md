---
title: 【PHP】DateTime::diff()で日数差を取得するには絶対にdaysプロパティを使って欲しい（dはダメ）
date: "2021-09-17T22:40:32.169Z"
description: コードブロックに行番号を表示したら表示崩れを起こしたため、CSSで力ずくで調整する
hero: ./images/thumbnail.png
tags: ['Tech', 'PHP', 'Date']

---

## これなに

日数差を取得する際に `DateTime::diff()` が返却する [DateInterval](https://www.php.net/manual/ja/class.dateinterval.php)の `d` プロパティと `days` プロパティを利用する方法があります。

結論、daysを利用するのが良いので、dがまずい理由を書いていきたいと思います。

「DateTime 差分 php」でググると上位でヒットする[こちら](https://www.sejuku.net/blog/21508)の記事では `d` を用いる方法が紹介されているので注意が必要です。


### dで問題ないパターン

現在時刻1月15日で30日後との差分を計算

```php
<?php
    $currentDate = new DateTime('2021-01-15');
    $compareDate = new DateTime('2021-02-14'); // 1月15日の30日後
    
    echo $currentDate->diff($compareDate)->d;
```

*出力結果*

30

30となるので正常動作


### dで問題あるパターン

現在時刻2月15日で30日後との差分を計算

```php
<?php
    $currentDate = new DateTime('2021-02-15');
    $compareDate = new DateTime('2021-03-17'); // 2月15日の30日後
    
    echo $currentDate->diff($compareDate)->d;
```

*出力結果*

2

30となってほしいところ、2となるので異常動作


## なぜ

dプロパティを使うと比較月の1日からカウントを始めるため、2月1日から30日をカウントすると月が繰り上がってしまう

```php
<?php
    $currentDate = new DateTime('2021-02-15');
    $compareDate = new DateTime('2021-03-17'); // 2月15日の30日後
    
    echo $currentDate->diff($compareDate)->m . 'ヶ月と' . $currentDate->diff($compareDate)->d . '日';
```

*出力結果*

1ヶ月と2日

#### ちなみに

27日前からは桁上がりが起こらない

```php
<?php
    $currentDate = new DateTime('2021-02-15');
    $compareDate = new DateTime('2021-03-14'); // 2月15日の27日後
    
    echo $currentDate->diff($compareDate)->m . 'ヶ月と' . $currentDate->diff($compareDate)->d . '日';
```

*出力結果*

0ヶ月と27日

## 対処法

基本 d ではなく days を利用する

```php
<?php
    $currentDate = new DateTime('2021-02-15');
    $compareDate = new DateTime('2021-03-17'); // 2月15日の30日後
    echo $currentDate->diff($compareDate)->days;
```

*出力結果*

30

## あとがき

daysの方が比較もとの月の影響を受けず、dの上位互換と言えると思います。
