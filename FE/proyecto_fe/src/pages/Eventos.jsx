import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import EventosDestacados from "../components/Inicio/EventosDestacados";
import Navbar from "../components/Global/Navbar";
import "../styles/Cursos.css";
import { useNavigate } from "react-router-dom";

const Eventos = () => {
  const navigate = useNavigate();
  const [listaEventos, setListaEventos] = useState([]);
  const [view, setView] = useState("todos");
  const [rolUsuario] = useState(localStorage.getItem("rol"));

  useEffect(() => {
    async function traerEventos() {
      const info = await getData("crear-evento/");
      setListaEventos(info || []);
      console.log(info);
    }

    traerEventos();
  }, []);

  const toggleDestacado = (id) => {
    setListaEventos((prev) =>
      prev.map((e) => {
        const match = e.id === id || e.pk === id;
        return match ? { ...e, destacado: !e.destacado } : e;
      })
    );
  };

  const filtrados = listaEventos.filter((e) => {
    if (view === "todos") return true;
    if (view === "destacados") return e.destacado === true;
    return e.destacado !== true;
  });

  return (
    <>
      <Navbar />
      <div className="cursos-container">
        <div className="botones-container">
          <button type="button" onClick={() => setView("todos")}>
            Todos los eventos
          </button>

          <button type="button" onClick={() => setView("destacados")}>
            Eventos destacados
          </button>

          <button type="button" onClick={() => setView("explorar")}>
            Explorar eventos
          </button>
        </div>

        {filtrados.length === 0 ? (
          <p className="mensaje-vacio">No hay eventos para mostrar.</p>
        ) : (
          <div className="cursos-lista">
            {filtrados.map((evento) => (
              <>
              <div
                onClick={() => navigate(`/evento/${evento.id ?? evento.pk}`)}
              >
              <EventosDestacados
                key={evento.id ?? evento.pk}
                titulo={evento.titulo_evento}
                descripcion={evento.descripcion_evento}
                fecha={evento.fecha_evento}
                hora={evento.hora_evento} 
                lugar={evento.lugar_evento}
                organizador={evento.organizador?.usuario_nombre}
                destacado={evento.destacado}
                admin={rolUsuario}
                onToggleDestacado={() =>
                  toggleDestacado(evento.id ?? evento.pk)
                }
              />
              </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Eventos;
