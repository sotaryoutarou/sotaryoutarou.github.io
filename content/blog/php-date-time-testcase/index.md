---
title: 【PHP】直近の28/29/30/31まである月から1日ずつ取ってきた配列を作りたいんじゃ
date: "2021-03-18T22:40:32.169Z"
description: DateTimeクラスを扱うメソッドのテストケースを作りたいから、直近の28/29/30/31まである月から1日ずつ取ってきた配列を返却するメソッドを作ったよ。
hero: ./thumbnail.png
---


```php
<?php

function getTestMonths() {
    $date = new DateTime();
    $testDates = [
        28 => false,
        29 => false,
        30 => false,
        31 => false,
    ];

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

function addDays($date) {
    $now = new DateTime();
    $nextMonthDate = clone $date;
    $nextMonthDate->modify('+' . $date->format('t') . ' days');
    
    $addDay = $date->format('t');
    
    // ２ヶ月後にいってしまったら戻す
    if ($nextMonthDate->format('n') - $date->format('n') == 2) {
        $addDay = $date->format('t') - $date->format('j') + $nextMonthDate->modify('-3 days')->format('t');
    }
    
    $date->modify('+' . $addDay . ' days');
    
    // 調整で増えすぎるパターンがあるので少なくするケースに対応
    if ($now->format('j') < $date->format('j')) {
         $date->modify('-' . $date->format('j') - $now->format('j') . ' days');
    }
    
    // 今の日付より小さい かつ 対象月の最終日ではない時は最終日になるように調整
    if ($now->format('j') > $date->format('j') && $date->format('j') != $date->format('t')) {
        $date->modify('+' . $date->format('t') - $date->format('j') . ' days');
    }
}

getTestMonths();
```