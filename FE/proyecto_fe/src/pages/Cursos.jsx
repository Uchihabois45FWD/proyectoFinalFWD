import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CursosDestacados from "../components/CursosDestacados";

const Cursos = () => {
  const [listaCursos, setListaCursos] = useState([]);
  const [view, setView] = useState("todos");

  useEffect(() => {
    async function traerCursos() {
      const info = await getData("crear-curso/");
      setListaCursos(info || []);
      console.log(info);
    }

    traerCursos();
  }, []);

  const toggleDestacado = (id) => {
    setListaCursos((prev) =>
      prev.map((c) => {
        const match = c.id === id || c.pk === id;
        return match ? { ...c, destacado: !c.destacado } : c;
      })
    );
  };

  const filtrados = listaCursos.filter((c) => {
    if (view === "todos") return true;
    if (view === "destacados") return c.destacado === true;
    return c.destacado !== true; // explorar
  });

  return (
    <>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button type="button" onClick={() => setView("todos")}>
          Todos los cursos
        </button>

        <button type="button" onClick={() => setView("destacados")}>
          Cursos destacados
        </button>

        <button type="button" onClick={() => setView("explorar")}>
          Explorar cursos
        </button>
      </div>

      {filtrados.length === 0 ? (
        <p>No hay cursos para mostrar.</p>
      ) : (
        <div className="contenedor-cursos">
          {filtrados.map((curso) => (
            <CursosDestacados
              key={curso.id ?? curso.pk}
              titulo={curso.nombre_curso}
              descripcion={curso.descripcion_curso}
              primer_dia={curso.primer_dia}
              ultimo_dia={curso.ultimo_dia}
              cupos={curso.limite_cupos}
              inscructor={curso.nombre_instructor}
              destacado={curso.destacado}
              onToggleDestacado={() =>
                toggleDestacado(curso.id ?? curso.pk)
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Cursos;