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
            //query:'day'
        }
        })
        .then((res)=>{
            const newsDatas=res.data
            const nums =newsDatas.length

            for (let i =1; i<nums+1;i++){
                const i_datas = res.data[i-1]

                document.getElementById(i+'-day').textContent= i_datas.day.value

                const i_category = document.getElementById(i+'-category')
                i_category.textContent= i_datas.category.value
                chageBackgroundColor(i,i_category.textContent)
                
                const i_content = document.getElementById(i+'-content')
                i_content.textContent= i_datas.content.value
                i_content.href = i_datas.url.value
                if (i_datas.target.value ==='_blank'){
                    i_content.setAttribute('target', '_blank');
                } 
                

            }

       


        })

};

getNews();