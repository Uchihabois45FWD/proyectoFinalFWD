import { useNavigate } from "react-router-dom";
import "../styles/NoticiasDestacadas.css";

export default function NoticiasDestacadas({
    id,
    titulo = "Noticia",
    descripcion = "Descripción",
    dia_publicacion = ""
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/noticias/${id}`);
    };

    return (
        <div className="curso-card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="curso-icon"></div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <p>{dia_publicacion}</p>
        </div>
    );
}