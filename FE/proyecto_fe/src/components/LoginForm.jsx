import React from "react";
import "../styles/loginForm.css";

export default function LoginForm() {
  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      <form>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
