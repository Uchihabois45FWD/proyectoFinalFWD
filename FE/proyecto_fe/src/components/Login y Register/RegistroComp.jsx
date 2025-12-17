// ...existing code...
import { useState } from "react";
import "../../styles/RegisterForm.css";
import { postData } from "../../services/fetch";
import { useNavigate } from "react-router-dom";

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
    const [clientErrors, setClientErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);

    const validarCampos = () => {
        const missingFields = [];
        const newClientErrors = {};

        if (!username.trim()) missingFields.push("Nombre de usuario");
        if (!nombre.trim()) missingFields.push("Nombre");
        if (!apellidos.trim()) missingFields.push("Apellidos");
        if (!correo.trim()) missingFields.push("Correo Electrónico");
        if (!direccion.trim()) missingFields.push("Dirección");
        if (!fechaNacimiento.trim()) missingFields.push("Fecha de nacimiento");
        if (!rol.trim()) missingFields.push("Rol");
        if (!telefono.trim()) missingFields.push("Teléfono");
        if (!pass.trim()) missingFields.push("Contraseña");

        if (missingFields.length > 0) {
            alert(`Los siguientes campos no se llenaron correctamente o están vacíos: ${missingFields.join(", ")}`);
            return false;
        }
        if (!termsAccepted) {
            alert("Debes aceptar los términos y la política de privacidad.");
            return false;
        }
        if (pass !== pass2) {
            alert("Las contraseñas no coinciden");
            return false;
        }

        // Validaciones específicas
        if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(nombre.trim())) {
            newClientErrors.nombre = "El nombre debe contener solo letras.";
        }
        if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(apellidos.trim())) {
            newClientErrors.apellidos = "El apellido debe contener solo letras.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            newClientErrors.correo = "El correo electrónico no es válido.";
        }
        if (!/^\d+$/.test(telefono.trim())) {
            newClientErrors.telefono = "El teléfono debe contener solo números.";
        }
        if (pass.length < 8) {
            newClientErrors.pass = "La contraseña debe tener al menos 8 caracteres.";
        }

        setClientErrors(newClientErrors);
        return Object.keys(newClientErrors).length === 0;
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
            // Stay on register page
        } catch (err) {
            console.error("Error registro:", err, err.response ?? err.message);
            let resp = {};
            try {
                resp = JSON.parse(err.message);
            } catch {
                resp = err.response || {};
            }
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
        <div className="registro-page">
            <div className="registro-container">
                <div className="registro-card">
                    <h2>Crear Cuenta</h2>
                    <p>Únete a nuestra comunidad educativa</p>

                <form onSubmit={onSubmit} noValidate>
                    <div className="fila">
                        <div style={{ flex: 1 }}>
                            <label>Nombre de usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {(errors.username || clientErrors.username) && <div className="field-error">{Array.isArray(errors.username) ? errors.username.join(", ") : (errors.username || clientErrors.username)}</div>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            {(errors.first_name || clientErrors.nombre) && <div className="field-error">{Array.isArray(errors.first_name) ? errors.first_name.join(", ") : (errors.first_name || clientErrors.nombre)}</div>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label>Apellidos</label>
                            <input
                                type="text"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                            {(errors.last_name || clientErrors.apellidos) && <div className="field-error">{Array.isArray(errors.last_name) ? errors.last_name.join(", ") : (errors.last_name || clientErrors.apellidos)}</div>}
                        </div>
                    </div>

                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    {(errors.email || clientErrors.correo) && <div className="field-error">{Array.isArray(errors.email) ? errors.email.join(", ") : (errors.email || clientErrors.correo)}</div>}

                    <label>Teléfono</label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    {(errors.num_telefono || clientErrors.telefono) && <div className="field-error">{Array.isArray(errors.num_telefono) ? errors.num_telefono.join(", ") : (errors.num_telefono || clientErrors.telefono)}</div>}

                    <label>Rol</label>
                    <input type="text" value={rol} onChange={(e) => setRol(e.target.value)} />
                    {errors.rol && <div className="field-error">{Array.isArray(errors.rol) ? errors.rol.join(", ") : errors.rol}</div>}

                    <label>Dirección</label>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    {errors.direccion && <div className="field-error">{Array.isArray(errors.direccion) ? errors.direccion.join(", ") : errors.direccion}</div>}

                    <label>Fecha de nacimiento</label>
                    <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                    {errors.fecha_nacimiento && <div className="field-error">{Array.isArray(errors.fecha_nacimiento) ? errors.fecha_nacimiento.join(", ") : errors.fecha_nacimiento}</div>}

                    <div className="fila">
                        <div style={{ flex: 1 }}>
                            <label>Contraseña</label>
                            <input type={ver ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Confirmar Contraseña</label>
                            <input type={ver ? "text" : "password"} value={pass2} onChange={(e) => setPass2(e.target.value)} />
                        </div>
                    </div>
                    {(errors.password || clientErrors.pass) && <div className="field-error">{Array.isArray(errors.password) ? errors.password.join(", ") : (errors.password || clientErrors.pass)}</div>}

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
        </div>
    );
}
