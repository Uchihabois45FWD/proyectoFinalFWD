import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Inicio from "../pages/Inicio"
import Registro from "../pages/Registro"


const Routing = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/registro" element={<Registro/>}/>
            </Routes>
        </Router>
    )
}
export default Routing