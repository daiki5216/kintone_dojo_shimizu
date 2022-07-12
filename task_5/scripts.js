const getNews =()=>{
  axios.get("https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo",{
    params:{
        id:'dojo',
      }
    })
    .then((res)=>{
      const newsDatas=res.data;
      const tbody = document.getElementById('tbody');

      newsDatas.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML=`
          <td>${row.day.value}</td>
          <td class=${row.label.value}>${row.category.value}</td>
          <td><a href=${row.url.value} target=${row.target.value}>${row.content.value}</a></td>`;
        tbody.appendChild(tr);
      });
    });
};
getNews(); 