(() => {
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
    ]

    const products ={
        'kintone':'KN',
        'Garoon':'GR',
        'サイボウズ Office':'OF',
        'Mailwise':'MW'
    }

    kintone.events.on(trigger, (event) => {
        event.record['重複禁止項目_文字列']['disabled'] = true;
        const day = event.record['日付'].value
        const Editedday = dateFns.format(day, 'YYYYMMDD')


        const product = event.record['サイボウズ製品'].value
        const EditedProductName = products[product]

        const manageNum = event.record['管理番号'].value

        const inputData = Editedday+'-'+EditedProductName+'-'+manageNum

        event.record['重複禁止項目_文字列'].value = inputData
        return event
    });


})(); 
