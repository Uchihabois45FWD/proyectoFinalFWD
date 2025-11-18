import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Inicio from "../pages/Inicio"
import Registro from "../pages/Registro"
import PaginaInicio from "../pages/PaginaInicio"
import Noticias from "../pages/Noticias"

const Routing = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/registro" element={<Registro/>}/>
                <Route path="/inicio" element={<PaginaInicio/>}/>
                <Route path="/noticias" element={<Noticias/>}/>
            </Routes>
        </Router>
    )
}
export default Routing