import { useEffect, useState } from "react"
import { getData } from "../services/fetch"

const Cursos = () => {
  const [listaCursos, setListaCursos] = useState([])
  const [view, setView] = useState("destacados") 

  useEffect(() => {
    async function traerCursos() {
      const info = await getData("crear-curso/")
      setListaCursos(info || [])
      console.log(info)
    }

    traerCursos()
  }, [])

  const toggleDestacado = (id) => {
    setListaCursos(prev =>
      prev.map(c => {
        const match = c.id === id || c.pk === id
        return match ? { ...c, destacado: !c?.destacado } : c
      })
    )
  }

  const filtrados = listaCursos.filter(c =>
    view === "destacados" ? !!c?.destacado : !c?.destacado
  )

  return (
    <>
      <div>
        <button type="button" onClick={() => setView("destacados")}>
          Destacados
        </button>
        <button type="button" onClick={() => setView("explorar")}>
          Explorar cursos
        </button>
      </div>

      {filtrados.length === 0 ? (
        <p>No hay cursos</p>
      ) : (
        filtrados.map((curso) => (
          <div key={curso.id}>
            <p>{curso.nombre_curso}</p>
            <p>{curso.descripcion_curso}</p>
            <p>{curso.fecha_inicio_curso}</p>
            <p>{curso.fecha_fin_curso}</p>
            <p>{curso.limite_cupos}</p>
            <p>{curso.primer_dia}</p>
            <p>{curso.ultimo_dia}</p>

            <button type="button" onClick={() => toggleDestacado(curso.id ?? curso.pk)}>
              {curso?.destacado ? "Quitar destacado" : "Destacar"}
            </button>
          </div>
        ))
      )}
    </>
  )
}
export default Cursos