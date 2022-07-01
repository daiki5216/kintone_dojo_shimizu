axios.get('https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo',{
    params:{
        id:'dojo',
        //query:'day'
    }
  })
  .then(res => res.data)
  .then(console.log)