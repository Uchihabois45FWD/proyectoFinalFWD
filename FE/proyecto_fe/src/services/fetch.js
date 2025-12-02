const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

async function parseResponse(res) {
  if (res.status === 204) return null;
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

function saveAuthFromResponse(data) {
  // Normaliza y guarda token y tipo para distintos backends (DRF Token, JWT, custom)
  if (!data) return;
  // DRF TokenAuth returns { "key": "..." }
  if (data.key) {
    localStorage.setItem("token", data.key);
    localStorage.setItem("token_type", "Token");
  }
  // Simple token name
  else if (data.token) {
    localStorage.setItem("token", data.token);
    // asumir Bearer por defecto
    localStorage.setItem("token_type", data.token_type || "Bearer");
  }
  // JWT (djoser / simplejwt) returns access/refresh
  else if (data.access) {
    localStorage.setItem("token", data.access);
    localStorage.setItem("token_type", "Bearer");
    if (data.user_id) localStorage.setItem("user_id", String(data.user_id));
  }
  // guardar user id si viene en la respuesta
  if (data.user_id) localStorage.setItem("user_id", String(data.user_id));
  if (data.id) localStorage.setItem("user_id", String(data.id));
}

function getAuthHeader() {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type") || "Bearer";
  if (!token) return {};
  if (tokenType === "Token") return { Authorization: `Token ${token}` };
  return { Authorization: `${tokenType} ${token}` }; // e.g. Bearer <token>
}

function buildUrl(endpoint) {
  if (!endpoint) return API_BASE;
  return endpoint.startsWith("http") ? endpoint : `${API_BASE.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
}

export async function getData(endpoint) {
  const url = buildUrl(endpoint);
  const headers = { ...getAuthHeader() };
  try {
    const res = await fetch(url, { headers });
    const data = await parseResponse(res);
    console.log("GET", url, res.status, data);
    if (!res.ok) {
      const err = new Error(`GET ${endpoint} failed ${res.status}`);
      err.response = data;
      throw err;
    }
    return data;
  } catch (err) {
    console.error("getData error:", err);
    throw err;
  }
}

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_usuario");
    console.log(token);
    const peticion = await fetch(`http://127.0.0.1:8000/api/usuario-id/${id}/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    // si el token es inválido, Django devuelve 401
    if (peticion.status === 401) {
      console.error("Token inválido o expirado");
      return null;
    }

    const data = await peticion.json();
    return data;

  } catch (error) {
    console.error(error);
  }
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
  }
}
export async function postData(endpoint, payload = {}) {
  const url = buildUrl(endpoint);
  const headers = { "Content-Type": "application/json", ...getAuthHeader() };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await parseResponse(res);
    console.log("POST", url, payload, res.status, data);
    if (!res.ok) {
      const err = new Error(`POST ${endpoint} failed ${res.status}`);
      err.response = data;
      throw err;
    }
    return data;
  } catch (err) {
    console.error("postData error:", err);
    throw err;
  }
}

export {postData,getData,loginUser,fetchNoticiasDestacadas,patchData,deleteData}
export async function patchData(endpoint, payload = {}) {
  const url = buildUrl(endpoint);
  const headers = { "Content-Type": "application/json", ...getAuthHeader() };
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });  
    const data = await parseResponse(res);
    console.log("PATCH", url, payload, res.status, data);
    if (!res.ok) {
      const err = new Error(`PATCH ${endpoint} failed ${res.status}`);
      err.response = data;
      throw err;
    }
    return data;
  } catch (err) {
    console.error("patchData error:", err);
    throw err;
  }
}

export async function loginUser(username, password) {
  const url = buildUrl("login/");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await parseResponse(res);
    console.log("loginUser", res.status, data);
    if (!res.ok) {
      const err = new Error(data?.detail || data?.mensaje || "Login failed");
      err.response = data;
      throw err;
    }
    // guarda credenciales normalizadas
    saveAuthFromResponse(data);
    return data;
  } catch (err) {
    console.error("loginUser error:", err);
    throw err;
  }
}

export async function fetchNoticiasDestacadas() {
  return getData("noticias/destacadas/");
}


