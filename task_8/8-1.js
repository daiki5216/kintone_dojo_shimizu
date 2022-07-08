(() => {
  'use strict';

  kintone.events.on('app.record.create.show', (event) => {
    const appId = kintone.app.getId();
    const params = {
        "app":appId
    };
    return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params).then((resp) => {
      const optionOfAction5 = resp.properties.Table.fields.Action5.options;
      const sortedOptions = Object.keys(optionOfAction5).map(function(key) {
          return optionOfAction5[key];

      }).sort(function(a, b) {
          return (a.index < b.index) ? -1 : 1;  
      });

      const tableData = event.record['Table'].value;
      for(let i =0; i<Object.keys(sortedOptions).length; i++){
        const columnData={
          value:{
            "Action5":{
              type:"DROP_DOWN",
              value:sortedOptions[i].label
            },
            "状況":{
              type:"CHECK_BOX",
              value:['未振り返り']
            },
            "課題":{
              type:"MULTI_LINE_TEXT",
              value:"" 
            }
              
          }
        };
        tableData.push(columnData);       
      };
      event.record.Table.value.shift();
      return event;
    });       
  });    
})();