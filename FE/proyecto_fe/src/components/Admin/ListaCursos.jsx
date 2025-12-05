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
      descripcion: course?.descripcion ?? "",
      instructor: course?.instructor ?? "",
      cupos: course?.cupos ?? "",
      modalidad: course?.modalidad ?? ""
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
                  <div className="edit-row">
                    <input value={form.nombre_curso} onChange={(e) => handleChange("nombre_curso", e.target.value)} placeholder="Nombre curso" />
                    <input value={form.descripcion} onChange={(e) => handleChange("descripcion", e.target.value)} placeholder="Descripción" />
                    <input value={form.instructor} onChange={(e) => handleChange("instructor", e.target.value)} placeholder="Instructor" />
                    <input value={form.cupos} onChange={(e) => handleChange("cupos", e.target.value)} placeholder="Cupos" type="number" />
                    <select value={form.modalidad} onChange={(e) => handleChange("modalidad", e.target.value)}>
                      <option value="">Seleccionar modalidad</option>
                      <option value="presencial">Presencial</option>
                      <option value="virtual">Virtual</option>
                      <option value="hibrida">Híbrida</option>
                    </select>
                    <div className="actions">
                      <button onClick={saveEdit} disabled={savingId === cid} className="btn-save">{savingId === cid ? "Guardando..." : "Guardar"}</button>
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
                    <span><strong>ID:</strong> {cid}</span>
                    <span><strong>Curso:</strong> {course?.nombre_curso ?? "-"}</span>
                    <span><strong>Instructor:</strong> {course?.instructor ?? "-"}</span>
                    <span><strong>Cupos:</strong> {course?.cupos ?? "-"}</span>
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