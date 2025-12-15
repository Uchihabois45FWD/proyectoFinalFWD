import React, { useState } from "react";
import "../../styles/AdminDashboard.css";

const ListaCategorias = ({ categorias, onSaveCategoria, onDeleteCategoria, onCreateCategoria }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre_categoria: "" });

  const handleEdit = (categoria) => {
    setEditingId(categoria.id);
    setEditForm({ nombre_categoria: categoria.nombre_categoria });
  };

  const handleSave = async () => {
    try {
      await onSaveCategoria(editingId, editForm);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving categoria:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ nombre_categoria: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      try {
        await onDeleteCategoria(id);
      } catch (error) {
        console.error("Error deleting categoria:", error);
      }
    }
  };

  return (
    <div className="categorias-container">
      {/* Header con botón de agregar */}
      <div className="categorias-header">
        <button className="btn-agregar-categoria" onClick={onCreateCategoria}>
          <span className="btn-icon">➕</span>
          Agregar Categoría
        </button>
      </div>

      {/* Grid de categorías */}
      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="categoria-card">
            {editingId === categoria.id ? (
              <div className="categoria-edit-mode">
                <input
                  type="text"
                  value={editForm.nombre_categoria}
                  onChange={(e) =>
                    setEditForm({ nombre_categoria: e.target.value })
                  }
                  className="categoria-input-edit"
                  autoFocus
                />
                <div className="categoria-actions">
                  <button onClick={handleSave} className="btn-guardar-mini">
                    ✓
                  </button>
                  <button onClick={handleCancel} className="btn-cancelar-mini">
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="categoria-display">
                <div className="categoria-name">
                  {categoria.nombre_categoria}
                </div>
                <div className="categoria-actions">
                  <button
                    onClick={() => handleEdit(categoria)}
                    className="btn-editar-mini"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    className="btn-eliminar-mini"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCategorias;
