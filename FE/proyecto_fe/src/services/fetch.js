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
export {postData}

async function loginUser(usuario, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: password,
      }),
    });

    const data = await response.json();
    console.log("Respuesta del backend (login):", data);

    if (!response.ok) {
      throw new Error(data.mensaje || "Credenciales inválidas");
    }

    
    return data;
  } catch (error) {
    console.error("Error en login:", error.message);
    throw error;
  }
}

export { loginUser };

