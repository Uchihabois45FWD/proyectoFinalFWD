import React, { useState } from "react";
import "../styles/loginForm.css";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Correo: ${correo}\nContraseña: ${contrasena}`);
  };

  return (
    <div className="login-card">
      <h2>Iniciar Sesión</h2>
      <p>Accede a tu cuenta del Centro Cívico</p>

      <form onSubmit={handleSubmit}>
        <label>Correo Electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@ejemplo.com"
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
