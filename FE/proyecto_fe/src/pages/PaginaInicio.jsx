import "../styles/Hero.css"
import Hero from '../components/Hero'
import CursosDestacados from "../components/CursosDestacados"
import { useEffect, useState } from "react"
import { getData } from "../services/fetch"
import ListaCursos from "../components/ListaCursos"
function PaginaInicio() {
    const [cursos,setCursos] = useState([])

    useEffect(()=>{
        async function traerCursos() {
            const peticion = await getData("crear-curso/")
            const destacados = peticion.filter((destacado)=>destacado.destacado === true)
            setCursos(destacados)
            console.log(peticion);
            
        }
        traerCursos()
    },[])
  return (
    <>
    <div>
       <Hero/>
    </div>

    <h3 className='titulo-cursos'>Cursos destacados</h3>
    <div className="cont-cursos">
    <ListaCursos cursos={cursos}/>
    </div>
    </>

  )
}
export default PaginaInicio