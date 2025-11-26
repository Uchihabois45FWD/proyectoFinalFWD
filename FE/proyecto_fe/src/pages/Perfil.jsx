import { useEffect, useState } from "react";
import PerfilView from "../components/PerfilView";
import PerfilEdit from "../components/PerfilEdit";
import { getData } from "../services/fetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PerfilPage() {
    const [usuario,setUsuario] = useState([])

    useEffect(()=>{
        async function traerUsuario() {
            const peticion = await getData(`usuario-id/${localStorage.getItem("id_usuario")}/`)
            setUsuario(peticion[0])
        }
        traerUsuario()
    },[])

    const handleUsuarioUpdate = (updatedUsuario) => {
        setUsuario(updatedUsuario);
    };

    return (
        <div className="perfil-layout">
            <Navbar />
            <div className="perfil-page">
                <PerfilView
                    usuario={usuario}
                    usuarioEdit={usuario}
                    onUpdate={handleUsuarioUpdate}
                />
            </div>
            <Footer />
        </div>
    );
}
