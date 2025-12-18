import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../services/fetch";
import Footer from "../components/Global/Footer";
import "../styles/cursoDetalle.css";

export default function EventosDetalle() {
    const { id } = useParams();
    const eventoId = parseInt(id);
    const [evento, setEvento] = useState(null);
    const [organizador, setOrganizador] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEventoData() {
            try {
                // Fetch event
                const eventos = await getData("crear-evento/");
                const foundEvento = eventos.find(e => e.id === eventoId);
                setEvento(foundEvento);

                // Fetch organizer data if exists
                if (foundEvento?.organizador) {
                    const organizadores = await getData("crear-usuario/");
                    const foundOrganizador = organizadores.find(o => o.id === foundEvento.organizador);
                    setOrganizador(foundOrganizador);
                }

                // Fetch category data if exists
                if (foundEvento?.categoria) {
                    const categorias = await getData("crear-categoria/");
                    const foundCategoria = categorias.find(c => c.id === foundEvento.categoria);
                    setCategoria(foundCategoria);
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEventoData();
    }, [eventoId]);

    const handleAsistir = async () => {
        const idUsuario = localStorage.getItem("id_usuario");
        if (!idUsuario) {
            alert("Debes iniciar sesión para asistir.");
            return;
        }
        try {
            await postData("crear-asistente-evento/", {
                usuario: idUsuario,
                evento: eventoId
            });
            alert("Registro exitoso!");
        } catch (error) {
            console.error("Error registrando:", error);
            alert("Error al registrarse.");
        }
    };

    if (loading) return <div className="curso-cargando">Cargando...</div>;
    if (!evento) return <div className="curso-no-encontrado">Evento no encontrado.</div>;

    return (
        <div className="curso-detalle-layout">
            <div className="curso-container">
                <main className="curso-detalle-contenido">
                    <section className="curso-banner">
                        <h1 className="curso-titulo">{evento.titulo}</h1>
                        {evento.imagen && (
                            <img src={evento.imagen} alt={evento.titulo} className="evento-imagen" />
                        )}
                    </section>

                    <section className="curso-info">
                        <p className="curso-descripcion"><strong>Descripción:</strong> {evento.descripcion}</p>
                        <p><strong>Organizador:</strong> {organizador ? `${organizador.first_name} ${organizador.last_name}` : "Sin organizador"}</p>
                        <p><strong>Fecha:</strong> {evento.fecha}</p>
                        <p><strong>Hora:</strong> {evento.hora}</p>
                        <p><strong>Lugar:</strong> {evento.lugar}</p>
                        <p><strong>Categoría:</strong> {categoria ? categoria.nombre_categoria : "Sin categoría"}</p>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
