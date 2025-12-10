import "../../styles/CursosDestacados.css"
import { useState } from "react";
export default function EventosDestacados({
  titulo = "Evento",
  descripcion = "Descripción",
  fecha = "2024-01-01",
  hora = "10:00",
  lugar = "Lugar",
  organizador = "Organizador",
  destacado = false,
  onToggleDestacado,
  admin
}) {
  return (
    <div className="curso-card" data-destacado={destacado}>
      <div className="curso-icon"></div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>

      <div className="cont-datos">
        <p className="dias-curso">Fecha: {fecha}</p>
        <br />
        <p className="dias-curso">Hora: {hora}</p>
        <p className="dias-curso">Lugar: {lugar}</p>
      </div>
      <p className="dias-curso">Organizador: {organizador}</p>
      {(admin == "organizador" || admin == "admin") && (
        <>
          {onToggleDestacado && (
            <button type="button" onClick={onToggleDestacado}>
              {destacado ? "Quitar destacado" : "Destacar"}
            </button>
          )}
        </>
      )}

    </div>
  );
}
