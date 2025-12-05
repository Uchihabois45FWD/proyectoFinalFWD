// fetch.js

async function postData(endpoint, obj) {
  try {
    const peticion = await fetch(`http://localhost:8000/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en postData:", error);
    throw error;
  }
}

async function getData(endpoint) {
  try {
    const peticion = await fetch(`http://localhost:8000/api/${endpoint}`);
    if (!peticion.ok) {
      const text = await peticion.text();
      throw new Error(`Error ${peticion.status}: ${text}`);
    }
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en getData:", error);
    return null;
  }
}

async function loginUser(usuario, password) {
  try {
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usuario,
        password: password
      })
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
    const response = await fetch("http://localhost:8000/api/noticias/destacadas/");
    if (!response.ok) {
      throw new Error("Error al cargar las noticias destacadas");
    }
    const data = await response.json();
    setNoticias(data);
  } catch (err) {
    setError(err.message);
    console.error("Error fetching noticias:", err);
  } finally {
    setLoading(false);
  }
};

async function patchData(obj, endpoint) {
  try {
    const peticion = await fetch(`http://localhost:8000/${endpoint}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    if (!peticion.ok) {
      const text = await peticion.text();
      throw new Error(`Error ${peticion.status}: ${text}`);
    }
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en patchData:", error);
    throw error;
  }
}

async function deleteData(endpoint) {
  try {
    const peticion = await fetch(`http://localhost:8000/${endpoint}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (peticion.status === 204) {
      // No hay contenido, pero la eliminación fue exitosa
      return { success: true };
    }

    const text = await peticion.text();
    try {
      const data = text ? JSON.parse(text) : { success: true };
      console.log(data);
      return data;
    } catch {
      // Si el body no es JSON válido, devolvemos éxito genérico
      return { success: true };
    }
  } catch (error) {
    console.error("Error en deleteData:", error);
    return { success: false, error: error.message };
  }
}

async function putData(obj, endpoint) {
  try {
    const peticion = await fetch(`http://localhost:8000/${endpoint}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    if (!peticion.ok) {
      const text = await peticion.text();
      throw new Error(`Error ${peticion.status}: ${text}`);
    }
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en putData:", error);
    throw error;
  }
}

export {
  postData,
  getData,
  loginUser,
  fetchNoticiasDestacadas,
  patchData,
  deleteData,
  putData
};
