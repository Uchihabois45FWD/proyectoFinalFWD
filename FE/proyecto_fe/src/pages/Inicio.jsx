import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Inicio = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Correo: ${correo}\nContraseña: ${contrasena}`);
  };

  return (
    <div>
      <Navbar />
      <main>
        <div>
          <h2>
            Iniciar Sesión
          </h2>
          <p>
            Accede a tu cuenta del Centro Cívico
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Correo Electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label>
                Contraseña
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div>
              <input
                type="checkbox"
                checked={recordarme}
                onChange={() => setRecordarme(!recordarme)}
              />
              Recordarme
            </div>

            <button
              type="submit"
            >
              Iniciar Sesión
            </button>

            <p>
              ¿No tienes cuenta?{" "}
              <a href="/register">
                Regístrate aquí
              </a>
            </p>

            <p>
              ¿Olvidaste tu contraseña?
            </p>
          </form>

          <hr/>

          <h3>
            Acceso de Demostración
          </h3>

          <div>
            <button>
              👤 Acceso como Usuario
            </button>
            <button>
              🔑 Acceso como Administrador
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;
