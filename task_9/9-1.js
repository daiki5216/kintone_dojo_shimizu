(() => {
  'use strict';
      
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], (event) => {
    const appId = kintone.app.getId();
    const params = {
        "app":appId,
    };
    return kintone.api(kintone.api.url('/k/v1/records.json',true),'GET',params).then((res)=>{
      const allRecords = res.records;
      const recordContentsList =[];
      allRecords.forEach((record) => {
          recordContentsList.push(record.重複禁止項目.value);
      });
      const inputData = event.record.重複禁止項目.value;
      
      if (recordContentsList.includes(inputData)){
        const checkOverlap = confirm('レコードが重複しています。このまま保存しますか？');
        if(!checkOverlap){
            return false;
        };  
      };
      return event;
    });
    
  });

})();