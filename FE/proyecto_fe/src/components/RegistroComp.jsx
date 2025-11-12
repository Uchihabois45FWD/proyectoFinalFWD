import { useState } from "react";
import "../style/registro.css"

export default function RegistroComp() {
 const [username,setUsername] = useState("")
 const [data, setData] = useState({
   
  });

  const [ver, setVer] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
              name="nombre"
              placeholder="Nombre"
              value={data.nombre}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={data.apellidos}
              
            />
          </div>

          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={data.correo}
            onChange={onChange}
          />

          <input
            type="text"
            name="tel"
            placeholder="Teléfono"
            value={data.tel}
            onChange={onChange}
          />

          <input
            type="text"
            name="cedula"
            placeholder="Cédula de Identidad"
            value={data.cedula}
            onChange={onChange}
          />

          <div className="fila">
            <input
              type={ver ? "text" : "password"}
              name="pass"
              placeholder="Contraseña"
              value={data.pass}
              onChange={onChange}
            />
            <input
              type={ver ? "text" : "password"}
              name="pass2"
              placeholder="Confirmar Contraseña"
              value={data.pass2}
              onChange={onChange}
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
            ¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}
