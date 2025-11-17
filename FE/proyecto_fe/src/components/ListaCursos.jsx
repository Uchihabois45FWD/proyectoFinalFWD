import CursosDestacados from "./CursosDestacados"

const ListaCursos = ({cursos}) =>{
    return(
        <>
            {cursos.map((curso)=>{
                return(
                    <CursosDestacados
                        titulo={curso.nombre_curso}
                        descripcion={curso.descripcion_curso}
                        diaInicio={curso.primer_dia}
                        diaFin={curso.ultimo_dia}
                        cupos={curso.limite_cupos}
                    />
                )
            })}
        </>
    )
}
export default ListaCursos