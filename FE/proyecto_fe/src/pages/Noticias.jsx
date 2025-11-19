import { useEffect, useState } from "react"
import { getData } from "../services/fetch"

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
        <>
            <h1>Noticias</h1>
            {listaNoticias.map(noticia => (
                <div key={noticia.id}>
                    <img src={noticia.imagen_noticia} alt={noticia.titulo_noticia} />
                    <h2>{noticia.titulo_noticia}</h2>
                    <p>{noticia.descripcion_noticia}</p>
                    <p>{noticia.dia_de_notificacion}</p>
                    <p>{noticia.destacado ? "Destacado" : "No destacado"}</p>
                </div>
            ))}
        </>
    )
}

export default Noticias
