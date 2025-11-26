import React, { useEffect, useState } from "react";
import { getData, putData, deleteData } from "../services/fetch";
import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";

const UsersList = ({ users, onUserUpdate, onUserDelete }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    fecha_nacimiento: '',
    num_telefono: '',
    direccion: '',
    rol: ''
  });

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      username: user.username || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      fecha_nacimiento: user.fecha_nacimiento || '',
      num_telefono: user.num_telefono || '',
      direccion: user.direccion || '',
      rol: user.rol || ''
    });
  };

  const handleSave = async () => {
    try {
      await putData(editForm, `api/usuario/${editingUser}/`);
      onUserUpdate();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleFieldChange = async (field, value) => {
    const updatedForm = { ...editForm, [field]: value };
    setEditForm(updatedForm);

    // Auto-save when field loses focus
    try {
      await putData(updatedForm, `api/usuario/${editingUser}/`);
      onUserUpdate();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteData(`api/usuario/${userId}/`);
        onUserDelete();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      fecha_nacimiento: '',
      num_telefono: '',
      direccion: '',
      rol: ''
    });
  };


const UsersList = ({ users }) => {
  return (
    <div className="section">
      <h2>Usuarios</h2>
      <div className="list">
        {users.length === 0 ? (
          <p>No hay usuarios para mostrar.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="list-item">
              {editingUser === user.id ? (
                <div className="edit-form">
                  <div className="form-row">
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                      onBlur={(e) => handleFieldChange('username', e.target.value)}
                      placeholder="Username"
                    />
                    <input
                      type="text"
                      value={editForm.first_name}
                      onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                      onBlur={(e) => handleFieldChange('first_name', e.target.value)}
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      value={editForm.last_name}
                      onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                      onBlur={(e) => handleFieldChange('last_name', e.target.value)}
                      placeholder="Apellido"
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      onBlur={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      type="date"
                      value={editForm.fecha_nacimiento}
                      onChange={(e) => setEditForm({...editForm, fecha_nacimiento: e.target.value})}
                      onBlur={(e) => handleFieldChange('fecha_nacimiento', e.target.value)}
                      placeholder="Fecha de nacimiento"
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      value={editForm.num_telefono}
                      onChange={(e) => setEditForm({...editForm, num_telefono: e.target.value})}
                      onBlur={(e) => handleFieldChange('num_telefono', e.target.value)}
                      placeholder="Teléfono"
                    />
                    <select
                      value={editForm.rol}
                      onChange={(e) => setEditForm({...editForm, rol: e.target.value})}
                      onBlur={(e) => handleFieldChange('rol', e.target.value)}
                    >
                      <option value="">Seleccionar rol</option>
                      <option value="usuario">Usuario</option>
                      <option value="instructor">Instructor</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </div>
                  <textarea
                    value={editForm.direccion}
                    onChange={(e) => setEditForm({...editForm, direccion: e.target.value})}
                    onBlur={(e) => handleFieldChange('direccion', e.target.value)}
                    placeholder="Dirección"
                    rows="3"
                  />
                  <div className="form-actions">
                    <button onClick={handleSave} className="btn-save">Guardar Todo</button>
                    <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <span>Usuario:</span> {user.username} - <span>Email:</span> {user.email} -{" "}
                  <span>Rol:</span> {user.rol}
                  <button onClick={() => handleEdit(user)} className="btn-edit">Editar</button>
                  <button onClick={() => handleDelete(user.id)} className="btn-delete">Eliminar</button>
                </>
              )}
            <div key={user.id} className="list-item" onClick={()=>{
              console.log(user.id)
            }}>
              <span>Usuario:</span> {user.username} - <span>Email:</span> {user.email} -{" "}
              <span>Rol:</span> {user.rol}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CoursesList = ({ courses }) => {
  return (
    <div className="section">
      <h2>Cursos</h2>
      <div className="list">
        {courses.length === 0 ? (
          <p>No hay cursos para mostrar.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="list-item">
              <span>Curso:</span> {course.nombre_curso} - <span>Instructor ID:</span>{" "}
              {course.instructor}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorCourses, setErrorCourses] = useState(null);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await getData("crear-usuario/");
      setUsers(data);
    } catch (error) {
      setErrorUsers("Error al cargar usuarios");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const data = await getData("crear-curso/");
        setCourses(data);
      } catch (error) {
        setErrorCourses("Error al cargar cursos");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const handleUserUpdate = () => {
    fetchUsers();
  };

  const handleUserDelete = () => {
    fetchUsers();
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1>Administrador - Panel de Control</h1>

        {loadingUsers ? (
          <p>Cargando usuarios...</p>
        ) : errorUsers ? (
          <p>{errorUsers}</p>
        ) : (
          <UsersList users={users} onUserUpdate={handleUserUpdate} onUserDelete={handleUserDelete} />
        )}

        {loadingCourses ? (
          <p>Cargando cursos...</p>
        ) : errorCourses ? (
          <p>{errorCourses}</p>
        ) : (
          <CoursesList courses={courses} />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
