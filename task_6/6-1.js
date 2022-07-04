(() => {
    'use strict';
    const action5 ={
        value:{
            0:"あくなき探求",
            1:"不屈の心体",
            2:"理想への共感",
            3:"心を動かす",
            4:"知識を増やす",
            5:"公明正大"
        }
    }

    kintone.events.on('app.record.create.show', (event) => {
        event.record.Table.value[0].value['Action5'].value=action5.value[0] 
        const tableData = event.record['Table'].value
        for(let i =1;i<=5;i++){
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
            event.record.Table.value[i].value['Action5'].value=action5.value[i]          
        }
        
        return event
    });
})();