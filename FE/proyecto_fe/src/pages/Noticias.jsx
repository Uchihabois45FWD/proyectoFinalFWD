import { useEffect, useState, useCallback } from "react"
import { getData, deleteData } from "../services/fetch"
import "../styles/noticias.css"
import AgregarNoticiasModal from "../components/Admin/AgregarNoticiasModal.jsx"

const Noticias = () => {
    const [listaNoticias, setListaNoticias] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const userRole = localStorage.getItem("user_role")

    const fetchNoticias = useCallback(async () => {
        try {
            const info = await getData("noticias/")
            setListaNoticias(info || [])
        } catch (error) {
            console.error("Error fetching noticias:", error)
            setListaNoticias([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchNoticias()
        // Polling para actualizar automáticamente cada 30 segundos
        const interval = setInterval(fetchNoticias, 30000)
        return () => clearInterval(interval)
    }, [fetchNoticias])

    const handleDeleteNoticia = async (id) => {
        if (userRole !== "admin") {
            alert("Solo los administradores pueden eliminar noticias")
            return
        }

        if (window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
            try {
                await deleteData(`noticias/${id}/`)
                setListaNoticias(prev => prev.filter(noticia => noticia.id !== id))
            } catch (error) {
                console.error("Error eliminando noticia:", error)
                alert("Error al eliminar la noticia")
            }
        }
    }

    const handleCreateNoticia = (newNoticia) => {
        setListaNoticias(prev => [...prev, newNoticia])
        setIsModalOpen(false)
    }

    if (loading) {
        return (
            <div className="noticias-page">
                <h1 className="noticias-titulo">Noticias</h1>
                <div className="loading">Cargando noticias...</div>
            </div>
        )
    }

    return (
        <div className="noticias-page">
            <h1 className="noticias-titulo">Noticias</h1>
            {userRole === "admin" && (
                <button onClick={() => setIsModalOpen(true)} className="btn-agregar-noticia">
                    Agregar Noticia
                </button>
            )}
            <div className="noticias-contenedor">
                {listaNoticias.length === 0 ? (
                    <div className="no-noticias">No hay noticias disponibles</div>
                ) : (
                    listaNoticias.map(noticia => (
                        <div key={noticia.id} className="noticia-card">
                            <img
                                src={noticia.imagen_noticia}
                                alt={noticia.titulo_noticia}
                                className="noticia-imagen"
                            />
                            <div className="noticia-content">
                                <h2 className="noticia-titulo">{noticia.titulo_noticia}</h2>
                                <p className="noticia-descripcion">{noticia.descripcion_noticia}</p>
                                <div className="noticia-meta">
                                    <p className="noticia-fecha">{noticia.dia_de_notificacion}</p>
                                    <p className="noticia-destacado">
                                        {noticia.destacado ? "Destacado" : "No destacado"}
                                    </p>
                                    {userRole === "admin" && (
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteNoticia(noticia.id)}
                                            title="Eliminar noticia"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {isModalOpen && (
                <AgregarNoticiasModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateNoticia}
                />
            )}
        </div>
    )
}

export default Noticias
