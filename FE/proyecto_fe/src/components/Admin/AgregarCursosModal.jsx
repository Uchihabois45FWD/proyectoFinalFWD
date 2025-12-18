import { useState, useEffect } from "react";
import "../../styles/AgregarCursosModal.css";
import { getData, postData } from "../../services/fetch";

export default function AgregarCursosModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  currentUser,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    destacado: false,
    cupos: "",
    modalidad: "presencial",
    primerDia: "lunes",
    ultimoDia: "viernes",
    certificado: false,
    instructor: "",
  });
  const [usuarios,setUsuarios] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else if (!loading && currentUser && currentUser.rol === 'instructor') {
      setFormData(prev => ({ ...prev, instructor: currentUser.id }));
    }
  }, [initialData, currentUser, loading]);

  useEffect(()=>{
    const fetchUsuarios = async()=>{
      const data = await getData('crear-usuario/');
      const instructores = data.filter(usuario => usuario.rol === 'instructor');
      setUsuarios(instructores);
      setLoading(false);
    }
    fetchUsuarios();
  },[])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const submitForm = async(e) => {
    e.preventDefault();
    if (!formData.instructor) {
      alert('Por favor, selecciona un instructor.');
      return;
    }
    const guardarCurso = {
      nombre_curso: formData.nombre,
      descripcion_curso: formData.descripcion,
      fecha_inicio_curso: formData.fechaInicio,
      fecha_fin_curso: formData.fechaFin,
      destacado: formData.destacado,
      limite_cupos: formData.cupos,
      modalidad: formData.modalidad,
      primer_dia: formData.primerDia,
      ultimo_dia: formData.ultimoDia,
      certificado: formData.certificado,
      instructor: formData.instructor,
    }
    try {
      const peticion = await postData('crear-curso/', guardarCurso);
      console.log(peticion);
      onSubmit(formData);
    } catch (error) {
      console.error('Error al crear el curso:', error);
      alert('Error al crear el curso. Revisa la consola para más detalles.');
      // Aún llamar a onSubmit para cerrar el modal, pero pasar null o manejar en consecuencia
      onSubmit(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Barra superior */}
        <div className="modal-topbar">
          {initialData ? "Editar Curso" : "Crear Nuevo Curso"}
        </div>

        {/* Área scrolleable */}
        <div className="modal-scroll-area">
          <form id="cursoForm" onSubmit={submitForm}>

            <div className="modal-grid">

              <div className="col-span-2">
                <label className="modal-label">Nombre del Curso</label>
                <input
                  className="modal-input"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <label className="modal-label">Descripción</label>
                <textarea
                  className="modal-textarea"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="modal-label">Fecha Inicio</label>
                <input
                  type="date"
                  className="modal-input"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="modal-label">Fecha Fin</label>
                <input
                  type="date"
                  className="modal-input"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="modal-label">Límite de Cupos</label>
                <input
                  type="number"
                  className="modal-input"
                  name="cupos"
                  value={formData.cupos}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="modal-label">Modalidad</label>
                <select
                  className="modal-select"
                  name="modalidad"
                  value={formData.modalidad}
                  onChange={handleChange}
                >
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                  <option value="bimodal">Bimodal</option>
                </select>
              </div>

              <div>
                <label className="modal-label">Primer Día</label>
                <select
                  className="modal-select"
                  name="primerDia"
                  value={formData.primerDia}
                  onChange={handleChange}
                >
                  <option>lunes</option>
                  <option>martes</option>
                  <option>miércoles</option>
                  <option>jueves</option>
                  <option>viernes</option>
                </select>
              </div>

              <div>
                <label className="modal-label">Último Día</label>
                <select
                  className="modal-select"
                  name="ultimoDia"
                  value={formData.ultimoDia}
                  onChange={handleChange}
                >
                  <option>lunes</option>
                  <option>martes</option>
                  <option>miércoles</option>
                  <option>jueves</option>
                  <option>viernes</option>
                </select>
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

              <div className="switch-container">
                <label className="modal-label">Certificado</label>
                <input
                  type="checkbox"
                  className="modal-checkbox"
                  name="certificado"
                  checked={formData.certificado}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <label className="modal-label">Instructor</label>
                {loading ? (
                  <p>Loading instructors...</p>
                ) : (
                  <select
                    className="modal-select"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                  >
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.username}
                      </option>
                    ))}
                  </select>
                )}
              </div>

            </div>
          </form>
        </div>

        {/* Acciones */}
        <div className="modal-actions">
          <button type="button" className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button type="submit" form="cursoForm" className="btn-guardar">
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}
