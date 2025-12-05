import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  const userRole = localStorage.getItem("user_role"); // Assuming role is stored in localStorage on login

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/inicio" className="navbar-title">Centro Cívico La Capri</Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Iniciar Sesión</Link>
        <Link to="/registro">Registro</Link>
        {userRole === "administrador" && (
          <Link to="/admin" style={{ marginLeft: "15px", fontWeight: "bold" }}>Admin Dashboard</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
