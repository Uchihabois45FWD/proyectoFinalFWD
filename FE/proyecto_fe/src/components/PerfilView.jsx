import { useState } from "react";
import "../styles/perfil.css";
import PerfilEdit from "./PerfilEdit";
import { patchData } from "../services/fetch";

export default function PerfilView({ usuario }) {
    const [editando, setEditando] = useState(false);

    const [formData, setFormData] = useState({
        id_usuario: localStorage.getItem("id_usuario"),
        username: usuario.username,
        email: usuario.email,
        num_telefono: usuario.num_telefono,
        direccion: usuario.direccion
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function actualizarUsuario() {
        const peticion = await patchData(formData, 'api/actualizar-usuario');
        console.log('Usuario actualizado:', peticion);
        setEditando(false);
    }

    return (
        <div className="perfil-view">

            <img
                alt="Foto de perfil"
                className="foto-perfil"
            />

            <h2>{usuario.username}</h2>
            <p><strong>Correo:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> {usuario.num_telefono}</p>
            <p><strong>Direccion:</strong> {usuario.direccion}</p>

            <button className="btn-editar" onClick={() => setEditando(!editando)}>
                Editar perfil
            </button>

            {editando && (
                <div className="perfil-edit-container">
                    <input
                        name="username"
                        onChange={handleChange}
                        type="text"
                        value={formData.username}
                        placeholder="Editar nombre de usuario"
                    />

                    <input
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={formData.email}
                        placeholder="Editar correo"
                    />

                    <input
                        name="num_telefono"
                        onChange={handleChange}
                        type="text"
                        value={formData.num_telefono}
                        placeholder="Editar teléfono"
                    />

                    <input
                        name="direccion"
                        onChange={handleChange}
                        type="text"
                        value={formData.direccion}
                        placeholder="Editar dirección"
                    />

                    <button className="btn-guardar-cambios" onClick={actualizarUsuario}>
                        Guardar cambios
                    </button>
                </div>
            )}
        </div>
    );
}
