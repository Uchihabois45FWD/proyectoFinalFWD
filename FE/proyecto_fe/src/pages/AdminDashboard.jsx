import React, { useEffect, useState } from "react";
import ListaUsuarios from "../components/Admin/ListaUsuarios.jsx";
import ListaCursos from "../components/Admin/ListaCursos.jsx";
import ListaCategorias from "../components/Admin/ListaCategorias.jsx";
import { getData, patchData, deleteData, postData } from "../services/fetch";
import "../styles/AdminDashboard.css";
import AgregarCursosModal from "../components/Admin/AgregarCursosModal.jsx";
import AgregarEventosModal from "../components/Admin/AgregarEventosModal.jsx";
import AgregarCategoriaModal from "../components/Admin/AgregarCategoriaModal.jsx";
import Navbar from "../components/Global/Navbar.jsx";
import AgregarNoticiasModal from "../components/Admin/AgregarNoticiasModal.jsx";

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
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Estados para modales
  const [verModalCurso, setVerModalCurso] = useState(false);
  const [verModalEventos, setVerModalEventos] = useState(false);
  const [verModalNoticias, setVerModalNoticias] = useState(false);
  const [verModalCategoria, setVerModalCategoria] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [errorCategorias, setErrorCategorias] = useState(null);

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

    // Cargar categorías
    (async () => {
      try {
        setLoadingCategorias(true);
        const res = await getData("crear-categoria");
        const categoriaData = Array.isArray(res) ? res : [];
        setCategorias(categoriaData);
      } catch {
        setErrorCategorias("Error al cargar categorías");
      } finally {
        setLoadingCategorias(false);
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

  // Guardar categoría
  const handleSaveCategoria = async (id, formValues) => {
    try {
      const payload = { id: Number(id), ...formValues };
      const res = await patchData(payload, `api/categoria/${id}`);

      const updated = res?.categoria ?? { id: id, ...formValues };

      setCategorias(prev =>
        prev.map(c => (String(c.id) === String(id) ? { ...c, ...updated } : c))
      );
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await deleteData(`api/categoria/${id}`);
      setCategorias(prev => prev.filter(c => String(c.id) !== String(id)));
    } catch (err) {
      console.error(err);
    }
  };

  // Crear categoría
  const handleCreateCategoria = async (formValues) => {
    try {
      const res = await postData("crear-categoria/", formValues);
      const nuevaCategoria = res;
      setCategorias(prev => [...prev, nuevaCategoria]);
      setVerModalCategoria(false);
      return nuevaCategoria;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h2>Panel de Administración</h2>
              <p>Bienvenido al sistema de gestión del Centro Cívico La Capri</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👨‍🎓</div>
                <div className="stat-content">
                  <h3>{stats.estudiantes}</h3>
                  <p>Estudiantes Activos</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📖</div>
                <div className="stat-content">
                  <h3>{stats.cursos}</h3>
                  <p>Cursos Disponibles</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👨‍🏫</div>
                <div className="stat-content">
                  <h3>{stats.instructores}</h3>
                  <p>Instructores</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Actividad Reciente</h3>
              <div className="activity-list">
                {courses.slice(0, 2).map((course, index) => (
                  <div key={`course-${course.id_curso || index}`} className="activity-item">
                    <span className="activity-icon">📝</span>
                    <div className="activity-content">
                      <p>Nuevo curso "{course.nombre || course.titulo}" disponible</p>
                      <small>Hace {Math.floor(Math.random() * 24) + 1} horas</small>
                    </div>
                  </div>
                ))}
                {users.slice(0, 2).map((user, index) => (
                  <div key={`user-${user.id_usuario || index}`} className="activity-item">
                    <span className="activity-icon">👤</span>
                    <div className="activity-content">
                      <p>Usuario "{user.nombre || user.username}" se registró</p>
                      <small>Hace {Math.floor(Math.random() * 48) + 1} horas</small>
                    </div>
                  </div>
                ))}
                <div className="activity-item">
                  <span className="activity-icon">📊</span>
                  <div className="activity-content">
                    <p>Estadísticas del sistema actualizadas</p>
                    <small>Hace 1 día</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

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

      case "categorias":
        return (
          <div className="section-content">
            <h2>Gestión de Categorías</h2>
            {loadingCategorias ? (
              <p>Cargando categorías...</p>
            ) : (
              <ListaCategorias
                categorias={categorias}
                onSaveCategoria={handleSaveCategoria}
                onDeleteCategoria={handleDeleteCategoria}
                onCreateCategoria={() => setVerModalCategoria(true)}
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

      <div className="admin-main">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
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
            <button className="sidebar-link" onClick={() => setVerModalNoticias(true)}>
              📰 Agregar noticias
            <button>

            </button>
              className={`sidebar-link ${activeSection === "categorias" ? "active" : ""}`}
              onClick={() => setActiveSection("categorias")}
              🏷️ Gestión de Categorías
            </button>


          </nav>
        </aside>

        {/* Toggle Button on Sidebar Edge */}
        <button onClick={() => setSidebarVisible(!sidebarVisible)} className="sidebar-toggle-btn">
          {sidebarVisible ? '◀' : '▶'}
        </button>

        {/* Main Content */}
        <main className={`admin-content ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
          {renderContent()}
        </main>
      </div>

      {/* Modales */}
      <AgregarCategoriaModal
        isOpen={verModalCategoria}
        onClose={() => setVerModalCategoria(false)}
        onSubmit={handleCreateCategoria}
      />

      <AgregarEventosModal
        isOpen={verModalEventos}
        onClose={() => setVerModalEventos(false)}
        onSubmit={async (nuevoEvento) => {
          try {
            await postData("crear-evento", nuevoEvento);
            setEventos(prev => [...prev, nuevoEvento]);
            setVerModalEventos(false);
          } catch (error) {
            console.error("Error al crear evento:", error);
            alert("Error al crear el evento. Por favor, inténtalo de nuevo.");
          }
        }}
      />

      <AgregarNoticiasModal 
        isOpen={verModalNoticias}
        onClose={() => setVerModalNoticias(false)}
        onSubmit={() => {
          setVerModalNoticias(false);
        }}
      />





    </div>
  );
};

export default AdminDashboard;
