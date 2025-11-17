import "../styles/CursosDestacados.css"

export default function CursosDestacados({titulo="Emprendimiento",descripcion="Descripcion",primer_dia="Lunes",ultimo_dia="Viernes",cupos="20",inscructor="Pepe Viyuela"}) {
    return (
                <div className="curso-card">
                    <div className="curso-icon"></div>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>

                    <div className="cont-datos">
                    <p className="dias-curso">{primer_dia} a {ultimo_dia}</p>
                    <br />
                    <p className="dias-curso">{cupos} cupos</p>
                    </div>
                    <p className="dias-curso">{inscructor}</p>
                </div>
    );
}
