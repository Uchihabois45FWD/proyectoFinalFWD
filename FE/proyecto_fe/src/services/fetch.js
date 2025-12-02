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

    const fetchNoticiasDestacadas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/noticias/destacadas/');
        
        if (!response.ok) {
          throw new Error('Error al cargar las noticias destacadas');
        }
        
        const data = await response.json();
        setNoticias(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching noticias:', err);
      } finally {
        setLoading(false);
      }
    };

async function patchData(obj,endpoint) {
  const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}/`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
  const data = await peticion.json()
  console.log(data);
  return data
}

async function deleteData(endpoint) {
  try {
    const ep = String(endpoint || "").trim().replace(/^\/+|\/+$/g, "");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`http://127.0.0.1:8000/${ep}/`, { method: "DELETE", headers });
    console.log("DELETE", `http://127.0.0.1:8000/${ep}/`, res.status);
    if (!res.ok) {
      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch { body = text; }
      const err = new Error(body?.detail || body || `HTTP ${res.status}`);
      err.status = res.status;
      err.body = body;
      throw err;
    }
    if (res.status === 204) return { success: true };
    const text = await res.text();
    try { return JSON.parse(text); } catch { return text; }
  } catch (err) {
    console.error("deleteData error:", err);
    throw err;
  }
}

export {postData,getData,loginUser,fetchNoticiasDestacadas,patchData,deleteData}