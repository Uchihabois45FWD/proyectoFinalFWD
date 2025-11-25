import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import Inicio from "../pages/Inicio"
import Registro from "../pages/Registro"
import PaginaInicio from "../pages/PaginaInicio"
import Cursos from "../pages/Cursos"
import Noticias from "../pages/Noticias"
import PerfilPage from "../pages/Perfil"
import CursoDetalle from "../pages/CursoDetalle"
import AdminDashboard from "../pages/AdminDashboard"

const ProtectedRoute = ({ children }) => {
    // Check user role stored in localStorage or fetch from API
    const userRole = localStorage.getItem("user_role"); // Assumed to be set on login

    if (userRole === "administrador") {
        return children;
    } else {
        // Redirect non-admin users to home page or other page
        return <Navigate to="/inicio" replace />;
    }
};

const Routing = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/registro" element={<Registro/>}/>
                <Route path="/inicio" element={<PaginaInicio/>}/>
                <Route path="/cursos" element={<Cursos />} />
                <Route path="/noticias" element={<Noticias/>}/>
                <Route path="/perfil" element={<PerfilPage/>}/>
                <Route path="/curso/:id" element={<CursoDetalle />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }/>
            </Routes>
        </Router>
    )
}
export default Routing
