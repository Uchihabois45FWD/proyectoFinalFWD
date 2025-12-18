import "../styles/Hero.css"
import Hero from '../components/Global/Hero'
import { useEffect, useState } from "react"
import { getData } from "../services/fetch"
import CursosDestacados from "../components/Inicio/CursosDestacados"
import NoticiasDestacadas from "../components/Inicio/NoticiasDestacadas"
import { Link } from "react-router-dom"
import Navbar from "../components/Global/Navbar"
import WelcomeNotification from "../components/Global/WelcomeNotification"
import EventosDestacados from "../components/Inicio/EventosDestacados"

function PaginaInicio() {
    const [cursos, setCursos] = useState([])
    const [noticias, setNoticias] = useState([])
    const [eventos, setEventos] = useState([])
    const [showWelcome, setShowWelcome] = useState(false)
    const [userName, setUserName] = useState("")

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
                const peticion = await getData("noticias/")
                const destacados = peticion.filter((noticia) => noticia.destacado === true)
                setNoticias(destacados)
                console.log("Noticias:", peticion)
            } catch (error) {
                console.error("Error al traer noticias:", error)
            }
        }

        async function traerEventos() {
            try {
                const peticion = await getData("crear-evento/")
                const destacados = peticion.filter((evento) => evento.destacado === true)
                setEventos(destacados)
                console.log("Eventos:", peticion)
                console.log("Eventos destacados:", destacados)
            } catch (error) {
                console.error("Error al traer eventos:", error)
            }
        }

        // Verificar si el usuario acaba de iniciar sesión
        const justLoggedIn = sessionStorage.getItem("justLoggedIn")
        if (justLoggedIn) {
            const name = localStorage.getItem("user_name") || localStorage.getItem("username") || "Usuario"
            setUserName(name)
            setShowWelcome(true)
            sessionStorage.removeItem("justLoggedIn")
        }

        traerCursos()
        traerNoticias()
        traerEventos()
    }, [])

    const handleCloseWelcome = () => {
        setShowWelcome(false)
    }

    return (
        <>
            {showWelcome && (
                <WelcomeNotification
                    userName={userName}
                    onClose={handleCloseWelcome}
                />
            )}
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
                    <Link key={noticia.id} to={`/noticias/${noticia.id}`}>
                    <NoticiasDestacadas
                        key={noticia.id}
                        titulo={noticia.titulo_noticia}
                        descripcion={noticia.descripcion_noticia}
                        primer_dia={noticia.dia_de_notificacion}
                        dia_publicacion={noticia.dia_de_notificacion}
                    />
                    </Link>
                ))}
            </div>

            <h3 className='titulo-eventos'>Eventos Destecados</h3>
            <div className="cont-eventos">
                {eventos.map((evento) => (
                    <Link key={evento.id} to={`/eventos/${evento.id}`}>
                    <EventosDestacados
                        key={evento.id}
                        titulo={evento.titulo}
                        descripcion={evento.descripcion}
                        fecha={evento.fecha}
                        hora={evento.hora}
                        lugar={evento.lugar}
                        organizador={evento.organizador_nombre}
                    />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default PaginaInicio
