(() => {
  'use strict';

  kintone.events.on('app.record.create.show', (event) => {
    const appId = kintone.app.getId();
    const params = {
        "app":appId
    };
    return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params).then((resp) => {
      const optionOfAction5 = resp.properties.Table.fields.Action5.options;
      const sortedOptions = [];
      Object.keys(optionOfAction5).forEach((option)=>{
        sortedOptions[optionOfAction5[option].index] = option
      });

      const tableData = event.record['Table'].value;
      sortedOptions.forEach((row) => {
        const columnData={
          value:{
            "Action5":{
              type:"DROP_DOWN",
              value:row
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
      });

      event.record.Table.value.shift();
      return event;
    });       
  });    
})();