async function postData(obj,endpoint) {
   try {
     const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`,{
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(obj)
     })
     const data = await peticion.json()
     console.log(data);
     return data
   } catch (error) {
        console.error(error);
   }
}
async function getData(endpoint) {
    try {
        const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`)
        const data = await peticion.json()
        console.log(data);
        return data
    } catch (error) {
        console.error(error)
    }
}
export {postData,getData}
