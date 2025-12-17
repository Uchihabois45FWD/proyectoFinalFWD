import React, { useState } from "react";
import "../../styles/loginForm.css";
import { loginUser } from "../../services/fetch";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario.trim() || !contrasena.trim()) {
      alert("Complete usuario y contraseña");
      return;
    }

    setSubmitting(true);

    try {
      const data = await loginUser(usuario.trim(), contrasena);

      // 🔥 SIEMPRE usa localStorage
      const storage = localStorage;

      storage.setItem("auth_token", data.token);

      if (data?.id_usuario) storage.setItem("id_usuario", String(data.id_usuario));
      if (data?.user_id) storage.setItem("id_usuario", String(data.user_id));
      if (data?.id) storage.setItem("id_usuario", String(data.id));

      if (data?.rol) storage.setItem("user_role", data.rol);
      else if (!storage.getItem("user_role")) storage.setItem("user_role", "usuario");

      if (data?.nombre) storage.setItem("user_name", data.nombre);
      else if (data?.name) storage.setItem("user_name", data.name);
      else if (data?.username) storage.setItem("user_name", data.username);
      else storage.setItem("user_name", usuario.trim());

      // 🔥 Eliminar remember_me, ya no se usa
      // storage.setItem("remember_me", "false");

      sessionStorage.setItem("justLoggedIn", "true");

      alert(data.mensaje || "Inicio de sesión correcto");
      localStorage.setItem("token", data.token);
      navigate("/inicio");

    } catch (err) {
      const resp = err?.response || {};
      const msg =
        typeof resp === "string"
          ? resp
          : resp.detail || resp.mensaje || err.message || "Error al iniciar sesión";
      alert(String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  const setDemoUserRole = (role) => {
    localStorage.setItem("user_role", role);
    localStorage.setItem("id_usuario", role === "administrador" ? "1" : "2");
    localStorage.setItem("user_name", role === "administrador" ? "Administrador" : "Usuario Demo");
    sessionStorage.setItem("justLoggedIn", "true");
    alert(`Sesión iniciada como ${role}`);
    navigate("/inicio");
  };

  return (
    <div className="login-card">
      <h2>Iniciar Sesión</h2>
      <p>Accede a tu cuenta del Centro Cívico</p>

      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Nombre de usuario"
          disabled={submitting}
        />

        <label>Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="••••••••"
          disabled={submitting}
        />

        <button type="button" className="ver" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Ocultar contraseña" : "Ver contraseña"}
        </button>

        <button type="submit" className="btn-login" disabled={submitting}>
          {submitting ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <p className="register-link">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>

        <p className="forgot-password">
          <a href="/reset-password">¿Olvidaste tu contraseña?</a>
        </p>
      </form>

      <hr />

      <h4>Acceso de Demostración</h4>
      <div className="demo-buttons">
        <button type="button" className="btn-user" onClick={() => setDemoUserRole("usuario")}>
          👤 Acceso como Usuario
        </button>
        <button type="button" className="btn-admin" onClick={() => setDemoUserRole("administrador")}>
          🔑 Acceso como Administrador
        </button>
      </div>
    </div>
  );
}
