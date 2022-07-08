(() => {
<<<<<<< HEAD
  'use strict';
  kintone.events.on(['app.record.create.show','app.record.edit.show'], (event) => {
		event.record.重複禁止項目_文字列.disabled = true;
		return event;
	});
  const trigger = [
    'app.record.create.change.日付', 
    'app.record.edit.change.日付',
    'app.record.create.change.サイボウズ製品',
    'app.record.edit.change.サイボウズ製品',
    'app.record.create.change.管理番号',
    'app.record.edit.change.管理番号'
  ];
=======
    'use strict';
    kintone.events.on(['app.record.create.show','app.record.edit.show'], (event) => {
		  event.record.重複禁止項目_文字列.disabled = true;
		  return event;
	  });
    const trigger = [
        'app.record.create.change.日付', 
        'app.record.edit.change.日付',
        'app.record.create.change.サイボウズ製品',
        'app.record.edit.change.サイボウズ製品',
        'app.record.create.change.管理番号',
        'app.record.edit.change.管理番号'
    ];
>>>>>>> 39438e1f4ed52edfb20e411fb8440b8a11c1a90f

  const products ={
    'kintone':'KN',
    'Garoon':'GR',
    'サイボウズ Office':'OF',
    'Mailwise':'MW'
  };

<<<<<<< HEAD
  kintone.events.on(trigger, (event) => {
    event.record['重複禁止項目_文字列']['disabled'] = true;
    const day = event.record['日付'].value;
    const editedday = dateFns.format(day, 'YYYYMMDD');
=======
    kintone.events.on(trigger, (event) => {
        event.record['重複禁止項目_文字列']['disabled'] = true;
        const day = event.record['日付'].value;
        const editedDay = dateFns.format(day, 'YYYYMMDD');
>>>>>>> 39438e1f4ed52edfb20e411fb8440b8a11c1a90f

    const product = event.record['サイボウズ製品'].value;
    const editedProductName = products[product];

<<<<<<< HEAD
    const manageNum = event.record['管理番号'].value;
=======
        const product = event.record['サイボウズ製品'].value;
        const editedProductName = products[product];
>>>>>>> 39438e1f4ed52edfb20e411fb8440b8a11c1a90f

    const inputData = editedday+'-'+editedProductName+'-'+manageNum;

<<<<<<< HEAD
    event.record['重複禁止項目_文字列'].value = inputData;
    return event;
  });
=======
        const inputData = editedDay+'-'+editedProductName+'-'+manageNum;

        event.record['重複禁止項目_文字列'].value = inputData;
        return event;
    });
>>>>>>> 39438e1f4ed52edfb20e411fb8440b8a11c1a90f


})(); 
