import React, { useState } from "react";
import "../styles/loginForm.css";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: correo,
          password: contrasena,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      // Aquí puedes manejar lo que devuelva tu API
      // Ejemplo: si devuelve { "mensaje": "Login exitoso" }
      alert(data.mensaje || "Login correcto");

      // En el futuro, aquí guardarías el token:
      // localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error: " + error.message);
    }
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
        <button
          className="btn-user"
          onClick={() => {
            setCorreo("user@example.com");
            setContrasena("userpass");
          }}
        >
          👤 Acceso como Usuario
        </button>
        <button
          className="btn-admin"
          onClick={() => {
            setCorreo("admin@example.com");
            setContrasena("adminpass");
          }}
        >
          🔑 Acceso como Administrador
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
