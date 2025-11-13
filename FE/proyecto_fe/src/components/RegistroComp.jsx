import { useState } from "react";
import "../style/registro.css";

export default function RegistroComp() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [ver, setVer] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { nombre, apellidos, correo, telefono, cedula, pass, pass2 };
    console.log(data);
  };

  return (
    <div className="registro-bg">
      <header className="registro-header">
        <h1>Centro Cívico La Capri</h1>
        <div className="registro-nav">
          <button className="link">Iniciar Sesión</button>
          <button className="btn-sec">Registro</button>
        </div>
      </header>   

      <div className="registro-card">
        <h2>Crear Cuenta</h2>
        <p>Únete a nuestra comunidad educativa</p>

        <form onSubmit={onSubmit}>
          <div className="fila">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <input
            type="text"
            placeholder="Cédula de Identidad"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />

          <div className="fila">
            <input
              type={ver ? "text" : "password"}
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              type={ver ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => setVer(!ver)}
            className="ver-btn"
          >
            {ver ? "Ocultar contraseñas" : "Ver contraseñas"}
          </button>

          <div className="terminos">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Acepto los <a href="#">términos</a> y la{" "}
              <a href="#">política de privacidad</a>
            </label>
          </div>

          <button type="submit" className="btn-principal">
            Crear Cuenta
          </button>

          <p className="login-link">
            ¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}