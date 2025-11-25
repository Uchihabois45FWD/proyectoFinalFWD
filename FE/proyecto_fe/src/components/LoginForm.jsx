import React, { useState } from "react";
import "../styles/loginForm.css";
import { loginUser } from "../services/fetch";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usuario.trim() === "" || contrasena.trim() === "") {
      alert("Llene todos los campos");
      return;
    }
    try {
      const data = await loginUser(usuario, contrasena);
      alert(data.mensaje || "Login correcto");
      localStorage.setItem("id_usuario", data.id_usuario);
      if (data.rol) {
        localStorage.setItem("user_role", data.rol);
      } else {
        localStorage.setItem("user_role", "usuario");
      }
      navigate("/perfil");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const setDemoUserRole = (role) => {
    localStorage.setItem("user_role", role);
    localStorage.setItem("id_usuario", role === "administrador" ? "1" : "2");
    alert(`Sesión iniciada como ${role}`);
    window.location.href = "/inicio";
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
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="••••••••"
        />

        <div className="remember-row">
          <input
            type="checkbox"
            checked={recordarme}
            onChange={() => setRecordarme(!recordarme)}
          />
          <span>Recordarme</span>
        </div>

        <button type="submit" className="btn-login">
          Iniciar Sesión
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
        <button
          className="btn-user"
          onClick={() => setDemoUserRole("usuario")}
        >
          👤 Acceso como Usuario
        </button>
        <button
          className="btn-admin"
          onClick={() => setDemoUserRole("administrador")}
        >
          🔑 Acceso como Administrador
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
