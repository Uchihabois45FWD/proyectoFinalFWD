import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Inicio from "../pages/Inicio"
import Registro from "../pages/Registro"
import PaginaInicio from "../pages/PaginaInicio"

const Routing = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/registro" element={<Registro/>}/>
                <Route path="/inicio" element={<PaginaInicio/>}/>
            </Routes>
        </Router>
    )
}
export default Routing