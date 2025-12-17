import React, { useState } from "react";
import { deleteData } from "../../services/fetch";

const idFromEvento = (e) => (e?.id_evento ?? e?.id ?? e?.pk ?? "");

export default function ListaEventos({ eventos = [], onSaveEvento, onDeleteEvento }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const startEdit = (evento) => {
    setEditingId(idFromEvento(evento));
    setForm({
      titulo: evento?.titulo ?? "",
      descripcion: evento?.descripcion ?? "",
      fecha: evento?.fecha ? evento.fecha.split('T')[0] : "",
      hora: evento?.hora ?? "",
      lugar: evento?.lugar ?? "",
      categoria: evento?.categoria ?? "",
      organizador: evento?.organizador ?? "",
      cupos: evento?.cupos ?? "",
      imagen: evento?.imagen ?? "",
      destacado: evento?.destacado ?? false
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
      await onSaveEvento(editingId, form);
      cancelEdit();
    } catch (err) {
      console.error("Error saving evento (child):", err);
      alert("Error al guardar evento. Revisa la consola.");
    } finally {
      setSavingId(null);
    }
  };

  const askDelete = (evento) => {
    const id = idFromEvento(evento);
    if (!id) return;
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = async (evento) => {
    const id = idFromEvento(evento);
    if (!id) return;
    setDeletingId(id);
    try {
      await deleteData(`api/eliminar-evento/${id}`);
      onDeleteEvento(id);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Error deleting evento (child):", err);
      alert("Error al eliminar evento. Revisa la consola.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="section">
      <h2>Eventos</h2>
      <div className="list">
        {eventos.length === 0 ? (
          <p>No hay eventos para mostrar.</p>
        ) : (
          eventos.map((evento) => {
            const eid = idFromEvento(evento);
            const editing = String(editingId) === String(eid);
            const confirming = String(confirmDeleteId) === String(eid);
            return (
              <div className="list-item" key={eid || evento.titulo || Math.random()}>
                {editing ? (
                  <div className="edit-form">
                    <div className="form-section">
                      <h4>Información Básica</h4>
                      <div className="form-row">
                        <input
                          value={form.titulo}
                          onChange={(e) => handleChange("titulo", e.target.value)}
                          placeholder="Título del evento"
                          className="form-input"
                        />
                        <textarea
                          value={form.descripcion}
                          onChange={(e) => handleChange("descripcion", e.target.value)}
                          placeholder="Descripción del evento"
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>Detalles del Evento</h4>
                      <div className="form-row">
                        <input
                          value={form.fecha}
                          onChange={(e) => handleChange("fecha", e.target.value)}
                          type="date"
                          className="form-input"
                        />
                        <input
                          value={form.hora}
                          onChange={(e) => handleChange("hora", e.target.value)}
                          type="time"
                          className="form-input"
                        />
                      </div>

                      <div className="form-row">
                        <input
                          value={form.lugar}
                          onChange={(e) => handleChange("lugar", e.target.value)}
                          placeholder="Lugar del evento"
                          className="form-input"
                        />
                        <input
                          value={form.cupos}
                          onChange={(e) => handleChange("cupos", e.target.value)}
                          placeholder="Cupos disponibles"
                          type="number"
                          className="form-input"
                        />
                      </div>

                      <div className="form-row">
                        <input
                          value={form.categoria}
                          onChange={(e) => handleChange("categoria", e.target.value)}
                          placeholder="ID de categoría"
                          type="number"
                          className="form-input"
                        />
                        <input
                          value={form.organizador}
                          onChange={(e) => handleChange("organizador", e.target.value)}
                          placeholder="ID del organizador"
                          type="number"
                          className="form-input"
                        />
                      </div>

                      <div className="form-row">
                        <input
                          value={form.imagen}
                          onChange={(e) => handleChange("imagen", e.target.value)}
                          placeholder="URL de la imagen"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>Opciones Adicionales</h4>
                      <div className="form-row checkboxes">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={form.destacado}
                            onChange={(e) => handleChange("destacado", e.target.checked)}
                          />
                          <span>⭐ Marcar como destacado</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button onClick={saveEdit} disabled={savingId === eid} className="btn-save">
                        {savingId === eid ? "Guardando..." : "Guardar Cambios"}
                      </button>
                      <button onClick={cancelEdit} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : confirming ? (
                  <div className="confirm-delete">
                    <div className="confirm-text">
                      <strong>¿Eliminar {evento?.titulo || "este evento"}?</strong>
                      <div>
                        <small>Esta acción eliminará el evento permanentemente.</small>
                      </div>
                    </div>
                    <div className="confirm-actions">
                      <button onClick={() => confirmDelete(evento)} className="btn-delete" disabled={deletingId === eid}>{deletingId === eid ? "Eliminando..." : "Confirmar"}</button>
                      <button onClick={cancelDelete} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="view-row">
                    <div className="evento-info">
                      <div className="evento-header">
                        <h3 className="evento-name">{evento?.titulo ?? "-"}</h3>
                        {evento?.destacado && <span className="featured-badge">⭐ Destacado</span>}
                      </div>

                      <div className="evento-details">
                        <p className="evento-description">{evento?.descripcion ?? "Sin descripción"}</p>

                        <div className="evento-meta">
                          <div className="meta-item">
                            <span className="meta-label">📅 Fecha:</span>
                            <span className="meta-value">
                              {evento?.fecha ? (() => {
                                const date = new Date(evento.fecha + 'T00:00:00');
                                return date.toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                });
                              })() : "-"}
                            </span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">🕒 Hora:</span>
                            <span className="meta-value">{evento?.hora ?? "-"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">📍 Lugar:</span>
                            <span className="meta-value">{evento?.lugar ?? "-"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">👥 Cupos:</span>
                            <span className="meta-value">{evento?.cupos ?? "0"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">🏷️ Categoría:</span>
                            <span className="meta-value">{evento?.categoria ?? "-"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">👨‍💼 Organizador:</span>
                            <span className="meta-value">{evento?.organizador ?? "-"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="actions">
                      <button onClick={() => startEdit(evento)} className="btn-edit">Editar</button>
                      <button onClick={() => askDelete(evento)} className="btn-delete" disabled={deletingId === eid}>{deletingId === eid ? "Eliminando..." : "Eliminar"}</button>
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
