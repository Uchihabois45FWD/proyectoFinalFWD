import "../styles/CursosDestacados.css"

export default function NoticiasDestacadas({titulo="Noticia", descripcion="Descripción", primer_dia="2023-01-01", ultimo_dia="", cupos="0", inscructor=""}) {
    return (
        <div className="curso-card">
            <div className="curso-icon"></div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <div className="cont-datos">
                <p className="dias-curso">{primer_dia} {ultimo_dia}</p>
                <br />
                <p className="dias-curso">{cupos} cupos</p>
            </div>
            <p className="dias-curso">{inscructor}</p>
        </div>
    );
}
