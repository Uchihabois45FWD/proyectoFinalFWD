import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../services/fetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/noticiaDetalle.css";

export default function NoticiasDetalle() {
    const { id } = useParams();
    const noticiaId = Number(id);
    const [noticia, setNoticia] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const stripTags = (html) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    useEffect(() => {
        async function fetchNoticia() {
            try {
                const noticias = await getData("crear-noticia/");
                if (Array.isArray(noticias)) {
                    const found = noticias.find((n) => Number(n.id) === noticiaId);
                    setNoticia(found || null);
                } else {
                    setNoticia(null);
                }
            } catch (err) {
                console.error("Error fetching noticia:", err);
                setNoticia(null);
            } finally {
                setLoading(false);
            }
        }
        if (!Number.isNaN(noticiaId)) fetchNoticia();
        else setLoading(false);
    }, [noticiaId]);

    const loadComentarios = async () => {
        try {
            const data = await getData("comentarios-noticias/");
            if (Array.isArray(data)) {
                setComentarios(data.filter((c) => Number(c.noticia) === noticiaId));
            } else {
                setComentarios([]);
            }
        } catch (err) {
            console.error("Error fetching comentarios:", err);
            setComentarios([]);
        }
    };

    useEffect(() => {
        if (!Number.isNaN(noticiaId)) loadComentarios();
    }, [noticiaId]);

    const handlePublicarComentario = async (e) => {
        e?.preventDefault();
        const idUsuario = localStorage.getItem("id_usuario") || localStorage.getItem("user_id") || null;
        if (!idUsuario && !localStorage.getItem("token") && !localStorage.getItem("access_token")) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }
        if (!nuevoComentario.trim()) {
            alert("Escribe un comentario.");
            return;
        }

        setSubmitting(true);
        try {
            const cleanText = stripTags(nuevoComentario.trim());
            const payload = {
                noticia: noticiaId,
                contenido_comentario: cleanText,
            };
            if (idUsuario) payload.usuario = Number(idUsuario);

            const saved = await fetch(`http://127.0.0.1:8000/api/comentarios-noticias/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token") || localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload)
            })
            console.log("POST comentario response:", saved);

            if (saved && typeof saved === "object" && (saved.id || saved.pk || saved.contenido_comentario)) {
                setComentarios((prev) => [saved, ...prev]);
            } else {
                console.warn("Respuesta inesperada al crear comentario, recargando lista:", saved);
                await loadComentarios();
            }

            setNuevoComentario("");
        } catch (err) {
            console.error("Error publicando comentario:", err, err.response ?? err.message);
            const resp = err.response || {};
            let mensaje = "";
            if (typeof resp === "string") mensaje = resp;
            else if (resp.detail) mensaje = resp.detail;
            else if (Object.keys(resp).length > 0) {
                mensaje = Object.entries(resp)
                    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
                    .join(" | ");
            }
            alert(mensaje || "Error al publicar comentario");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="noticia-loading">Cargando...</div>;
    if (!noticia) return <div className="noticia-error">Noticia no encontrada</div>;

    return (
        <div className="noticia-detalle-layout">
            <Navbar />
            <div className="noticia-detalle">
                <h1 className="noticia-titulo">{noticia.titulo_noticia}</h1>
                <p className="noticia-fecha">
                    <small>
                        {noticia.dia_publicacion ? new Date(noticia.dia_publicacion).toLocaleDateString() : ""}
                    </small>
                </p>
                <p className="noticia-descripcion">{noticia.descripcion_noticia}</p>

                <div className="comentarios-seccion">
                    <h3>Comentarios ({comentarios.length})</h3>

                    <form onSubmit={handlePublicarComentario}>
                        <textarea
                            placeholder="Escribe tu comentario..."
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            rows="4"
                        />
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Publicando..." : "Publicar Comentario"}
                        </button>
                    </form>

                    <div className="lista-comentarios">
                        {comentarios.length === 0 ? (
                            <p>No hay comentarios aún</p>
                        ) : (
                            comentarios.map((c) => (
                                <div key={c.id ?? c.pk ?? `${c.usuario}-${c.fecha_comentario}`} className="comentario-item">
                                    <p className="comentario-texto">{c.contenido_comentario}</p>
                                    <small className="comentario-meta">
                                        {c.usuario_nombre ?? `Usuario #${c.usuario ?? "?"}`}{" "}
                                        {c.fecha_comentario ? `| ${new Date(c.fecha_comentario).toLocaleDateString()}` : ""}
                                    </small>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}