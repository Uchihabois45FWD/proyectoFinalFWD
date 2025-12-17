import { useState, useEffect } from "react";
import "../../styles/AgregarCursosModal.css";

export default function AgregarCategoriaModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    nombre_categoria: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async(e) => {
    e.preventDefault();
    if (!formData.nombre_categoria.trim()) {
      alert('Por favor, ingresa un nombre para la categoría.');
      return;
    }
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error al crear la categoría. Revisa la consola para más detalles.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Barra superior */}
        <div className="modal-topbar">
          {initialData ? "Editar Categoría" : "Crear Nueva Categoría"}
        </div>

        {/* Área scrolleable */}
        <div className="modal-scroll-area">
          <form id="categoriaForm" onSubmit={submitForm}>

            <div className="modal-grid">

              <div className="col-span-2">
                <label className="modal-label">Nombre de la Categoría</label>
                <input
                  className="modal-input"
                  name="nombre_categoria"
                  value={formData.nombre_categoria}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre de la categoría"
                />
              </div>

            </div>
          </form>
        </div>

        {/* Acciones */}
        <div className="modal-actions">
          <button type="button" className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button type="submit" form="categoriaForm" className="btn-guardar">
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}
