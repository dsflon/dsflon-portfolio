const Fetch = (url,body,sucess,error) => {

    let method = body ? 'POST' : 'GET';
        method = url.indexOf("api_test") !== 1 ? 'POST' : 'GET'; // ローカルのjsonのときはGETに

    let data = body && (method === 'POST') ? {
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json'
          'Accept': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        method: method,
        // body: JSON.stringify(body),
        body: Object.keys(body).reduce( (o,key)=>(o.set(key, body[key]), o), new FormData() ),
        // body: Object.keys(body).map((key)=>key+"="+encodeURIComponent(body[key])).join("&"),
        cache: 'no-cache',
        mode: 'cors'
    } : null;

    // console.log("postData: ",data);

    fetch(url, data)
    .then( (response) => {
        return response.json();
    })
    .then( (json) => {
        if(sucess) sucess(json)
    }).catch( (e) => {
        console.error(e);
        if(error) error(e)
    } );

}

export default Fetch;
