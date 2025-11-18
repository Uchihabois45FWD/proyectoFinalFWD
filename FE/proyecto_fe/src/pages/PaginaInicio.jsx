import "../styles/Hero.css"
import Hero from '../components/Hero'
import { useEffect, useState } from "react"
import { getData } from "../services/fetch"
import ListaCursos from "../components/ListaCursos"
import ListaNoticiasDestacadas from "../components/ListaNoticiasDestacadas"

function PaginaInicio() {
    const [cursos, setCursos] = useState([])
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        async function traerCursos() {
            const peticion = await getData("crear-curso/")
            setCursos(peticion)
            console.log(peticion);
        }
        async function traerNoticias() {
            const peticion = await getData("crear-noticia/")
            setNoticias(peticion)
            console.log(peticion);
        }
        traerCursos()
        traerNoticias()
    }, [])

    return (
        <>
            <div>
                <Hero />
            </div>

            <h3 className='titulo-cursos'>Cursos destacados</h3>
            <div className="cont-cursos">
                <ListaCursos cursos={cursos} />
            </div>

            <h3 className='titulo-noticias'>Noticias destacadas</h3>
            <div className="cont-noticias">
                <ListaNoticiasDestacadas noticias={noticias} />
            </div>
        </>
    )
}

export default PaginaInicio
