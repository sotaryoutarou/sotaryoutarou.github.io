---
title: 【PHP】直近の28/29/30/31まである月から1日ずつ取ってきた配列を作りたいんじゃ
date: "2021-03-18T22:40:32.169Z"
description: DateTimeクラスを扱うメソッドのテストケースを作りたいので、直近の28/29/30/31まである月から1日ずつ取ってきた配列を返却するメソッドを作ってみました。
hero: ./thumbnail.png
tags: ['Tech', 'PHP', 'Date']
---

## これなに

DateTimeを扱うメソッドのユニットテストではテストケースとして、月またぎ、年またぎのテストを押さえておきたいところだと思います。

CIを回しているのであれば日付のテストケースは動的に変えていった方がテストの恩恵を受けられると思い、直近の28/29/30/31まである月からテストケースを1日ずつ取得するメソッドを作ってみました。


## 目指すもの

言葉では説明難しいので、出したいアウトプットをみてもらった方が早いと思います。

2021年3月18日に実行した場合、こんな感じの配列を返す関数作りたい。

```php
[
  28 => new DateTime('2022-02-18'),
  29 => new DateTime('2024-02-18'),
  30 => new DateTime('2021-04-18'),
  31 => new DateTime('2021-05-18'),
]
```

## 仕様

- 第1引数は大晦日（当年最終日）を含めるか
- 第2引数は当月を含めたテストケースを作るか

を指定します。

また、30日に実行した場合、２月のように30日が存在しないパターンが出てきます。

その場合、テストケースにはその月の最終日が入るようにします。

例）2021年3月30日に実行した場合

```php
[
  28 => new DateTime('2022-02-28'),
  29 => new DateTime('2024-02-29'),
  30 => new DateTime('2021-04-30'),
  31 => new DateTime('2021-05-30'),
]
```

## コード

以下のようなコードを定義すると利用できるようになります。

```php
getTestMonths();
```

で呼び出してください！

力ずくな箇所も多々ありますが、私のスキルではこれが限界でした。。。



```php
<?php
    /**
     * 月またぎ、年またぎのテストケースを返却する関数
     *
     * @param  boolean $hasAddLastDayOfTheYear 当年の大晦日を含めるか
     * @param  boolean $inclueCurrentMonth     当月をテストケースに含めるか
     *
     * @return array   テストケース
     */
    function getTestMonths($hasAddLastDayOfTheYear = true, $inclueCurrentMonth = false): array
    {
        $date = new DateTime();
        $testDates = [
            28 => false,
            29 => false,
            30 => false,
            31 => false,
        ];
        
        if ($inclueCurrentMonth) {
            $testDates[$date->format('t')] = clone $date;
        }

        if ($hasAddLastDayOfTheYear) {
            $testDates[1231] = new DateTime($date->format('Y') . '-12-31T' . $date->format('H:i:s.u'));
        }
    
        while(1) {
            addDays($date);
            
            if (!$testDates[$date->format('t')]) {
                $testDates[$date->format('t')] = clone $date;
            }
            
            if (!in_array(false, $testDates, true)) {
                break;
            }
        }
        
        return $testDates;
    }
    
    /**
     * 引数で渡ってくるDateTimeインスタンスを翌月まで加算する
     *
     * @param DateTime $date
     *
     * @return void
     */
    function addDays($date)
    {
        $now = new DateTime();
        $nextMonthDate = clone $date;

        $nextMonthDate->modify('+' . $date->format('t') . ' days');
        $addDay = $date->format('t');
        
        // ２ヶ月後にいってしまったら戻す
        if ($nextMonthDate->format('n') - $date->format('n') == 2) {
            $addDay = $date->format('t') - $date->format('j') + $nextMonthDate->modify('-3 days')->format('t');
        }

        // 27日以前はこれだけで大丈夫
        $date->modify('+' . $addDay . ' days');
        
        // 最終日調整の影響で増えすぎるパターンがあるので少なくするケースに対応
        if ($now->format('j') < $date->format('j')) {
             $date->modify('-' . $date->format('j') - $now->format('j') . ' days');
        }
        
        // 今の日付より小さい かつ 対象月の最終日ではない時は最終日になるように調整
        if ($now->format('j') > $date->format('j') && $date->format('j') != $date->format('t')) {
            $date->modify('+' . $date->format('t') - $date->format('j') . ' days');
        }
    }
```

## 実行結果

`DateTime` のコンストラクタに渡す値を色々変えてみてアウトプットを見ていきましょう。

*2021-01-01*

