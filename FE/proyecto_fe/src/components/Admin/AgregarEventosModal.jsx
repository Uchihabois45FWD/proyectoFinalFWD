import { useState, useEffect } from "react";
import "../../styles/EventoModal.css";
import { getData, postData } from "../../services/fetch";

export default function AgregarEventosModal({ isOpen, onClose, onSubmit, initialData }) {

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "",
        lugar: "",
        categoria: "",
        organizador: "",
        cupos: "",
        imagen: "",
        destacado: false
    });

    const [usuarios, setUsuarios] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        if (initialData) {
            const cleanedData = { ...initialData };
            Object.keys(cleanedData).forEach(key => {
                if (cleanedData[key] === null) {
                    cleanedData[key] = "";
                }
            });
            setFormData(cleanedData);
        }

        const fetchUsuarios = async () => {
            const data = await getData('crear-usuario/');
            setUsuarios(data);
        };

        const fetchCategorias = async () => {
            const data = await getData('crear-categoria/');
            setCategorias(data);
        };

        fetchUsuarios();
        fetchCategorias();
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const peticion = await postData('crear-evento/', formData);
            console.log(peticion);
            if (onSubmit) onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error al crear el evento. Revisa la consola para más detalles.');
            // Still call onSubmit to close the modal, but pass null or handle accordingly
            if (onSubmit) onSubmit(null);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <div className="modal-nav">
                    <h2>{initialData ? "Editar Evento" : "Crear Evento"}</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={submitForm} className="modal-form">
                    <div className="modal-scroll">

                        <div className="modal-grid">

                            <div className="campo campo-full">
                                <label>Título</label>
                                <input
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="campo campo-full">
                                <label>Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="campo">
                                <label>Fecha</label>
                                <input
                                    type="date"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="campo">
                                <label>Hora</label>
                                <input
                                    type="time"
                                    name="hora"
                                    value={formData.hora}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="campo">
                                <label>Lugar</label>
                                <input
                                    name="lugar"
                                    value={formData.lugar}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="campo">
                                <label>Categoría</label>
                                <select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre_categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="campo">
                                <label>Organizador</label>
                                <select
                                    name="organizador"
                                    value={formData.organizador}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione</option>
                                    {usuarios.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        <div className="campo">
                            <label>Cupos</label>
                            <input
                                type="number"
                                name="cupos"
                                value={formData.cupos}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="campo campo-full">
                            <label>Imagen (URL)</label>
                            <input
                                name="imagen"
                                value={formData.imagen}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="campo campo-check">
                            <label>
                                <input
                                    type="checkbox"
                                    name="destacado"
                                    checked={formData.destacado}
                                    onChange={handleChange}
                                />
                                Destacado
                            </label>
                        </div>

                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancelar" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-guardar">
                            Guardar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
