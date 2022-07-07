(() => {
    'use strict';

    kintone.events.on('app.record.create.show', (event) => {
        const action5 ={
            0:"あくなき探求",
            1:"不屈の心体",
            2:"理想への共感",
            3:"心を動かす",
            4:"知識を増やす",
            5:"公明正大"
        }

        const tableData = event.record['Table'].value
        for(let i =0;i<Object.keys(action5).length;i++){
            const columnData={
                value:{
                    "Action5":{
                        type:"DROP_DOWN",
                        value:action5[i]
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
        }
        event.record.Table.value.shift()
        return event
    });
})();