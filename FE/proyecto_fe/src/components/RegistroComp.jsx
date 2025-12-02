// ...existing code...
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registro.css";
import { postData } from "../services/fetch";

export default function RegistroComp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [rol, setRol] = useState("usuario");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [ver, setVer] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);

    const validarCampos = () => {
        if (
            !username.trim() ||
            !nombre.trim() ||
            !apellidos.trim() ||
            !correo.trim() ||
            !direccion.trim() ||
            !fechaNacimiento.trim() ||
            !rol.trim() ||
            !telefono.trim() ||
            !pass.trim()
        ) {
            alert("Llene todos los campos");
            return false;
        }
        if (!termsAccepted) {
            alert("Debes aceptar los términos.");
            return false;
        }
        if (pass !== pass2) {
            alert("Las contraseñas no coinciden");
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validarCampos()) return;

        const payload = {
            username: username.trim(),
            first_name: nombre.trim(),
            last_name: apellidos.trim(),
            email: correo.trim(),
            direccion: direccion.trim(),
            fecha_nacimiento: fechaNacimiento,
            rol: rol,
            num_telefono: telefono.trim(),
            password: pass,
        };

        setSubmitting(true);
        try {
            const res = await postData("crear-usuario/", payload);
            console.log("Registro response:", res);
            alert("Cuenta creada correctamente. Inicia sesión.");
            navigate("/"); // ajustar ruta si es necesario
        } catch (err) {
            console.error("Error registro:", err, err.response ?? err.message);
            // err.response suele venir del fetch wrapper y contener los errores del serializer
            const resp = err.response || {};
            // normalizar formato: si es objeto de listas, dejar como está
            setErrors(resp);

            // construir mensaje general para alert
            let mensaje = "";
            if (typeof resp === "string") mensaje = resp;
            else if (resp.detail) mensaje = resp.detail;
            else {
                // concatenar mensajes de campos
                mensaje = Object.entries(resp)
                    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
                    .join(" | ");
            }
            alert(mensaje || "Error al crear cuenta");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="registro-bg">
            <div className="registro-card">
                <h2>Crear Cuenta</h2>
                <p>Únete a nuestra comunidad educativa</p>

                <form onSubmit={onSubmit} noValidate>
                    <div className="fila">
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <div className="field-error">{Array.isArray(errors.username) ? errors.username.join(", ") : errors.username}</div>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            {errors.first_name && <div className="field-error">{Array.isArray(errors.first_name) ? errors.first_name.join(", ") : errors.first_name}</div>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                placeholder="Apellidos"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                            {errors.last_name && <div className="field-error">{Array.isArray(errors.last_name) ? errors.last_name.join(", ") : errors.last_name}</div>}
                        </div>
                    </div>

                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errors.email && <div className="field-error">{Array.isArray(errors.email) ? errors.email.join(", ") : errors.email}</div>}

                    <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    {errors.num_telefono && <div className="field-error">{Array.isArray(errors.num_telefono) ? errors.num_telefono.join(", ") : errors.num_telefono}</div>}

                    <input type="text" placeholder="Rol" value={rol} onChange={(e) => setRol(e.target.value)} />
                    {errors.rol && <div className="field-error">{Array.isArray(errors.rol) ? errors.rol.join(", ") : errors.rol}</div>}

                    <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    {errors.direccion && <div className="field-error">{Array.isArray(errors.direccion) ? errors.direccion.join(", ") : errors.direccion}</div>}

                    <input type="date" placeholder="Fecha nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                    {errors.fecha_nacimiento && <div className="field-error">{Array.isArray(errors.fecha_nacimiento) ? errors.fecha_nacimiento.join(", ") : errors.fecha_nacimiento}</div>}

                    <div className="fila">
                        <input type={ver ? "text" : "password"} placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} />
                        <input type={ver ? "text" : "password"} placeholder="Confirmar Contraseña" value={pass2} onChange={(e) => setPass2(e.target.value)} />
                    </div>
                    {errors.password && <div className="field-error">{Array.isArray(errors.password) ? errors.password.join(", ") : errors.password}</div>}

                    <button type="button" onClick={() => setVer(!ver)} className="ver-btn">
                        {ver ? "Ocultar contraseñas" : "Ver contraseñas"}
                    </button>

                    <div className="terminos">
                        <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                        <label htmlFor="terms">
                            Acepto los <a href="#">términos</a> y la <a href="#">política de privacidad</a>
                        </label>
                    </div>

                    {/* Mostrar errores generales */}
                    {errors.non_field_errors && <div className="field-error">{Array.isArray(errors.non_field_errors) ? errors.non_field_errors.join(", ") : errors.non_field_errors}</div>}

                    <button type="submit" className="btn-principal" disabled={submitting}>
                        {submitting ? "Creando..." : "Crear Cuenta"}
                    </button>

                    <p className="login-link">
                        ¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
                    </p>
                </form>
            </div>
        </div>
    );
}