import { useState, useEffect } from "react";
import "../../styles/AgregarCursosModal.css";
import { getData, postData } from "../../services/fetch";

export default function AgregarNoticiasModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    titulo_noticia: "",
    descripcion_noticia: "",
    destacado: false,
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const guardarNoticia = {
      titulo_noticia: formData.titulo_noticia,
      descripcion_noticia: formData.descripcion_noticia,
      destacado: formData.destacado,
    };

    const peticion = await postData("crear-noticia/", guardarNoticia);
    console.log(peticion);

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        <div className="modal-topbar">
          {initialData ? "Editar Noticia" : "Crear Nueva Noticia"}
        </div>

        <div className="modal-scroll-area">
          <form id="noticiaForm" onSubmit={submitForm}>
            <div className="modal-grid">

              <div className="col-span-2">
                <label className="modal-label">Título</label>
                <input
                  className="modal-input"
                  name="titulo_noticia"
                  value={formData.titulo_noticia}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <label className="modal-label">Descripción</label>
                <textarea
                  className="modal-textarea"
                  name="descripcion_noticia"
                  value={formData.descripcion_noticia}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="switch-container">
                <label className="modal-label">Destacado</label>
                <input
                  type="checkbox"
                  className="modal-checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                />
              </div>

            </div>
          </form>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button type="submit" form="noticiaForm" className="btn-guardar">
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}
