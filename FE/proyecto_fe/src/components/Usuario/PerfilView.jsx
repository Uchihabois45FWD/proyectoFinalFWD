import { useState, useEffect } from "react";
import "../../styles/perfil.css";
import { patchData, getData } from "../../services/fetch";

export default function PerfilView({ usuario, onUpdate }) {
  const [editando, setEditando] = useState(false);

  const [formData, setFormData] = useState({
    id_usuario: localStorage.getItem("id_usuario"),
    username: usuario?.username || "",
    email: usuario?.email || "",
    num_telefono: usuario?.num_telefono || "",
    direccion: usuario?.direccion || "",
    imagen_perfil: null
  });

  useEffect(() => {
    setFormData({
      id_usuario: localStorage.getItem("id_usuario"),
      username: usuario?.username || "",
      email: usuario?.email || "",
      num_telefono: usuario?.num_telefono || "",
      direccion: usuario?.direccion || "",
      imagen_perfil: null
    });
  }, [usuario]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imagen_perfil: file
    }));
  }

  async function actualizarUsuario() {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id_usuario", formData.id_usuario);
      if (formData.username) formDataToSend.append("username", formData.username);
      if (formData.email) formDataToSend.append("email", formData.email);
      if (formData.num_telefono) formDataToSend.append("num_telefono", formData.num_telefono);
      if (formData.direccion) formDataToSend.append("direccion", formData.direccion);
      if (formData.imagen_perfil) formDataToSend.append("imagen_perfil", formData.imagen_perfil);

      // Usa un patchData especial para FormData
      const peticion = await fetch("http://localhost:8000/api/actualizar-usuario/", {
        method: "PATCH",
        body: formDataToSend
      }).then(res => res.json());

      console.log("Usuario actualizado:", peticion);

      if (peticion.mensaje === "Usuario actualizado correctamente.") {
        // Refetch user data to get updated image URL
        try {
          const updatedUserData = await getData(`usuario-id/${formData.id_usuario}/`);
          onUpdate(updatedUserData);
        } catch (fetchErr) {
          console.error("Error refetching user data:", fetchErr);
          // Fallback: just update with current form data
          onUpdate({ ...usuario, ...formData });
        }
      }
      setEditando(false);
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      alert("Error al actualizar usuario. Revisa la consola.");
    }
  }

  return (
    <div className="perfil-view">
      {usuario?.imagen_perfil ? (
        <img
          src={`http://localhost:8000${usuario.imagen_perfil}`}
          alt="Foto de perfil"
          className="foto-perfil"
        />
      ) : (
        <div className="foto-perfil-placeholder">
          <span>Sin foto de perfil</span>
        </div>
      )}
      <h2>{usuario?.username}</h2>
      <p><strong>Correo:</strong> {usuario?.email}</p>
      <p><strong>Teléfono:</strong> {usuario?.num_telefono}</p>
      <p><strong>Dirección:</strong> {usuario?.direccion}</p>

      <button className="btn-editar" onClick={() => setEditando(!editando)}>
        Editar perfil
      </button>

      {editando && (
        <div className="perfil-edit-container">
          <input
            name="username"
            onChange={handleChange}
            type="text"
            value={formData.username}
            placeholder="Editar nombre de usuario"
          />
          <input
            name="email"
            onChange={handleChange}
            type="text"
            value={formData.email}
            placeholder="Editar correo"
          />
          <input
            name="num_telefono"
            onChange={handleChange}
            type="text"
            value={formData.num_telefono}
            placeholder="Editar teléfono"
          />
          <input
            name="direccion"
            onChange={handleChange}
            type="text"
            value={formData.direccion}
            placeholder="Editar dirección"
          />
          <input
            name="imagen_perfil"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
          />
          <button className="btn-guardar-cambios" onClick={actualizarUsuario}>
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
}
