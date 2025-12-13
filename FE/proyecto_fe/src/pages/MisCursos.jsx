import { useState,useEffect } from "react";
import { getData } from "../services/fetch";
const MisCursos = () => {
    const [inscripciones, setInscripciones] = useState([]);

    useEffect(() => {
        const fetchInscripciones = async () => {
            try {
                const data = await getData('crear-inscripcion/');
                setInscripciones(data);
            } catch (error) {
                console.error("Error al cargar inscripciones:", error);
            }
        };
        fetchInscripciones();
    }, []);
    return (
        <div>
            <h1>Mis Cursos</h1>
            {inscripciones.length === 0 ? (
                <p>No estás inscrito en ningún curso.</p>
            ) : (
                <ul>
                    {inscripciones.map((inscripcion) => (
                        <li key={inscripcion.id}>
                            Curso: {inscripcion.curso?.nombre_curso} - Fecha de Inscripción: {inscripcion.fecha_inscripcion}
                        </li>
                    ))}
                </ul>
            )}  
            
        </div>
    );
};

export default MisCursos;