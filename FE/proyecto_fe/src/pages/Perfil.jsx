import { useEffect, useState } from "react";
import PerfilView from "../components/Usuario/PerfilView";
import { getData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function traerUsuario() {
      try {
        const peticion = await getData(`usuario-id/${localStorage.getItem("id_usuario")}/`);
        setUsuario(peticion || null); // ya es objeto, no array
      } catch (err) {
        console.error("Error al traer usuario:", err);
        setUsuario(null);
      }
    }
    traerUsuario();
  }, []);

  const handleUsuarioUpdate = (updatedUsuario) => {
    setUsuario(updatedUsuario);
  };

  return (
    <div className="perfil-layout">
      <div className="perfil-page">
        {usuario ? (
          <PerfilView usuario={usuario} onUpdate={handleUsuarioUpdate} />
        ) : (
          <p>Error cargando perfil o usuario no encontrado.</p>
        )}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
