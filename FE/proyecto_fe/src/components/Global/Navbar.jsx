import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/navbar.css";

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    // Get current user from localStorage
    const currentUser = {
      name: localStorage.getItem("user_name") || localStorage.getItem("username") || "Administrador",
      role: localStorage.getItem("user_role") || "administrador"
    };

  useEffect(() => {
    const checkLoginStatus = () => {
      // Check both localStorage and sessionStorage for login data
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

    // Check initially
    checkLoginStatus();

    // Listen for storage changes (in case of login/logout in same tab)
    const handleStorageChange = (e) => {
      if (e.key === "user_role" || e.key === "auth_token" || e.key === "access_token") {
        checkLoginStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically (for same-tab changes)
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

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

    // Common links for all logged-in users
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
            <Link to="/perfil" className="nav">Mi Perfil</Link>
            <Link to="/admin" className="nav admin-link">Admin Dashboard</Link>
          </>
        );

      case "instructor":
        return (
          <>
            {commonLinks}
            <Link to="/perfil" className="nav-link">Mi Perfil</Link>
          </>
        );

      case "usuario":
        return (
          <>
            {commonLinks}
            <Link to="/perfil" className="nav">Mi Perfil</Link>
            <Link to="/mis-cursos" className="nav">Mis Cursos</Link>
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
          <>
            <div className="user-info">
              <span className="nameuser">{userName}</span>
              <span className="user-role">{userRole}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
