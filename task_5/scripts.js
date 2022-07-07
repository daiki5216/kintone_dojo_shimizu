const getNews =()=>{
    axios.get("https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo",{
        params:{
            id:'dojo',
        }
        })
        .then((res)=>{
            const newsDatas=res.data
            console.log(newsDatas)
            const tbody = document.getElementById('tbody');

            newsDatas.forEach((row) => {
                const tr = document.createElement('tr');
                const tdDay = document.createElement('td');
                const tdCategory = document.createElement('td');
                const tdContent = document.createElement('td');

                tdDay.textContent = row.day.value

                tdCategory.textContent = row.category.value
                tdCategory.setAttribute('class',`${row.label.value}`)

                tdContent.innerHTML=`<a href=${row.url.value} target=${row.target.value}>${row.content.value}</a>`

                tr.appendChild(tdDay);
                tr.appendChild(tdCategory);
                tr.appendChild(tdContent);
                tbody.appendChild(tr);

            });
        });
};

getNews();