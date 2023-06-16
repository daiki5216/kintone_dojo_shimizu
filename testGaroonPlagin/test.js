
/**
 * Garoon meeting efficiency customize(portlet)
 * Copyright (c) 2020 Cybozu
 *
 * Licensed under the MIT License
 * https://opensource.org/licenses/mit-license.php
 */

 (function($) {
    'use strict';
  
    // 「時間単価」が登録されている、ユーザー情報のカスタマイズ項目名
    var userCustom = 'UnitPrice';
    // プロキシコード
    var proxyCode = 'CalculatingCosts';
    // コスト算出対象の予定メニュー
    var MEETING = '打合';
  
    /**
       * 全参加者の「時間単価」(カスタマイズ項目)に数値が入っているかを確認する関数
        * @param {array} users 打合参加者
        * @returns {boolean} true:全て数値 false:1つでも数値以外の値が入っている
      */
    var isCheckedUnitPrice = function(users) {
      return users.every(function(user) {
        var customItems = user.customItemValues;
        var unitPrice;
        if (!customItems.length) {
          return true;
        }
        unitPrice = customItems.filter(function(item) {
          return item.code === userCustom;
        })[0];
        if (!unitPrice.value || unitPrice.value === '0') {
          return true;
        }
        return Number(parseInt(unitPrice.value, 10));
      });
    };
  
    /**
       * 打合コストを求める関数
       * @param {array} users 打合参加者
       * @param {number} meetingTime 打合所要時間
       * @returns {number} 打合コスト(人件費)
      */
    var calculateLaborCost = function(users, meetingTime) {
      var cost = users.reduce(function(price, user) {
        var customItems = user.customItemValues;
        var unitPrice = customItems.filter(function(item) {
          return item.code === userCustom;
        })[0];
        if (!unitPrice) {
          return price;
        }
        return price + Number(unitPrice.value);
      }, 0);
  
      var total = Math.round(cost * parseFloat(meetingTime));
      // 会議のコストを表示
      console.log('打合コストの内訳: ' + cost.toLocaleString() + ' 円 * ' + meetingTime.toLocaleString() + '時間 = ' + total.toLocaleString() + ' 円');
      return total;
    };
  
    garoon.events.on('schedule.event.detail.show', function(event) {
      var scheduleEvent = event.event;
      var query = '';
      var start = scheduleEvent.start.dateTime;
      var end = scheduleEvent.end.dateTime;
      var attendees = scheduleEvent.attendees;
      var startTime = new Date(start);
      var endTime = new Date(end);
      var meetingTime = (endTime - startTime) / (1000 * 60 * 60);
      var path = 'https://' + location.hostname + '/v1/users.json?';
  
      // 予定メニューが「打合」以外、もしくは参加者が0名の場合、処理を終了する
      if (scheduleEvent.eventMenu !== MEETING || attendees < 1) {
        return;
      }
  
      // code(ログイン名)を利用したクエリ生成
      query = attendees.map(function(attendee, index) {
        return 'codes[' + index + ']=' + attendee.code;
      }).join('&');
  
      garoon.base.proxy.send(proxyCode, path + query, 'GET', {}, {}).then(function(resp) {
        var users = JSON.parse(resp[0]).users;
        var total;
        var headerSpace;
        var $span;
  
        if (!isCheckedUnitPrice(users)) {
          window.alert('数値ではない値が時間単価に設定されている可能性があります');
          return;
        }
  
        total = calculateLaborCost(users, meetingTime);
        headerSpace = garoon.schedule.event.getHeaderSpaceElement();
        $span = $('<STRONG>', {
          id: 'items',
          class: 'sat_color1_grn_kit',
          text: '※本打合コスト: ' + total.toLocaleString() + ' 円'
        });
        $span.prependTo(headerSpace);
      }).catch(function(e) {
        window.alert('コスト表示に失敗しました。原因については、システム管理者にご相談ください。');
        console.log('※エラー詳細 \n ', e);
      });
    });
  })(jQuery.noConflict(true));
  