import React from "react";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      </div>
      <div className="navbar-links">
        <a href="#">Inicio</a>
        <a href="#">Acerca</a>
        <a href="#">Contacto</a>
      </div>
    </nav>
  );
}
