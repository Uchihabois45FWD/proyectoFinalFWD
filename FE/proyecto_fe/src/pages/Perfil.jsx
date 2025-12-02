import { useEffect, useState } from "react";
<<<<<<< HEAD
import PerfilView from "../components/Usuario/PerfilView";
import { getData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
=======
import PerfilView from "../components/PerfilView";
import PerfilEdit from "../components/PerfilEdit";
import { getData, getUser } from "../services/fetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
>>>>>>> a7cf9e2329487bf3f41b6cc7b18a055e7a7515fe

export default function PerfilPage() {
    const [usuario,setUsuario] = useState([])

    useEffect(()=>{
        async function traerUsuario() {
            const peticion = await getUser()
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
