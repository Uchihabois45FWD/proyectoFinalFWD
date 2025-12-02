import React, { useEffect, useState } from "react";
import Navbar from "../components/Global/Navbar";
import ListaUsuarios from "../components/Admin/ListaUsuarios.jsx";
import ListaCursos from "../components/Admin/ListaCursos.jsx";
import { getData, patchData, deleteData } from "../services/fetch";
import "../styles/AdminDashboard.css";

const idFromUser = (user) => (user?.id_usuario ?? user?.id ?? user?.pk ?? "");
const idFromCourse = (c) => (c?.id_curso ?? c?.id ?? c?.pk ?? "");

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true); 
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorCourses, setErrorCourses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true);
        const res = await getData("crear-usuario");
        setUsers(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error loading users:", err);
        setErrorUsers("Error al cargar usuarios");
      } finally {
        setLoadingUsers(false);
      }
    })();

    (async () => {
      try {
        setLoadingCourses(true);
        const res = await getData("crear-curso");
        setCourses(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error loading courses:", err);
        setErrorCourses("Error al cargar cursos");
      } finally {
        setLoadingCourses(false);
      }
    })();
  }, []);

  // Save user: do API patch here and update state
  const handleSaveUser = async (id, formValues) => {
    try {
      const payload = { id_usuario: Number(id), ...formValues };
      const res = await patchData(payload, "api/actualizar-usuario");
      const updated = (res && (res.id_usuario || res.id || res.pk)) ? res : { id_usuario: id, ...formValues };
      setUsers(prev => prev.map(u => (String(idFromUser(u)) === String(id) ? { ...u, ...updated } : u)));
      return updated;
    } catch (err) {
      console.error("handleSaveUser error:", err);
      throw err;
    }
  };

  const handleDeleteUser = (id) => {
    // el propio hijo ya hizo la llamada DELETE; aquí solo quitamos del estado
    setUsers(prev => prev.filter(u => String(idFromUser(u)) !== String(id)));
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteData(`api/curso-id/${id}`);
      setCourses(prev => prev.filter(c => String(idFromCourse(c)) !== String(id)));
    } catch (err) {
      console.error("handleDeleteCourse error:", err);
      throw err;
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1>Administrador - Panel de Control</h1>

        {loadingUsers ? <p>Cargando usuarios...</p> : errorUsers ? <p>{errorUsers}</p> : (
          <ListaUsuarios users={users} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} />
        )}

        {loadingCourses ? <p>Cargando cursos...</p> : errorCourses ? <p>{errorCourses}</p> : (
          <ListaCursos courses={courses} onDeleteCourse={handleDeleteCourse} />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
