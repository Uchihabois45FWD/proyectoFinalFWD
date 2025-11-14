import React, { useState } from "react";
import "../styles/loginForm.css";
import { loginUser } from "../services/fetch";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser(usuario, contrasena);
    alert(data.mensaje || "Login correcto");
  } catch (error) {
    alert("Error: " + error.message);
  }
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
        <button className="btn-user">👤 Acceso como Usuario</button>
        <button className="btn-admin">🔑 Acceso como Administrador</button>
      </div>
    </div>
  );
};

export default LoginForm;
