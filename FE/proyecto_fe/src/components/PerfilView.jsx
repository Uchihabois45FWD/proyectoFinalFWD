export default function PerfilView({ usuario, activarEdicion }) {
    return (
        <div className="perfil-view">

            <img
                src={usuario.foto}
                alt="Foto de perfil"
                className="foto-perfil"
            />

            <h2>{usuario.nombre}</h2>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>Bio:</strong> {usuario.bio}</p>

            <button onClick={activarEdicion} className="btn-editar">
                Editar perfil
            </button>

        </div>
    );
}
