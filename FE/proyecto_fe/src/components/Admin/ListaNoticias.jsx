import React, { useState } from "react";
import { deleteData } from "../../services/fetch";

const idFromNoticia = (n) => (n?.id_noticia ?? n?.id ?? n?.pk ?? "");

export default function ListaNoticias({ noticias = [], onSaveNoticia, onDeleteNoticia }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const startEdit = (noticia) => {
    setEditingId(idFromNoticia(noticia));
    setForm({
      titulo_noticia: noticia?.titulo_noticia ?? "",
      descripcion_noticia: noticia?.descripcion_noticia ?? "",
      imagen_noticia: noticia?.imagen_noticia ?? "",
      autor: noticia?.autor ?? ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSavingId(editingId);
    try {
      await onSaveNoticia(editingId, form);
      cancelEdit();
    } catch (err) {
      console.error("Error saving noticia (child):", err);
      alert("Error al guardar noticia. Revisa la consola.");
    } finally {
      setSavingId(null);
    }
  };

  const askDelete = (noticia) => {
    const id = idFromNoticia(noticia);
    if (!id) return;
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = async (noticia) => {
    const id = idFromNoticia(noticia);
    if (!id) return;
    setDeletingId(id);
    try {
      await deleteData(`api/eliminar-noticia/${id}`);
      onDeleteNoticia(id);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Error deleting noticia (child):", err);
      alert("Error al eliminar noticia. Revisa la consola.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="section">
      <h2>Noticias</h2>
      <div className="list">
        {noticias.length === 0 ? (
          <p>No hay noticias para mostrar.</p>
        ) : (
          noticias.map((noticia) => {
            const nid = idFromNoticia(noticia);
            const editing = String(editingId) === String(nid);
            const confirming = String(confirmDeleteId) === String(nid);
            return (
              <div className="list-item" key={nid || noticia.titulo_noticia || Math.random()}>
                {editing ? (
                  <div className="edit-form">
                    <div className="form-section">
                      <h4>Información Básica</h4>
                      <div className="form-row">
                        <input
                          value={form.titulo_noticia}
                          onChange={(e) => handleChange("titulo_noticia", e.target.value)}
                          placeholder="Título de la noticia"
                          className="form-input"
                        />
                        <textarea
                          value={form.descripcion_noticia}
                          onChange={(e) => handleChange("descripcion_noticia", e.target.value)}
                          placeholder="Descripción de la noticia"
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>Detalles de la Noticia</h4>
                      <div className="form-row">
                        <input
                          value={form.imagen_noticia}
                          onChange={(e) => handleChange("imagen_noticia", e.target.value)}
                          placeholder="URL de la imagen"
                          className="form-input"
                        />
                        <input
                          value={form.autor}
                          onChange={(e) => handleChange("autor", e.target.value)}
                          placeholder="ID del autor"
                          type="number"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button onClick={saveEdit} disabled={savingId === nid} className="btn-save">
                        {savingId === nid ? "Guardando..." : "Guardar Cambios"}
                      </button>
                      <button onClick={cancelEdit} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : confirming ? (
                  <div className="confirm-delete">
                    <div className="confirm-text">
                      <strong>¿Eliminar {noticia?.titulo_noticia || "esta noticia"}?</strong>
                      <div>
                        <small>Esta acción eliminará la noticia permanentemente.</small>
                      </div>
                    </div>
                    <div className="confirm-actions">
                      <button onClick={() => confirmDelete(noticia)} className="btn-delete" disabled={deletingId === nid}>{deletingId === nid ? "Eliminando..." : "Confirmar"}</button>
                      <button onClick={cancelDelete} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="view-row">
                    <div className="noticia-info">
                      <div className="noticia-header">
                        <h3 className="noticia-name">{noticia?.titulo_noticia ?? "-"}</h3>
                      </div>

                      <div className="noticia-details">
                        <p className="noticia-description">{noticia?.descripcion_noticia ?? "Sin descripción"}</p>

                        <div className="noticia-meta">
                          <div className="meta-item">
                            <span className="meta-label">📅 Fecha de publicación:</span>
                            <span className="meta-value">
                              {noticia?.fecha_publicacion ? (() => {
                                const date = new Date(noticia.fecha_publicacion);
                                return date.toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                });
                              })() : "-"}
                            </span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">👨‍💼 Autor:</span>
                            <span className="meta-value">{noticia?.autor ?? "-"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="actions">
                      <button onClick={() => startEdit(noticia)} className="btn-edit">Editar</button>
                      <button onClick={() => askDelete(noticia)} className="btn-delete" disabled={deletingId === nid}>{deletingId === nid ? "Eliminando..." : "Eliminar"}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
