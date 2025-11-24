import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/inicio" className="navbar-title">Centro Cívico La Capri</Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Iniciar Sesión</Link>
        <Link to="/registro">Registro</Link>
      </div>
    </nav>
  );
};

export default Navbar;
