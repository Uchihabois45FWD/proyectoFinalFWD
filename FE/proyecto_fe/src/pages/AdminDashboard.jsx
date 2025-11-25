import React, { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";

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

  useEffect(() => {
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

    fetchUsers();
    fetchCourses();
  }, []);

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
          <UsersList users={users} />
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
