import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import LoginPage from "../pages/LoginPage"


const Routing = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                {/* <Route path="/registro" element={<Inicio/>}/> */}
            </Routes>
        </Router>
    )
}
export default Routing