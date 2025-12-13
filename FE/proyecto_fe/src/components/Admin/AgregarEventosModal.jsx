import { useState, useEffect } from "react";
import "../../styles/EventoModal.css";
import { postData, postDataAutenticado } from "../../services/fetch";
export default function AgregarEventosModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
    
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    lugar: "",
    categoria: "",
    cupos: "",
    imagen: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const eventoObj = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      fecha: formData.fecha,
      hora: formData.hora,
      lugar: formData.lugar,
      categoria: formData.categoria,
      organizador: localStorage.getItem("id_usuario"),
      cupos: formData.cupos,
      imagen: formData.imagen || "https://via.placeholder.com/150",
    };

    try {
      const peticion = await postDataAutenticado("crear-evento/", eventoObj);
      console.log("Respuesta POST:", peticion);
      if (onSubmit) onSubmit(peticion);
      onClose();
    } catch (err) {
      console.error("Error creando evento:", err);
      alert("Error al crear evento, revisa la consola");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-nav">
          <h2>{initialData ? "Editar Evento" : "Crear Evento"}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-scroll">
          <form onSubmit={submitForm} className="modal-form">
            <div className="modal-grid">
              <div className="campo campo-full">
                <label>Título</label>
                <input
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>

              <div className="campo campo-full">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="campo">
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Lugar</label>
                <input
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Categoría</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="charla">Charla</option>
                  <option value="taller">Taller</option>
                  <option value="conferencia">Conferencia</option>
                </select>
              </div>

              <div className="campo">
                <label>Cupos</label>
                <input
                  type="number"
                  name="cupos"
                  value={formData.cupos}
                  onChange={handleChange}
                />
              </div>

              <div className="campo campo-full">
                <label>Imagen (URL)</label>
                <input
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-guardar">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
