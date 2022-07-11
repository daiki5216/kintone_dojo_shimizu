(() => {
  'use strict';
      
  kintone.events.on(['app.record.create.submit'], (event) => {
    const appId = kintone.app.getId();
    const submitContent = event.record.重複禁止項目.value;
		const query = '重複禁止項目 = "' + submitContent + '"';

    const params = {
        "app":appId,
        "query":query
    };
    return kintone.api(kintone.api.url('/k/v1/records.json',true),'GET',params).then((res)=>{      
      const numberOfResult = res.records.length

      if(numberOfResult===0){
        return event
      }
      const result = confirm('レコードが重複しています。このまま保存しますか？')
      if (!result){
        return false;
      }
      return event;
    });
    
  });

})();