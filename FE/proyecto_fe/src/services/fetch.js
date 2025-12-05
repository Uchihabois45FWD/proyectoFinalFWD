const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

/* ================================
   Helpers
   ================================ */
async function parseResponse(res) {
  if (res.status === 204) return null;
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function saveAuthFromResponse(data) {
  if (!data) return;

  if (data.key) {
    // DRF TokenAuth
    localStorage.setItem("token", data.key);
    localStorage.setItem("token_type", "Token");
  } else if (data.token) {
    // Simple token
    localStorage.setItem("token", data.token);
    localStorage.setItem("token_type", data.token_type || "Bearer");
  } else if (data.access) {
    // JWT
    localStorage.setItem("token", data.access);
    localStorage.setItem("token_type", "Bearer");
    if (data.user_id) localStorage.setItem("user_id", String(data.user_id));
  }

  // Guardar user_id si viene en la respuesta
  if (data.user_id) localStorage.setItem("user_id", String(data.user_id));
  if (data.id) localStorage.setItem("user_id", String(data.id));
}

function getAuthHeader() {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type") || "Bearer";
  if (!token) return {};
  return { Authorization: tokenType === "Token" ? `Token ${token}` : `${tokenType} ${token}` };
}

function buildUrl(endpoint) {
  const ep = String(endpoint || "").trim();
  if (!ep) return API_BASE;
  return ep.startsWith("http")
    ? ep
    : `${API_BASE.replace(/\/+$/, "")}/${ep.replace(/^\/+/, "")}`;
}

/* ================================
   Requests
   ================================ */
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
    const id = localStorage.getItem("user_id") || localStorage.getItem("id_usuario");
    if (!id) throw new Error("No user ID found in storage");

    const res = await fetch(`${API_BASE.replace(/\/+$/, "")}/usuario-id/${id}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      console.error("Token inválido o expirado");
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
}

export async function deleteData(endpoint) {
  try {
    const ep = String(endpoint || "").trim().replace(/^\/+|\/+$/g, "");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const url = `${API_BASE.replace(/\/+$/, "")}/${ep}`;
    const res = await fetch(url, { method: "DELETE", headers });
    console.log("DELETE", url, res.status);

    if (!res.ok) {
      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
      const err = new Error(body?.detail || body || `HTTP ${res.status}`);
      err.status = res.status;
      err.body = body;
      throw err;
    }

    if (res.status === 204) return { success: true };
    return await parseResponse(res);
  } catch (err) {
    console.error("deleteData error:", err);
    throw err;
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
