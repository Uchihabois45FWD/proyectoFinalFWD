import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import "../styles/cursoDetalle.css";

export default function EventosDetalle() {
    const { id } = useParams();
    const eventoId = parseInt(id);
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvento() {
            try {
                const eventos = await getData("crear-evento/");
                const foundEvento = eventos.find(e => e.id === eventoId);
                setEvento(foundEvento);
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvento();
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
            <Navbar />
            <div className="curso-container">
                <main className="curso-detalle-contenido">
                    <section className="curso-banner">
                        <h1 className="curso-titulo">{evento.titulo_evento}</h1>
                    </section>

                    <section className="curso-info">
                        <p className="curso-descripcion"><strong>Descripción:</strong> {evento.descripcion_evento}</p>
                        <p><strong>Organizador:</strong> {evento.organizador?.first_name} {evento.organizador?.last_name}</p>
                        <p><strong>Fecha:</strong> {evento.fecha_evento}</p>
                        <p><strong>Hora:</strong> {evento.hora_evento}</p>
                        <p><strong>Lugar:</strong> {evento.lugar_evento}</p>
                        <p><strong>Categoría:</strong> {evento.categoria?.nombre_categoria}</p>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
