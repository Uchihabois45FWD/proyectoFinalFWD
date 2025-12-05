import React, { useState } from "react";
import { deleteData } from "../../services/fetch";

const idFromCourse = (c) => (c?.id_curso ?? c?.id ?? c?.pk ?? "");

export default function ListaCursos({ courses = [], onSaveCourse, onDeleteCourse }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const startEdit = (course) => {
    setEditingId(idFromCourse(course));
    setForm({
      nombre_curso: course?.nombre_curso ?? "",
      descripcion_curso: course?.descripcion_curso ?? "",
      instructor: course?.instructor ?? "",
      limite_cupos: course?.limite_cupos ?? course?.cupos ?? "",
      modalidad: course?.modalidad ?? "",
      fecha_inicio_curso: course?.fecha_inicio_curso ? course.fecha_inicio_curso.split('T')[0] : "",
      fecha_fin_curso: course?.fecha_fin_curso ? course.fecha_fin_curso.split('T')[0] : "",
      primer_dia: course?.primer_dia ?? "",
      ultimo_dia: course?.ultimo_dia ?? "",
      certificado: course?.certificado ?? false,
      destacado: course?.destacado ?? false
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
      await onSaveCourse(editingId, form);
      cancelEdit();
    } catch (err) {
      console.error("Error saving course (child):", err);
      alert("Error al guardar curso. Revisa la consola.");
    } finally {
      setSavingId(null);
    }
  };

  const askDelete = (course) => {
    const id = idFromCourse(course);
    if (!id) return;
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = async (course) => {
    const id = idFromCourse(course);
    if (!id) return;
    setDeletingId(id);
    try {
      await deleteData(`api/eliminar-curso/${id}`);
      onDeleteCourse(id);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Error deleting course (child):", err);
      alert("Error al eliminar curso. Revisa la consola.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="section">
      <h2>Cursos</h2>
      <div className="list">
        {courses.length === 0 ? (
          <p>No hay cursos para mostrar.</p>
        ) : (
          courses.map((course) => {
            const cid = idFromCourse(course);
            const editing = String(editingId) === String(cid);
            const confirming = String(confirmDeleteId) === String(cid);
            return (
              <div className="list-item" key={cid || course.nombre_curso || Math.random()}>
                {editing ? (
                  <div className="edit-form">
                    <div className="form-section">
                      <h4>Información Básica</h4>
                      <div className="form-row">
                        <input
                          value={form.nombre_curso}
                          onChange={(e) => handleChange("nombre_curso", e.target.value)}
                          placeholder="Nombre del curso"
                          className="form-input"
                        />
                        <textarea
                          value={form.descripcion_curso}
                          onChange={(e) => handleChange("descripcion_curso", e.target.value)}
                          placeholder="Descripción del curso"
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>Detalles del Curso</h4>
                      <div className="form-row">
                        <input
                          value={form.instructor}
                          onChange={(e) => handleChange("instructor", e.target.value)}
                          placeholder="ID del instructor"
                          type="number"
                          className="form-input"
                        />
                        <input
                          value={form.limite_cupos}
                          onChange={(e) => handleChange("limite_cupos", e.target.value)}
                          placeholder="Cupos disponibles"
                          type="number"
                          className="form-input"
                        />
                      </div>

                      <div className="form-row">
                        <select
                          value={form.modalidad}
                          onChange={(e) => handleChange("modalidad", e.target.value)}
                          className="form-select"
                        >
                          <option value="">Seleccionar modalidad</option>
                          <option value="presencial">Presencial</option>
                          <option value="virtual">Virtual</option>
                          <option value="bimodal">Bimodal</option>
                        </select>

                        <select
                          value={form.primer_dia}
                          onChange={(e) => handleChange("primer_dia", e.target.value)}
                          className="form-select"
                        >
                          <option value="">Primer día</option>
                          <option value="lunes">Lunes</option>
                          <option value="martes">Martes</option>
                          <option value="miércoles">Miércoles</option>
                          <option value="jueves">Jueves</option>
                          <option value="viernes">Viernes</option>
                        </select>

                        <select
                          value={form.ultimo_dia}
                          onChange={(e) => handleChange("ultimo_dia", e.target.value)}
                          className="form-select"
                        >
                          <option value="">Último día</option>
                          <option value="lunes">Lunes</option>
                          <option value="martes">Martes</option>
                          <option value="miércoles">Miércoles</option>
                          <option value="jueves">Jueves</option>
                          <option value="viernes">Viernes</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <input
                          value={form.fecha_inicio_curso}
                          onChange={(e) => handleChange("fecha_inicio_curso", e.target.value)}
                          type="date"
                          className="form-input"
                        />
                        <input
                          value={form.fecha_fin_curso}
                          onChange={(e) => handleChange("fecha_fin_curso", e.target.value)}
                          type="date"
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
                            checked={form.certificado}
                            onChange={(e) => handleChange("certificado", e.target.checked)}
                          />
                          <span>🏆 Incluye certificado</span>
                        </label>

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
                      <button onClick={saveEdit} disabled={savingId === cid} className="btn-save">
                        {savingId === cid ? "Guardando..." : "Guardar Cambios"}
                      </button>
                      <button onClick={cancelEdit} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : confirming ? (
                  <div className="confirm-delete">
                    <div className="confirm-text">
                      <strong>¿Eliminar {course?.nombre_curso || "este curso"}?</strong>
                      <div>
                        <small>Esta acción eliminará el curso permanentemente.</small>
                      </div>
                    </div>
                    <div className="confirm-actions">
                      <button onClick={() => confirmDelete(course)} className="btn-delete" disabled={deletingId === cid}>{deletingId === cid ? "Eliminando..." : "Confirmar"}</button>
                      <button onClick={cancelDelete} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="view-row">
                    <div className="course-info">
                      <div className="course-header">
                        <h3 className="course-name">{course?.nombre_curso ?? "-"}</h3>
                        {course?.destacado && <span className="featured-badge">⭐ Destacado</span>}
                      </div>

                      <div className="course-details">
                        <p className="course-description">{course?.descripcion_curso ?? "Sin descripción"}</p>

                        <div className="course-meta">
                          <div className="meta-item">
                            <span className="meta-label">👨‍🏫 Instructor:</span>
                            <span className="meta-value">{course?.nombre_instructor ?? course?.instructor ?? "Sin asignar"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">📅 Fechas:</span>
                            <span className="meta-value">
                              {course?.fecha_inicio_curso ? (() => {
                                const date = new Date(course.fecha_inicio_curso + 'T00:00:00');
                                return date.toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                });
                              })() : "-"} -
                              {course?.fecha_fin_curso ? (() => {
                                const date = new Date(course.fecha_fin_curso + 'T00:00:00');
                                return date.toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                });
                              })() : "-"}
                            </span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">📚 Modalidad:</span>
                            <span className="meta-value">{course?.modalidad ?? "No especificada"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">👥 Cupos:</span>
                            <span className="meta-value">{course?.limite_cupos ?? course?.cupos ?? "0"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">📆 Días:</span>
                            <span className="meta-value">{course?.primer_dia ?? "-"} - {course?.ultimo_dia ?? "-"}</span>
                          </div>

                          <div className="meta-item">
                            <span className="meta-label">🏆 Certificado:</span>
                            <span className="meta-value">{course?.certificado ? "Sí" : "No"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="actions">
                      <button onClick={() => startEdit(course)} className="btn-edit">Editar</button>
                      <button onClick={() => askDelete(course)} className="btn-delete" disabled={deletingId === cid}>{deletingId === cid ? "Eliminando..." : "Eliminar"}</button>
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