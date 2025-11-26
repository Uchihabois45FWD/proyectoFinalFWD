import "../styles/Hero.css"
import { useNavigate } from "react-router-dom"

export default function Hero() {
    const navigate = useNavigate()

    return (
        <header className="hero-section">
            <h1>Bienvenidos al Centro Cívico La Capri</h1>
            <p>
                Fortaleciendo nuestra comunidad a través de la educación 
                y la participación ciudadana.
            </p>

            <button 
                onClick={() => navigate("/cursos")} 
                className="hero-button"
            >
                Explorar Cursos
            </button>
        </header>
    )
}
