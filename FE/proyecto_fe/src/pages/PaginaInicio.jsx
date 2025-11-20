import "../styles/Hero.css"
import Hero from '../components/Hero'
import { useEffect, useState } from "react"
import { getData } from "../services/fetch"
import CursosDestacados from "../components/CursosDestacados"
import NoticiasDestacadas from "../components/NoticiasDestacadas"
import { Link } from "react-router-dom"

function PaginaInicio() {
    const [cursos, setCursos] = useState([])
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        async function traerCursos() {
            const peticion = await getData("crear-curso/")
            const destacados = peticion.filter((destacado)=>destacado.destacado === true)
            setCursos(destacados)
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
                {cursos.map((curso) => (
                    <Link key={curso.id} to={`/curso/${curso.id}`}>
                        <CursosDestacados
                            titulo={curso.nombre_curso}
                            descripcion={curso.descripcion_curso}
                            primer_dia={curso.primer_dia}
                            ultimo_dia={curso.ultimo_dia}
                            cupos={curso.limite_cupos}
                            inscructor={curso.nombre_instructor + ' ' + curso.apellido_instructor}
                        />
                    </Link>
                ))}
            </div>

            <h3 className='titulo-noticias'>Noticias destacadas</h3>
            <div className="cont-noticias">
                {noticias.filter(noticia => noticia.destacado).map((noticia) => (
                    <NoticiasDestacadas
                        key={noticia.id}
                        titulo={noticia.titulo_noticia}
                        descripcion={noticia.descripcion_noticia}
                        primer_dia={noticia.dia_de_notificacion}
                        dia_publicacion={noticia.dia_de_notificacion}
                    />
                ))}
            </div>
        </>
    )
}
export default PaginaInicio
