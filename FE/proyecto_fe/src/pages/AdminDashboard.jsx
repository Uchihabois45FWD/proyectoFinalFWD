import React, { useEffect, useState } from "react";
import ListaUsuarios from "../components/Admin/ListaUsuarios.jsx";
import ListaCursos from "../components/Admin/ListaCursos.jsx";
import { getData, patchData, deleteData } from "../services/fetch";
import "../styles/AdminDashboard.css";
import AgregarCursosModal from "../components/Admin/AgregarCursosModal.jsx";
import AgregarEventosModal from "../components/Admin/AgregarEventosModal.jsx";

const idFromUser = (user) => (user?.id_usuario ?? user?.id ?? user?.pk ?? "");
const idFromCourse = (c) => (c?.id_curso ?? c?.id ?? c?.pk ?? "");

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ estudiantes: 0, cursos: 0, instructores: 0 });

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [errorUsers, setErrorUsers] = useState(null);
  const [errorCourses, setErrorCourses] = useState(null);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [verModalCurso, setVerModalCurso] = useState(false);
  const [verModalEventos, setVerModalEventos] = useState(false);

  const [eventos, setEventos] = useState([]);

  const currentUser = {
    name: localStorage.getItem("user_name") || "Administrador",
    role: localStorage.getItem("user_role") || "administrador",
  };

  // Cargar usuarios
  useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true);
        const res = await getData("crear-usuario");
        const userData = Array.isArray(res) ? res : [];
        setUsers(userData);

        const estudiantes = userData.filter(u => u.rol === "usuario" || u.rol === "estudiante").length;
        const instructores = userData.filter(u => u.rol === "instructor").length;

        setStats(prev => ({ ...prev, estudiantes, instructores }));
      } catch {
        setErrorUsers("Error al cargar usuarios");
      } finally {
        setLoadingUsers(false);
      }
    })();

    // Cargar cursos
    (async () => {
      try {
        setLoadingCourses(true);
        const res = await getData("crear-curso");
        const courseData = Array.isArray(res) ? res : [];
        setCourses(courseData);

        setStats(prev => ({ ...prev, cursos: courseData.length }));
      } catch {
        setErrorCourses("Error al cargar cursos");
      } finally {
        setLoadingCourses(false);
      }
    })();
  }, []);

  // Guardar usuario
  const handleSaveUser = async (id, formValues) => {
    try {
      const payload = { id_usuario: Number(id), ...formValues };
      const res = await patchData(payload, "api/actualizar-usuario");

      const updated = res?.usuario ?? { id_usuario: id, ...formValues };

      setUsers(prev =>
        prev.map(u => (String(idFromUser(u)) === String(id) ? { ...u, ...updated } : u))
      );
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(u => String(idFromUser(u)) !== String(id)));
  };

  // Guardar curso
  const handleSaveCourse = async (id, formValues) => {
    try {
      const payload = { id_curso: Number(id), ...formValues };
      const res = await patchData(payload, `api/actualizar-curso/${id}`);

      const updated = res?.curso ?? { id_curso: id, ...formValues };

      setCourses(prev =>
        prev.map(c => (String(idFromCourse(c)) === String(id) ? { ...c, ...updated } : c))
      );
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteData(`api/curso-id/${id}`);
      setCourses(prev => prev.filter(c => String(idFromCourse(c)) !== String(id)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "cursos":
        return (
          <div className="section-content">
            <h2>Gestión de Cursos</h2>
            {loadingCourses ? (
              <p>Cargando cursos...</p>
            ) : (
              <ListaCursos
                courses={courses}
                onSaveCourse={handleSaveCourse}
                onDeleteCourse={handleDeleteCourse}
              />
            )}
          </div>
        );

      case "usuarios":
        return (
          <div className="section-content">
            <h2>Gestión de Usuarios</h2>
            {loadingUsers ? (
              <p>Cargando usuarios...</p>
            ) : (
              <ListaUsuarios
                users={users}
                onSaveUser={handleSaveUser}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </div>
        );

      default:
        return (
          <div className="dashboard-content">
            <h2>Panel de Administración</h2>
            <p>Bienvenido</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-layout">

      {/* HEADER */}
      <header className="admin-header">
        <h1 className="brand">Centro Cívico La Capri</h1>

        <div className="header-right">
          <span className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{currentUser.role}</span>
          </span>

          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="admin-main">

        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">

            <button
              className={`sidebar-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              📊 Dashboard
            </button>

            <button
              className={`sidebar-link ${activeSection === "cursos" ? "active" : ""}`}
              onClick={() => setActiveSection("cursos")}
            >
              📚 Gestión de Cursos
            </button>

            <button
              className={`sidebar-link ${activeSection === "usuarios" ? "active" : ""}`}
              onClick={() => setActiveSection("usuarios")}
            >
              👥 Gestión de Usuarios
            </button>

            {/* Agregar Cursos */}
            <button className="sidebar-link" onClick={() => setVerModalCurso(true)}>
              ➕ Agregar cursos
            </button>

            {/* Agregar Eventos */}
            <button className="sidebar-link" onClick={() => setVerModalEventos(true)}>
              🎉 Agregar eventos
            </button>
          </nav>
        </aside>

        {/* CONTENIDO */}
        <main className="admin-content">{renderContent()}</main>
      </div>

      {/* MODALES */}
      <AgregarCursosModal
        isOpen={verModalCurso}
        onClose={() => setVerModalCurso(false)}
        onSubmit={(newCourse) => {
          setCourses(prev => [...prev, newCourse]);
          setVerModalCurso(false);
        }}
      />

      <AgregarEventosModal
        isOpen={verModalEventos}
        onClose={() => setVerModalEventos(false)}
        onSubmit={(nuevoEvento) => {
          setEventos(prev => [...prev, nuevoEvento]);
          setVerModalEventos(false);
        }}
      />
    </div>
  );
};

export default AdminDashboard;
