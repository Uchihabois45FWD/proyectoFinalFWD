import "../styles/perfil.css";

export default function PerfilView({usuario}) {
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

            <button className="btn-editar">
                Editar perfil
            </button>

        </div>
    );
}
