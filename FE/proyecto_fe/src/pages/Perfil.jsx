import { useState } from "react";
import PerfilView from "../components/PerfilView";
import PerfilEdit from "../components/PerfilEdit";

export default function PerfilPage() {

    const [modoEdicion, setModoEdicion] = useState(false);

  
    const guardarCambios = (datosActualizados) => {
        setUsuario(datosActualizados);
        setModoEdicion(false);
    };

    return (
        <div className="perfil-page">

            {!modoEdicion ? (
                <PerfilView
                    usuario={usuario}
                    activarEdicion={() => setModoEdicion(true)}
                />
            ) : (
                <PerfilEdit
                    usuario={usuario}
                    guardarCambios={guardarCambios}
                    cancelar={() => setModoEdicion(false)}
                />
            )}

        </div>
    );
}
