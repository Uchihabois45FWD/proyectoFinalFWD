import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../../styles/navbar.css";

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Función para formatear el rol del usuario para mostrar
  const formatUserRole = (role) => {
    if (!role) return "";
    switch (role.toLowerCase()) {
      case "administrador":
        return "Administrador";
      case "instructor":
        return "Instructor";
      case "usuario":
        return "Usuario";
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

    // Obtener el usuario actual desde localStorage
    const currentUser = {
      name: localStorage.getItem("user_name") || localStorage.getItem("username") || "Administrador",
      role: localStorage.getItem("user_role") || "administrador"
    };

  useEffect(() => {
    const checkLoginStatus = () => {
    // Verificar tanto localStorage como sessionStorage para datos de inicio de sesión
      const role = localStorage.getItem("user_role") || sessionStorage.getItem("user_role");
      const name = localStorage.getItem("user_name") || sessionStorage.getItem("user_name") || localStorage.getItem("username");
      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token") || localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

      if (role && token) {
        setUserRole(role);
        setUserName(name);
        setIsLoggedIn(true);
      } else {
        setUserRole(null);
        setUserName("");
        setIsLoggedIn(false);
      }
    };

    // Verificar inicialmente
    checkLoginStatus();

    // Escuchar cambios de almacenamiento (en caso de inicio de sesión/cerrar sesión en la misma pestaña)
    const handleStorageChange = (e) => {
      if (e.key === "user_role" || e.key === "auth_token" || e.key === "access_token") {
        checkLoginStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // También verificar periódicamente (para cambios en la misma pestaña)
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Manejar clics fuera de la barra lateral para cerrarla
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserRole(null);
    setUserName("");
    setIsLoggedIn(false);
    navigate("/");
  };

  const renderNavigationLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link to="/" className="nav-link-login">Iniciar Sesión</Link>
          <Link to="/registro" className="nav-link-register">Registro</Link>
        </>
      );
    }

    // Enlaces comunes para todos los usuarios conectados
    const commonLinks = (
      <>
        <Link to="/inicio" className="nav">Inicio</Link>
        <Link to="/cursos" className="nav">Cursos</Link>
        <Link to="/noticias" className="nav">Noticias</Link>
        <Link to="/eventos" className="nav">Eventos</Link>
      </>
    );

    switch (userRole) {
      case "administrador":
        return (
          <>
            {commonLinks}
            <Link to="/admin" className="nav admin-link">Admin Dashboard</Link>
          </>
        );

      case "instructor":
        return (
          <>
            {commonLinks}
          </>
        );

      case "usuario":
        return (
          <>
            {commonLinks}
          </>
        );

        case "organizador":
        return (
          <>
            {commonLinks}
          </>
        );

      default:
        return (
          <>
            {commonLinks}
          </>
        );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/inicio" className="navbar-title">
          Centro Cívico La Capri
        </Link>
      </div>

      <div className="navbar-center">
        {renderNavigationLinks()}
      </div>

      <div className="header-right">
        {isLoggedIn && (
          <div className="user-menu" ref={dropdownRef}>
            <button
              className="user-info-btn"
              onClick={() => {
                console.log("Dropdown clicked, current state:", isSidebarOpen);
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <span className="nameuser">{userName}</span>
              <span className="user-role">{formatUserRole(userRole)}</span>
              <span className="dropdown-arrow">{isSidebarOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {(() => {
        console.log("Rendering dropdown - isSidebarOpen:", isSidebarOpen, "isLoggedIn:", isLoggedIn);
        console.log("localStorage values:", {
          user_role: localStorage.getItem("user_role"),
          user_name: localStorage.getItem("user_name"),
          username: localStorage.getItem("username"),
          auth_token: localStorage.getItem("auth_token"),
          access_token: localStorage.getItem("access_token")
        });
        return isSidebarOpen && (
          <div className="dropdown-overlay" onClick={() => setIsSidebarOpen(false)} style={{background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999}}>
            <div className="dropdown-menu" ref={dropdownRef} onClick={(e) => e.stopPropagation()} style={{position: 'absolute', top: '64px', right: '20px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', minWidth: '180px', zIndex: 10000}}>
              <Link to="/perfil" className="dropdown-item" onClick={() => setIsSidebarOpen(false)} style={{display: 'block', padding: '10px', textDecoration: 'none', color: '#333'}}>
                Mi Perfil
              </Link>
              <button onClick={handleLogout} className="dropdown-item logout-item" style={{display: 'block', width: '100%', padding: '10px', border: 'none', background: 'none', color: '#dc2626', textAlign: 'left', cursor: 'pointer'}}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        );
      })()}
    </nav>
  );
};

export default Navbar;
