import React, { useState } from "react";
import { deleteData } from "../../services/fetch";

const idFromUser = (user) => (user?.id_usuario ?? user?.id ?? user?.pk ?? "");

export default function ListaUsuarios({ users = [], onSaveUser, onDeleteUser }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const startEdit = (user) => {
    setEditingId(idFromUser(user));
    setForm({
      username: user?.username ?? "",
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      num_telefono: user?.num_telefono ?? "",
      direccion: user?.direccion ?? "",
      rol: user?.rol ?? ""
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
      await onSaveUser(editingId, form);
      cancelEdit();
    } catch (err) {
      console.error("Error saving user (child):", err);
      alert("Error al guardar usuario. Revisa la consola.");
    } finally {
      setSavingId(null);
    }
  };

  const askDelete = (user) => {
    const id = idFromUser(user);
    if (!id) return;
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = async (user) => {
    const id = idFromUser(user);
    if (!id) return;
    setDeletingId(id);
    try {
      const res = await deleteData(`api/eliminar-usuario/${id}`);
      // Manejo seguro: puede ser null o {success:true}
      console.log("delete res:", res || { success: true });
      onDeleteUser(id);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Error deleting user (child):", err);
      alert("Error al eliminar usuario. Revisa la consola.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="section">
      <h2>Usuarios</h2>
      <div className="list">
        {users.length === 0 ? (
          <p>No hay usuarios para mostrar.</p>
        ) : (
          users.map((user) => {
            const uid = idFromUser(user);
            const editing = String(editingId) === String(uid);
            const confirming = String(confirmDeleteId) === String(uid);
            return (
              <div className="list-item" key={uid || user.email || Math.random()}>
                {editing ? (
                  <div className="edit-row">
                    <input value={form.username} onChange={(e) => handleChange("username", e.target.value)} placeholder="Usuario" />
                    <input value={form.first_name} onChange={(e) => handleChange("first_name", e.target.value)} placeholder="Nombre" />
                    <input value={form.last_name} onChange={(e) => handleChange("last_name", e.target.value)} placeholder="Apellido" />
                    <input value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Email" />
                    <input value={form.num_telefono} onChange={(e) => handleChange("num_telefono", e.target.value)} placeholder="Teléfono" />
                    <input value={form.direccion} onChange={(e) => handleChange("direccion", e.target.value)} placeholder="Dirección" />
                    <select value={form.rol} onChange={(e) => handleChange("rol", e.target.value)}>
                      <option value="">Seleccionar rol</option>
                      <option value="usuario">Usuario</option>
                      <option value="instructor">Instructor</option>
                      <option value="administrador">Administrador</option>
                    </select>
                    <div className="actions">
                      <button onClick={saveEdit} disabled={savingId === uid} className="btn-save">
                        {savingId === uid ? "Guardando..." : "Guardar"}
                      </button>
                      <button onClick={cancelEdit} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : confirming ? (
                  <div className="confirm-delete">
                    <div className="confirm-text">
                      <strong>¿Eliminar {user?.username || "este usuario"}?</strong>
                      <div>
                        <small>Esta acción eliminará los datos del usuario permanentemente.</small>
                      </div>
                    </div>
                    <div className="confirm-actions">
                      <button onClick={() => confirmDelete(user)} className="btn-delete" disabled={deletingId === uid}>
                        {deletingId === uid ? "Eliminando..." : "Confirmar"}
                      </button>
                      <button onClick={cancelDelete} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="view-row">
                    <span><strong>ID:</strong> {uid}</span>
                    <span><strong>Usuario:</strong> {user?.username ?? "-"}</span>
                    <span><strong>Email:</strong> {user?.email ?? "-"}</span>
                    <span><strong>Rol:</strong> {user?.rol ?? "-"}</span>
                    <div className="actions">
                      <button onClick={() => startEdit(user)} className="btn-edit">Editar</button>
                      <button onClick={() => askDelete(user)} className="btn-delete" disabled={deletingId === uid}>
                        {deletingId === uid ? "Eliminando..." : "Eliminar"}
                      </button>
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
