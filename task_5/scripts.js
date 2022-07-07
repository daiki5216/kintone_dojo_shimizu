function chageBackgroundColor(tdCategory,category){
    if (category === "製品"){
       tdCategory.classList.add("product");
    }if(category === "企業情報"){
        tdCategory.classList.add("company_info");
    }if(category === "IR 情報"){
        tdCategory.classList.add("ir_info");
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
            const tbody = document.getElementById('tbody');

            newsDatas.forEach((row) => {
                const tr = document.createElement('tr');
                const tdDay = document.createElement('td');
                const tdCategory = document.createElement('td');
                const tdContent = document.createElement('td');

                tdDay.textContent = row.day.value

                tdCategory.textContent = row.category.value
                chageBackgroundColor(tdCategory, row.category.value);

                tdContent.innerHTML=`<a href=${row.url.value} target=${row.target.value}>${row.content.value}</a>`

                tr.appendChild(tdDay);
                tr.appendChild(tdCategory);
                tr.appendChild(tdContent);
                tbody.appendChild(tr);

            });
        });
};

getNews();