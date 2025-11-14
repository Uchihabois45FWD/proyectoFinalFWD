import { useEffect, useState } from "react"
import { getData } from "../services/fetch"

const Cursos=()=>{
    const [listaCursos,setListaCursos] = useState([])

    useEffect(()=>{
        async function traerCursos() {
            const info = await getData("crear-curso/")
            setListaCursos(info)
        }
        traerCursos()
    },[])
    return(
        <>
            {listaCursos.map(curso=>(
                    <div>
                        <p>{curso.nombre_curso}</p>
                        <p>{curso.descripcion_curso}</p>
                        <p>{curso.fecha_inicio_curso}</p>
                        <p>{curso.fecha_fin_curso}</p>
                        <p>{curso.limite_cupos}</p>
                        <p>{curso.primer_dia}</p>
                        <p>{curso.ultimo_dia}</p>
                    </div>
            ))}
        </>
    )
}
export default Cursos