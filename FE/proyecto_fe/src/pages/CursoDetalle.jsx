import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import "../styles/cursoDetalle.css";

export default function CursoDetalle() {
    const { id } = useParams();
    const cursoId = parseInt(id);
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        async function fetchCurso() {
            try {
                const cursos = await getData("crear-curso/");
                const foundCurso = cursos.find(c => c.id === cursoId);
                setCurso(foundCurso);
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCurso();
    }, [cursoId]);

    useEffect(() => {
        async function fetchComentarios() {
            try {
                const data = await getData("crear-comentario-curso/");
                if (Array.isArray(data)) {
                    const comentariosFiltrados = data.filter(c => c.curso === cursoId);
                    setComentarios(comentariosFiltrados);
                } else {
                    setComentarios([]);
                }
            } catch (error) {
                console.error("Error fetching comentarios:", error);
                setComentarios([]);
            }
        }
        if (cursoId) fetchComentarios();
    }, [cursoId]);

    const handleInscribirse = async () => {
        const idUsuario = localStorage.getItem("id_usuario");
        if (!idUsuario) {
            alert("Debes iniciar sesión para inscribirte.");
            return;
        }
        try {
            await postData("crear-inscripcion/", {
                usuario: idUsuario,
                curso: cursoId
            });
            alert("Inscripción exitosa!");
        } catch (error) {
            console.error("Error inscribiendo:", error);
            alert("Error al inscribirse.");
        }
    };

    if (loading) return <div className="curso-cargando">Cargando...</div>;
    if (!curso) return <div className="curso-no-encontrado">Curso no encontrado.</div>;

    return (
        <div className="curso-detalle-layout">
            <Navbar />
            <div className="curso-container">
                <main className="curso-detalle-contenido">
                    <section className="curso-banner">
                        <img src={curso.imagen_curso} alt={curso.nombre_curso} className="curso-imagen" />
                        <h1 className="curso-titulo">{curso.nombre_curso}</h1>
                    </section>

                    <section className="curso-info">
                        <p className="curso-descripcion"><strong>Descripción:</strong> {curso.descripcion_curso}</p>
                        <p><strong>Instructor:</strong> {curso.nombre_instructor} {curso.apellido_instructor}</p>
                        <p><strong>Fecha de inicio:</strong> {curso.fecha_inicio_curso}</p>
                        <p><strong>Fecha de fin:</strong> {curso.fecha_fin_curso}</p>
                        <p><strong>Días:</strong> {curso.primer_dia} a {curso.ultimo_dia}</p>
                        <p><strong>Cupos disponibles:</strong> {curso.limite_cupos}</p>
                    </section>

                    <section className="curso-comentarios">
                        <h3>Comentarios ({comentarios.length})</h3>
                        {comentarios.length === 0 ? (
                            <p className="comentario-vacio">No hay comentarios aún</p>
                        ) : (
                            comentarios.map((c) => (
                                <div key={c.id || c.pk} className="comentario-item">
                                    <p className="comentario-texto">{c.contenido_comentario}</p>
                                    <small className="comentario-meta">
                                        Usuario #{c.usuario_nombre} | {new Date(c.fecha_comentario).toLocaleDateString()}
                                    </small>
                                </div>
                            ))
                        )}
                    </section>

                    <div className="curso-inscripcion">
                        <button onClick={handleInscribirse} className="btn-inscribirse">Inscribirse Ahora</button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
