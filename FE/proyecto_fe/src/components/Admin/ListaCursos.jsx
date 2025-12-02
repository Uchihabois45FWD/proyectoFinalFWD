import React, { useState } from "react";

const idFromCourse = (c) => (c?.id_curso ?? c?.id ?? c?.pk ?? "");

export default function ListaCursos({ courses = [], onDeleteCourse }) {
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  const handleDeleteCourse = async (course) => {
    const id = idFromCourse(course);
    if (!id) return;
    if (!window.confirm("¿Eliminar este curso? Esta acción no se puede deshacer.")) return;
    setDeletingCourseId(id);
    try {
      await onDeleteCourse(id);
    } catch (err) {
      console.error("Error deleting course (child):", err);
      alert("Error al eliminar curso. Revisa la consola.");
    } finally {
      setDeletingCourseId(null);
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
            return (
              <div className="list-item" key={cid || course.nombre_curso || Math.random()}>
                <div className="view-row">
                  <span><strong>ID:</strong> {cid}</span>
                  <span><strong>Curso:</strong> {course.nombre_curso}</span>
                  <span><strong>Instructor:</strong> {course.instructor || course.instructor_id || "-"}</span>
                  <span><strong>Cupos:</strong> {course.cupos ?? "-"}</span>
                </div>
                <div className="actions">
                  <button onClick={() => handleDeleteCourse(course)} className="btn-delete" disabled={deletingCourseId === cid}>
                    {deletingCourseId === cid ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}