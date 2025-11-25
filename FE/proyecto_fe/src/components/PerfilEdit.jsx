import { useState } from "react";

export default function PerfilEdit({ usuario, guardarCambios, cancelar }) {

    const [formData, setFormData] = useState(usuario);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const enviar = (e) => {
        e.preventDefault();
        guardarCambios(formData);
    };

    return (
        <form className="perfil-edit" onSubmit={enviar}>

            <h2>Editar Perfil</h2>
            <label>Nombre</label>
            <input
                name="nombre"
                value={formData.first_name}
                onChange={handleChange}
            />
            <label>Correo</label>
            <input
                name="correo"
                value={formData.email}
                onChange={handleChange}
            />
            <label>Teléfono</label>
            <input
                name="telefono"
                value={formData.num_telefono}
                onChange={handleChange}
            />
            <div className="acciones">
                <button type="submit" className="btn-guardar">Guardar</button>
                <button type="button" className="btn-cancelar" onClick={cancelar}>
                    Cancelar
                </button>
            </div>

        </form>
    );
}
