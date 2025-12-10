import React, { useEffect, useState } from "react";
import ListaUsuarios from "../components/Admin/ListaUsuarios.jsx";
import ListaCursos from "../components/Admin/ListaCursos.jsx";
import { getData, patchData, deleteData } from "../services/fetch";
import Navbar from "../components/Global/Navbar";
import "../styles/AdminDashboard.css";

const idFromUser = (user) => (user?.id_usuario ?? user?.id ?? user?.pk ?? "");
const idFromCourse = (c) => (c?.id_curso ?? c?.id ?? c?.pk ?? "");

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    estudiantes: 0,
    cursos: 0,
    instructores: 0
  });
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorCourses, setErrorCourses] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true);
        const res = await getData("crear-usuario");
        const userData = Array.isArray(res) ? res : [];
        setUsers(userData);

        // Calculate stats from user data
        const estudiantes = userData.filter(user =>
          user.rol === 'usuario' || user.rol === 'estudiante'
        ).length;
        const instructores = userData.filter(user =>
          user.rol === 'instructor' || user.rol === 'instructores'
        ).length;

        setStats(prev => ({ ...prev, estudiantes, instructores }));
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
        const courseData = Array.isArray(res) ? res : [];
        setCourses(courseData);

        // Update courses count
        setStats(prev => ({ ...prev, cursos: courseData.length }));
      } catch (err) {
        console.error("Error loading courses:", err);
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

      // Usar los datos retornados por el backend si están disponibles
      const updated = (res && res.usuario)
        ? res.usuario
        : { id_usuario: id, ...formValues };

      setUsers(prev => prev.map(u => (String(idFromUser(u)) === String(id) ? { ...u, ...updated } : u)));
      return updated;
    } catch (err) {
      console.error("handleSaveUser error:", err);
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

      // Usar los datos retornados por el backend si están disponibles
      const updated = (res && res.curso)
        ? res.curso
        : { id_curso: id, ...formValues };

      setCourses(prev =>
        prev.map(c => (String(idFromCourse(c)) === String(id) ? { ...c, ...updated } : c))
      );
      return updated;
    } catch (err) {
      console.error("handleSaveCourse error:", err);
      throw err;
    }
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
            {loadingCourses ? <p>Cargando cursos...</p> : errorCourses ? <p>{errorCourses}</p> : (
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
            {loadingUsers ? <p>Cargando usuarios...</p> : errorUsers ? <p>{errorUsers}</p> : (
              <ListaUsuarios users={users} onSaveUser={handleSaveUser} onDeleteUser={handleDeleteUser} />
            )}
          </div>
        );

      case "publicaciones":
        return (
          <div className="section-content">
            <h2>Publicaciones</h2>
            <div className="coming-soon">
              <h3>🚧 Próximamente</h3>
              <p>Esta sección estará disponible en futuras actualizaciones.</p>
            </div>
          </div>
        );

      case "reportes":
        return (
          <div className="section-content">
            <h2>Reportes</h2>
            <div className="coming-soon">
              <h3>🚧 Próximamente</h3>
              <p>Esta sección estará disponible en futuras actualizaciones.</p>
            </div>
          </div>
        );

      case "configuracion":
        return (
          <div className="section-content">
            <h2>Configuración</h2>
            <div className="coming-soon">
              <h3>🚧 Próximamente</h3>
              <p>Esta sección estará disponible en futuras actualizaciones.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <Navbar />

      <div className="admin-main">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-link ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <span className="sidebar-icon">📊</span>
              Dashboard
            </button>

            <button
              className={`sidebar-link ${activeSection === 'cursos' ? 'active' : ''}`}
              onClick={() => setActiveSection('cursos')}
            >
              <span className="sidebar-icon">📚</span>
              Gestión de Cursos
            </button>

            <button
              className={`sidebar-link ${activeSection === 'usuarios' ? 'active' : ''}`}
              onClick={() => setActiveSection('usuarios')}
            >
              <span className="sidebar-icon">👥</span>
              Gestión de Usuarios
            </button>

            <button
              className={`sidebar-link ${activeSection === 'publicaciones' ? 'active' : ''}`}
              onClick={() => setActiveSection('publicaciones')}
            >
              <span className="sidebar-icon">📝</span>
              Publicaciones
            </button>

            <button
              className={`sidebar-link ${activeSection === 'reportes' ? 'active' : ''}`}
              onClick={() => setActiveSection('reportes')}
            >
              <span className="sidebar-icon">📈</span>
              Reportes
            </button>

            <button
              className={`sidebar-link ${activeSection === 'configuracion' ? 'active' : ''}`}
              onClick={() => setActiveSection('configuracion')}
            >
              <span className="sidebar-icon">⚙️</span>
              Configuración
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
    </div>
  );
};

export default AdminDashboard;
