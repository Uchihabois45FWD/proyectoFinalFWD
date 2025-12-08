import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import Inicio from "../pages/Inicio"
import Registro from "../pages/Registro"
import PaginaInicio from "../pages/PaginaInicio"
import Cursos from "../pages/Cursos"
import Eventos from "../pages/Eventos"
import Noticias from "../pages/Noticias"
import PerfilPage from "../pages/Perfil"
import CursoDetalle from "../pages/CursoDetalle"
import EventosDetalle from "../pages/EventosDetalle"
import AdminDashboard from "../pages/AdminDashboard"
import NoticiasDetalle from "../pages/NoticiasDetalle";

const ProtectedRoute = ({ children }) => {
    const userRole = localStorage.getItem("user_role"); 

    if (userRole === "administrador") {
        return children;
    } else {
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
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/noticias" element={<Noticias/>}/>
                <Route path="/perfil" element={<PerfilPage/>}/>
                <Route path="/curso/:id" element={<CursoDetalle />} />
                <Route path="/evento/:id" element={<EventosDetalle />} />
                <Route path="/noticias/:id" element={<NoticiasDetalle />} />
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
