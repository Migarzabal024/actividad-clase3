import React, { useState, useEffect } from 'react';
import './FormularioConcepto.css';

function FormularioConcepto({ conceptoEditar, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (conceptoEditar) {
            setFormData({
                nombre: conceptoEditar.nombre || '',
                descripcion: conceptoEditar.descripcion || ''
            });
        }
    }, [conceptoEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error del campo
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        } else if (formData.nombre.trim().length < 3) {
            nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

        if (!formData.descripcion.trim()) {
            nuevosErrores.descripcion = 'La descripción es obligatoria';
        } else if (formData.descripcion.trim().length < 5) {
            nuevosErrores.descripcion = 'La descripción debe tener al menos 5 caracteres';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validarFormulario()) {
            onGuardar(formData);
        }
    };

    return (
        <div className="formulario-overlay">
            <div className="formulario-container">
                <h2>{conceptoEditar ? 'Editar Concepto' : 'Crear Concepto'}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre *</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={errores.nombre ? 'input-error' : ''}
                            placeholder="Ingrese el nombre del concepto"
                        />
                        {errores.nombre && (
                            <span className="error-message">{errores.nombre}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción *</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className={errores.descripcion ? 'input-error' : ''}
                            placeholder="Ingrese la descripción del concepto"
                            rows="4"
                        />
                        {errores.descripcion && (
                            <span className="error-message">{errores.descripcion}</span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancelar} className="btn-cancelar">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-guardar">
                            {conceptoEditar ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioConcepto;