import { useState, useEffect, useCallback } from "react";
import { getData, deleteData } from "../services/fetch";
import "../styles/miscursos.css";

const KEY_INS = "inscripciones"; // copia de servidor
const KEY_REMOVED = "inscripciones_eliminadas"; // ids que el usuario removió localmente

const MisCursos = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  const leerRemoved = () => {
    try {
      const raw = localStorage.getItem(KEY_REMOVED);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const guardarRemoved = (arr) => {
    try { localStorage.setItem(KEY_REMOVED, JSON.stringify(arr)); } catch {}
  };

  const guardarIns = (arr) => {
    try { localStorage.setItem(KEY_INS, JSON.stringify(arr)); } catch {}
  };

  const fetchInscripciones = useCallback(async () => {
    setCargando(true);
    try {
      const data = await getData("crear-inscripcion/");
      const lista = Array.isArray(data) ? data : [];
      // filtrar inscripciones que el usuario eliminó localmente
      const removed = leerRemoved().map(String);
      const filtrada = lista.filter(i => !removed.includes(String(i.id ?? i.pk ?? i.id_inscripcion)));
      setInscripciones(filtrada);
      guardarIns(filtrada);
    } catch (err) {
      console.error("Error al obtener inscripciones:", err);
      // fallback: cargar desde localStorage (si existe)
      try {
        const raw = localStorage.getItem(KEY_INS);
        const lista = raw ? JSON.parse(raw) : [];
        const removed = leerRemoved().map(String);
        setInscripciones(lista.filter(i => !removed.includes(String(i.id ?? i.pk ?? i.id_inscripcion))));
      } catch (e) {
        console.error("Error fallback localStorage:", e);
        setInscripciones([]);
      }
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { fetchInscripciones(); }, [fetchInscripciones]);

  const formatoFecha = (s) => {
    try { return new Date(s).toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" }); }
    catch { return s; }
  };

  const eliminarInscripcion = async (inscripcion) => {
    const confirm = window.confirm("¿Seguro que deseas salir del curso?");
    if (!confirm) return;

    const idVal = inscripcion.id ?? inscripcion.pk ?? inscripcion.id_inscripcion ?? null;
    try {
      // DELETE usando el endpoint correcto para eliminar inscripciones
      const ruta = `api/eliminar-inscripcion/${idVal}`;
      await deleteData(ruta);

      // si llegó aquí sin lanzar -> éxito. recargar lista desde servidor.
      await fetchInscripciones();
      return;
    } catch (err) {
      console.warn("DELETE falló o no soportado por servidor:", err);
      // Fallback: eliminar localmente y marcar como removido para que no reaparezca
      const idStr = String(idVal ?? Math.random());
      const nuevas = inscripciones.filter(i => String(i.id ?? i.pk ?? i.id_inscripcion) !== idStr);
      setInscripciones(nuevas);
      guardarIns(nuevas);

      // actualizar lista de removidos
      const removed = leerRemoved();
      if (!removed.includes(idStr)) {
        removed.push(idStr);
        guardarRemoved(removed);
      }

      alert("No se pudo eliminar en el servidor. Se removió localmente para que no vuelva a aparecer.");
    }
  };

  return (
    <div className="mis-cursos-container">
      <h1 className="mis-cursos-titulo">Mis Cursos</h1>

      {cargando ? (
        <p>Cargando inscripciones...</p>
      ) : inscripciones.length === 0 ? (
        <p className="mis-cursos-vacio">No estás inscrito en ningún curso.</p>
      ) : (
        <ul className="mis-cursos-lista">
          {inscripciones.map((inscripcion, idx) => (
            <li key={inscripcion.id ?? inscripcion.pk ?? idx} className="mis-cursos-item">
              <div className="mis-cursos-row">
                <div>
                  <div className="mis-cursos-nombre">
                    Curso: {inscripcion.nombre_curso || inscripcion.curso_nombre || inscripcion.titulo || "Sin nombre"}
                  </div>
                  <div className="mis-cursos-fecha">
                    Fecha de inscripción: {formatoFecha(inscripcion.fecha_inscripcion)}
                  </div>
                </div>

                <div className="mis-cursos-actions">
                  <button
                    className="mis-cursos-eliminar"
                    onClick={() => eliminarInscripcion(inscripcion)}
                  >
                    Salir del curso
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisCursos;
