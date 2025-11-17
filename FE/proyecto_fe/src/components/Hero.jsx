import "../styles/Hero.css"
export default function Hero() {
    return (
        <header className="hero-section">
            <h1>Bienvenidos al Centro Cívico La Capri</h1>
            <p>
                Fortaleciendo nuestra comunidad a través de la educación 
                y la participación ciudadana.
            </p>

            <button href="/cursos" className="hero-button">
                Explorar Cursos
            </button>
        </header>
    );
}
