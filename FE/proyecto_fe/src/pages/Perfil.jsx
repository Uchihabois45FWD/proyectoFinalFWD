import { useEffect, useState } from "react";
import PerfilView from "../components/PerfilView";
import PerfilEdit from "../components/PerfilEdit";
import { getData } from "../services/fetch";

export default function PerfilPage() {
    const [usuario,setUsuario] = useState([])

    useEffect(()=>{
        async function traerUsuario() {
            const peticion = await getData(`usuario-id/${localStorage.getItem("id_usuario")}/`)
            setUsuario(peticion[0])
        }
        traerUsuario()
    },[])
    

    return (
        <div className="perfil-page">

                <PerfilView
                    usuario={usuario}
                />
            

        </div>
    );
}
