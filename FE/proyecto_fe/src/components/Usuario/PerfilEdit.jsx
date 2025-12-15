import { useState } from "react";
import { patchData } from "../../services/fetch";

export default function PerfilEdit({ usuario, guardarCambios, cancelar }) {
  const [formData, setFormData] = useState({
    first_name: usuario.first_name || "",
    email: usuario.email || "",
    num_telefono: usuario.num_telefono || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await patchData("editar-perfil/", formData);
      guardarCambios(result);
      alert("Perfil actualizado con éxito");
    } catch (err) {
      const msg = err.response?.detail || err.message || "Error al actualizar perfil";
      setError(String(msg));
      alert(String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="perfil-edit" onSubmit={enviar}>
      <h2>Editar Perfil</h2>

      {error && <div className="error-message">{error}</div>}

      <label>Nombre</label>
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        disabled={submitting}
      />

      <label>Correo</label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={submitting}
      />

      <label>Teléfono</label>
      <input
        name="num_telefono"
        value={formData.num_telefono}
        onChange={handleChange}
        disabled={submitting}
      />

      <div className="acciones">
        <button type="submit" className="btn-guardar" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" className="btn-cancelar" onClick={cancelar} disabled={submitting}>
          Cancelar
        </button>
      </div>
    </form>
  );
}