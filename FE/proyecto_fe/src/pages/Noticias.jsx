import { useEffect, useState } from "react"
import { getData } from "../services/fetch"
import "../styles/noticias.css"
import Navbar from "../components/Global/Navbar";


const Noticias = () => {
    const [listaNoticias, setListaNoticias] = useState([])

    useEffect(() => {
        async function traerNoticias() {
            const info = await getData("crear-noticia/")
            setListaNoticias(info)
            console.log(info);
        }

        traerNoticias()
    }, [])

    return (
        <div>
            <div className="noticias-page">
                <h1 className="noticias-titulo">Noticias</h1>
                <div className="noticias-contenedor">
                    {listaNoticias.map(noticia => (
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Noticias