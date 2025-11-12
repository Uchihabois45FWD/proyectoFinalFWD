import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Centro Cívico La Capri</span>
      </div>
      <div className="navbar-right">
        <a href="/login">Iniciar Sesión</a>
        <a href="/register">Registro</a>
      </div>
    </nav>
  );
};

export default Navbar;