```php
array(5) {
  [28]=>
  object(DateTime)#4 (3) {
    ["date"]=>
    string(26) "2021-02-01 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [29]=>
  object(DateTime)#3 (3) {
    ["date"]=>
    string(26) "2024-02-01 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [30]=>
  object(DateTime)#6 (3) {
    ["date"]=>
    string(26) "2021-04-01 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [31]=>
  object(DateTime)#5 (3) {
    ["date"]=>
    string(26) "2021-03-01 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [1231]=>
  object(DateTime)#2 (3) {
    ["date"]=>
    string(26) "2021-12-31 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
}
```

*2021-01-31*

```php
array(5) {
  [28]=>
  object(DateTime)#4 (3) {
    ["date"]=>
    string(26) "2021-02-28 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [29]=>
  object(DateTime)#3 (3) {
    ["date"]=>
    string(26) "2024-02-29 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [30]=>
  object(DateTime)#6 (3) {
    ["date"]=>
    string(26) "2021-04-30 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [31]=>
  object(DateTime)#5 (3) {
    ["date"]=>
    string(26) "2021-03-31 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [1231]=>
  object(DateTime)#2 (3) {
    ["date"]=>
    string(26) "2021-12-31 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
}
```

*2024-02-29*

```php
array(5) {
  [28]=>
  object(DateTime)#3 (3) {
    ["date"]=>
    string(26) "2025-02-28 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [29]=>
  object(DateTime)#6 (3) {
    ["date"]=>
    string(26) "2028-02-29 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [30]=>
  object(DateTime)#5 (3) {
    ["date"]=>
    string(26) "2024-04-29 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [31]=>
  object(DateTime)#4 (3) {
    ["date"]=>
    string(26) "2024-03-29 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
  [1231]=>
  object(DateTime)#2 (3) {
    ["date"]=>
    string(26) "2024-12-31 00:00:00.000000"
    ["timezone_type"]=>
    int(3)
    ["timezone"]=>
    string(3) "UTC"
  }
}
```

## ひとこと

PHPなので楽に処理できたのもありますが、それでも日付を扱うコードは難しい。。。

太陽暦の仕様をもうちょい楽にしてほしいなと思ったり思わなかったり

## おまけ

使いやすいようにTrait化したコードも置いておきます。

クラスにuseして使ってね。

```php
<?php
/**
 * PHPUnitでテストケースの日付を取得するtrait
 *
 * $this->getTestMonths() で直近の28~31まである月からテストケースを作成する
 *
 * @author ソタ <sotaryoutarou@gmail.com>
 * @category Test
 */
trait DateTimeTestCase {

    /**
     * 月またぎ、年またぎのテストケースを返却する関数
     *
     * @access public
     * @param  boolean $hasAddLastDayOfTheYear 当年の大晦日を含めるか
     * @param  boolean $inclueCurrentMonth     当月をテストケースに含めるか
     *
     * @return array   テストケース
     */
    public function getTestMonths($hasAddLastDayOfTheYear = true, $inclueCurrentMonth = false): array
    {
        $date = new DateTime();
        $testDates = [
            28 => false,
            29 => false,
            30 => false,
            31 => false,
        ];
        
        if ($inclueCurrentMonth) {
            $testDates[$date->format('t')] = clone $date;
        }

        if ($hasAddLastDayOfTheYear) {
            $testDates[1231] = new DateTime($date->format('Y') . '-12-31T' . $date->format('H:i:s.u'));
        }
    
        while(1) {
            $this->addDays($date);
            
            if (!$testDates[$date->format('t')]) {
                $testDates[$date->format('t')] = clone $date;
            }
            
            if (!in_array(false, $testDates, true)) {
                break;
            }
        }
        
        return $testDates;
    }
    
    /**
     * 引数で渡ってくるDateTimeインスタンスを翌月まで加算する
     *
     * @access private
     * @param  DateTime $date
     *
     * @return void
     */
    private function addDays($date)
    {
        $now = new DateTime();
        $nextMonthDate = clone $date;

        $nextMonthDate->modify('+' . $date->format('t') . ' days');
        $addDay = $date->format('t');
        
        // ２ヶ月後にいってしまったら戻す
        if ($nextMonthDate->format('n') - $date->format('n') == 2) {
            $addDay = $date->format('t') - $date->format('j') + $nextMonthDate->modify('-3 days')->format('t');
        }

        // 27日以前はこれだけで大丈夫
        $date->modify('+' . $addDay . ' days');
        
        // 最終日調整の影響で増えすぎるパターンがあるので少なくするケースに対応
        if ($now->format('j') < $date->format('j')) {
             $date->modify('-' . $date->format('j') - $now->format('j') . ' days');
        }
        
        // 今の日付より小さい かつ 対象月の最終日ではない時は最終日になるように調整
        if ($now->format('j') > $date->format('j') && $date->format('j') != $date->format('t')) {
            $date->modify('+' . $date->format('t') - $date->format('j') . ' days');
        }
    }
}
```