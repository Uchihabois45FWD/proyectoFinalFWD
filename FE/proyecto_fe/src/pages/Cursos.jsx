import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CursosDestacados from "../components/Inicio/CursosDestacados";
import "../styles/Cursos.css";
import { useNavigate } from "react-router-dom";

const Cursos = () => {
  const navigate = useNavigate();
  const [listaCursos, setListaCursos] = useState([]);
  const [view, setView] = useState("todos");
  const [rolUsuario] = useState(localStorage.getItem("rol"));
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function traerCursos() {
      const info = await getData("crear-curso/");
      setListaCursos(info || []);
    }
    traerCursos();
  }, []);

  const toggleDestacado = (id) => {
    setListaCursos((prev) =>
      prev.map((c) =>
        c.id === id || c.pk === id
          ? { ...c, destacado: !c.destacado }
          : c
      )
    );
  };

  const filtrados = listaCursos
    .filter((c) => {
      if (view === "todos") return true;
      if (view === "destacados") return c.destacado === true;
      return c.destacado !== true;
    })
    .filter((c) =>
      c.nombre_curso?.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <section className="cursos-container">
      <div className="titulo-cursos">
        <h2>Cursos destacados</h2>
      </div>

      <input
        type="text"
        className="buscador-cursos"
        placeholder="Buscar cursos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="botones-container">
        <button
          className={view === "todos" ? "btn-activo" : ""}
          onClick={() => setView("todos")}
        >
          Todos los cursos
        </button>

        <button
          className={view === "destacados" ? "btn-activo" : ""}
          onClick={() => setView("destacados")}
        >
          Cursos destacados
        </button>
      </div>

      {filtrados.length === 0 ? (
        <p className="mensaje-vacio">No hay cursos para mostrar.</p>
      ) : (
        <div className="cursos-lista">
          {filtrados.map((curso) => (
            <div
              key={curso.id ?? curso.pk}
              className="curso-wrapper"
              onClick={() =>
                navigate(`/curso/${curso.id ?? curso.pk}`)
              }
            >
              <CursosDestacados
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cursos;
