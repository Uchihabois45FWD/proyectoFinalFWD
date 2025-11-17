import "../styles/CursosDestacados.css"

export default function CursosDestacados({titulo="Emprendimiento",descripcion="Descripcion",primer_dia="Lunes",ultimo_dia="Viernes",cupos="20"}) {
    return (
                <div className="curso-card">
                    <div className="curso-icon"></div>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>

                    <div className="cont-datos">
                    <p className="dias-curso">{primer_dia} a {ultimo_dia}</p>

                    <p className="dias-curso">{cupos} cupos</p>
                    </div>
                </div>
    );
}
