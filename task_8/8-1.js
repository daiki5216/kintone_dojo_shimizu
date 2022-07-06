(() => {
    'use strict';
    const appId = kintone.app.getId();
    const params = {
        "app":appId
    }

    kintone.events.on('app.record.create.show', (event) => { 
        return   kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params).then((resp) => {
            const optionOfAction5 = resp.properties.Table.fields.Action5.options
            const sortedOptions = Object.keys(optionOfAction5).map(function(key) {
                return optionOfAction5[key];

            }).sort(function(a, b) {
                return (a.index < b.index) ? -1 : 1;  
            });
            
            //event.record.Table.value[0]は、既に用意されているサブテーブルの行
            event.record.Table.value[0].value['Action5'].value=sortedOptions[0].label
            const tableData = event.record['Table'].value
            for(let i =1;i<=5;i++){ //5は追加したい行の数
                let columnData={
                    value:{
                        "Action5":{
                            type:"DROP_DOWN",
                            value:""
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
                }
                tableData.push(columnData);
                event.record.Table.value[i].value['Action5'].value=sortedOptions[i].label          
            }
            return event
        });       
    })    
})();