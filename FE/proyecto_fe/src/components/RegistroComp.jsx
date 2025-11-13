import { useState } from "react";
import "../style/registro.css";

export default function RegistroComp() {
    const [username, setUsername] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("")
    const [direccion, setDireccion] = useState("")
    const [rol, setRol] = useState("usuario")
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [ver, setVer] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "username": username,
            "first_name": nombre,
            "last_name": apellidos,
            "email": correo,
            "direccion":direccion,
            "fecha_nacimiento":fechaNacimiento,
            "rol":rol,
            "num_telefono": telefono,
            "password": pass
        }
        await postData(data, "crear-usuario/")

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
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
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
                        placeholder="Rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Fecha nacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
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