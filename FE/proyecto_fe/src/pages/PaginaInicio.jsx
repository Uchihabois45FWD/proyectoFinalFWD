import "../styles/Hero.css"
import Hero from '../components/Global/Hero'
import { useEffect, useState } from "react"
import { getData } from "../services/fetch"
import CursosDestacados from "../components/Inicio/CursosDestacados"
import NoticiasDestacadas from "../components/Inicio/NoticiasDestacadas"
import { Link } from "react-router-dom"
import Navbar from "../components/Global/Navbar"

function PaginaInicio() {
    const [cursos, setCursos] = useState([])
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        async function traerCursos() {
            try {
                const peticion = await getData("crear-curso/")
                const destacados = peticion.filter((curso) => curso.destacado === true)
                setCursos(destacados)
                console.log("Cursos:", peticion)
            } catch (error) {
                console.error("Error al traer cursos:", error)
            }
        }

        async function traerNoticias() {
            try {
                const peticion = await getData("crear-noticia/")
                const destacados = peticion.filter((noticia) => noticia.destacado === true) 
                setNoticias(destacados)
                console.log("Noticias:", peticion)
            } catch (error) {
                console.error("Error al traer noticias:", error)
            }
        }

        traerCursos()
        traerNoticias()
    }, [])

    return (
        <>
            <Navbar />
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
                            instructor={curso.nombre_instructor + ' ' + curso.apellido_instructor}  
                        />
                    </Link>
                ))}
            </div>

            <h3 className='titulo-noticias'>Noticias destacadas</h3>
            <div className="cont-noticias">
                {noticias.map((noticia) => (
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
