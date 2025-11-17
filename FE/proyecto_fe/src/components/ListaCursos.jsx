import CursosDestacados from "./CursosDestacados"

const ListaCursos = ({cursos}) =>{
    return(
        <>
            {cursos.map((curso)=>{
                return(
                    <CursosDestacados
                        titulo={curso.nombre_curso}
                        descripcion={curso.descripcion_curso}
                        primer_dia={curso.primer_dia}
                        ultimo_dia={curso.ultimo_dia}
                        cupos={curso.limite_cupos}
                        inscructor={curso.nombre_instructor + ' ' + curso.apellido_instructor}
                    />
                )
            })}
        </>
    )
}
export default ListaCursos