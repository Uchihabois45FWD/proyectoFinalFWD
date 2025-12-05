import { useEffect, useState } from "react";
<<<<<<< HEAD
import PerfilView from "../components/PerfilView";
import PerfilEdit from "../components/PerfilEdit";
import { getData } from "../services/fetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
=======
import PerfilView from "../components/Usuario/PerfilView";
import { getData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);

<<<<<<< HEAD
    useEffect(()=>{
        async function traerUsuario() {
            const peticion = await getData(`usuario-id/${localStorage.getItem("id_usuario")}/`)
            setUsuario(peticion[0])
        }
        traerUsuario()
    },[])
=======
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
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

  const handleUsuarioUpdate = (updatedUsuario) => {
    setUsuario(updatedUsuario);
  };

  return (
    <div className="perfil-layout">
      <Navbar />
      <div className="perfil-page">
        {usuario ? (
          <PerfilView usuario={usuario} onUpdate={handleUsuarioUpdate} />
        ) : (
          <p>Error cargando perfil o usuario no encontrado.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
