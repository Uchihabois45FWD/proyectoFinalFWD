import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, putData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";

export default function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    titulo_evento: "",
    descripcion_evento: "",
    fecha_evento: "",
    hora_evento: "",
    lugar_evento: "",
    categoria: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEvento() {
      try {
        const eventos = await getData("crear-evento/");
        const found = eventos.find((e) => e.id === parseInt(id));
        if (found) setEvento(found);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    cargarEvento();
  }, [id]);


  const handleChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardar = async () => {
    try {
      await putData(`crear-evento/${id}/`, evento);
      alert("Evento actualizado correctamente");
      navigate(`/evento/${id}`);
    } catch (error) {
      alert("Error al actualizar");
      console.error(error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div className="curso-container">
        <h1>Editar Evento</h1>

        <div className="form-editar-evento">

          <label>Título</label>
          <input
            type="text"
            name="titulo_evento"
            value={evento.titulo_evento}
            onChange={handleChange}
          />

          <label>Descripción</label>
          <textarea
            name="descripcion_evento"
            value={evento.descripcion_evento}
            onChange={handleChange}
          />

          <label>Fecha</label>
          <input
            type="date"
            name="fecha_evento"
            value={evento.fecha_evento}
            onChange={handleChange}
          />

          <label>Hora</label>
          <input
            type="time"
            name="hora_evento"
            value={evento.hora_evento}
            onChange={handleChange}
          />

          <label>Lugar</label>
          <input
            type="text"
            name="lugar_evento"
            value={evento.lugar_evento}
            onChange={handleChange}
          />

          <button onClick={handleGuardar} className="btn-inscribirse">
            Guardar Cambios
          </button>
        </div>
      </div>
    </>
  );
}
