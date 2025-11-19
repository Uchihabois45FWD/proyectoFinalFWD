import "../styles/NoticiasDestacadas.css"

export default function NoticiasDestacadas({titulo="Noticia", descripcion="Descripción",dia_publicacion=""}) {
    return (
        <div className="curso-card">
            <div className="curso-icon"></div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <p>{dia_publicacion}</p>
           
        </div>
    );
}
