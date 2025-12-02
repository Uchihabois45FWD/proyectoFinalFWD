import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import "../styles/cursoDetalle.css";

export default function CursoDetalle() {
    const { id } = useParams();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCurso() {
            try {
                const cursos = await getData("crear-curso/");
                const foundCurso = cursos.find(c => c.id == id);
                setCurso(foundCurso);
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCurso();
    }, [id]);

    const handleInscribirse = async () => {
        const idUsuario = localStorage.getItem("id_usuario");
        if (!idUsuario) {
            alert("Debes iniciar sesión para inscribirte.");
            return;
        }
        try {
            await postData("crear-inscripcion/", {
                usuario: idUsuario,
                curso: id
            });
            alert("Inscripción exitosa!");
        } catch (error) {
            console.error("Error inscribiendo:", error);
            alert("Error al inscribirse.");
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (!curso) return <div>Curso no encontrado.</div>;

    return (
        <div className="curso-detalle-layout">
            <Navbar />
            <div className="curso-detalle">
                <img src={curso.imagen_curso} alt={curso.nombre_curso} className="curso-imagen" />
                <h1>{curso.nombre_curso}</h1>
                <p><strong>Descripción:</strong> {curso.descripcion_curso}</p>
                <p><strong>Instructor:</strong> {curso.nombre_instructor} {curso.apellido_instructor}</p>
                
                <p><strong>Fecha de inicio:</strong> {curso.fecha_inicio_curso}</p>
                <p><strong>Fecha de fin:</strong> {curso.fecha_fin_curso}</p>
                
                <p><strong>Días:</strong> {curso.primer_dia} a {curso.ultimo_dia}</p>
                <p><strong>Cupos:</strong> {curso.limite_cupos}</p>

                <div className="comentarios">
                    <h3>Comentarios</h3>
                    <p>No hay comentarios aún.</p>
                </div>

                <button onClick={handleInscribirse} className="btn-inscribirse">Inscribirse</button>
            </div>
            <Footer />
        </div>
    );
}
