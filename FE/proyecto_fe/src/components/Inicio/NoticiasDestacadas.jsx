<<<<<<< HEAD:FE/proyecto_fe/src/components/Inicio/NoticiasDestacadas.jsx
import "../../styles/NoticiasDestacadas.css"
=======
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
>>>>>>> a7cf9e2329487bf3f41b6cc7b18a055e7a7515fe:FE/proyecto_fe/src/components/NoticiasDestacadas.jsx

    return (
        <div className="curso-card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="curso-icon"></div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <p>{dia_publicacion}</p>
        </div>
    );
}