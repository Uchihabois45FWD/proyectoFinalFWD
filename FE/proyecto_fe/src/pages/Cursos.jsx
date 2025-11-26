import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CursosDestacados from "../components/CursosDestacados";
import Navbar from "../components/Navbar";
import "../styles/Cursos.css";

const Cursos = () => {
  const [listaCursos, setListaCursos] = useState([]);
  const [view, setView] = useState("todos");
  const [rolUsuario] = useState(localStorage.getItem("rol"));

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
    return c.destacado !== true;
  });

  return (
    <>
      <Navbar />
      <div className="cursos-container">
        <div className="botones-container">
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
          <p className="mensaje-vacio">No hay cursos para mostrar.</p>
        ) : (
          <div className="cursos-lista">
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
                admin={rolUsuario}
                onToggleDestacado={() =>
                  toggleDestacado(curso.id ?? curso.pk)
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cursos;
