function chageBackgroundColor(category_num,category){
    if (category === "製品"){
        document.getElementById(category_num+'-category').classList.add("product");
    }
  
    else if(category === "企業情報"){
        document.getElementById(category_num+'-category').classList.add("company_info");
    } 
    else if(category === "IR 情報"){
        document.getElementById(category_num+'-category').classList.add("ir_info");
    } 
};

function getNews(){
    axios.get("https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo",{
        params:{
            id:'dojo',
        }
        })
        .then((res)=>{
            const newsDatas=res.data
            console.log(res.data)
            const nums =newsDatas.length
            const tbody = document.getElementById('tbody')

            for (let i =0; i<nums;i++){                
                const tr = document.createElement('tr')
                const tdDay = document.createElement('td')
                const tdCategory = document.createElement('td')
                const tdContent = document.createElement('td')

                const tdDayIdName = i+'-day'
                const tdCategoryIdName = i+'-category'
                const tdContentIdName = i+'-content'
            
                tr.appendChild(tdDay)
                tr.appendChild(tdCategory)
                tr.appendChild(tdContent)
                tbody.appendChild(tr)

                tdDay.setAttribute("id", tdDayIdName);
                tdCategory.setAttribute("id", tdCategoryIdName);
                tdContent.setAttribute("id", tdContentIdName);

            }

            for (let i =0;i<nums;i++){
               //res.dataの値を入れていく処理↓↓
                const i_datas = res.data[i]
                document.getElementById(i+'-day').textContent= i_datas.day.value

                const i_category = document.getElementById(i+'-category')
                i_category.textContent= i_datas.category.value
                chageBackgroundColor(i,i_category.textContent)
                
                const i_content = document.getElementById(i+'-content')
                i_content.innerHTML=`<a href=${i_datas.url.value} target=${i_datas.target.value}>${i_datas.content.value}</a>`

            }
        })
};

getNews();