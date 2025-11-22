import React, { useEffect, useState } from 'react';
import ConceptoCard from '../components/ConceptoCard';
import FormularioConcepto from '../components/FormularioConcepto';
import { 
    obtenerConceptos, 
    crearConcepto, 
    actualizarConcepto, 
    eliminarConcepto 
} from '../services/conceptoService';
import './ListaConceptos.css';

function ListaConceptos() {
    const [conceptos, setConceptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [conceptoEditar, setConceptoEditar] = useState(null);

    const cargarConceptos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await obtenerConceptos();
            setConceptos(data);
        } catch (err) {
            setError('Error al cargar los conceptos. Por favor, intente nuevamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarConceptos();
    }, []);

    const handleCrear = () => {
        setConceptoEditar(null);
        setMostrarFormulario(true);
    };

    const handleEditar = (concepto) => {
        setConceptoEditar(concepto);
        setMostrarFormulario(true);
    };

    const handleGuardar = async (datos) => {
        try {
            if (conceptoEditar) {
                await actualizarConcepto(conceptoEditar.id, datos);
                alert('Concepto actualizado correctamente');
            } else {
                await crearConcepto(datos);
                alert('Concepto creado correctamente');
            }
            
            setMostrarFormulario(false);
            setConceptoEditar(null);
            cargarConceptos();
        } catch (err) {
            alert('Error al guardar el concepto');
            console.error(err);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este concepto?')) {
            return;
        }

        try {
            await eliminarConcepto(id);
            alert('Concepto eliminado correctamente');
            cargarConceptos();
        } catch (err) {
            alert('Error al eliminar el concepto');
            console.error(err);
        }
    };

    const handleCancelar = () => {
        setMostrarFormulario(false);
        setConceptoEditar(null);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando conceptos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">❌ {error}</p>
                <button onClick={cargarConceptos} className="btn-reintentar">
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="lista-conceptos">
            <div className="header-container">
                <h1>Gestión de Conceptos</h1>
                <button onClick={handleCrear} className="btn-crear">
                    ➕ Crear Concepto
                </button>
            </div>

            {conceptos.length === 0 ? (
                <div className="empty-state">
                    <p>No hay conceptos registrados</p>
                    <button onClick={handleCrear} className="btn-crear-primero">
                        Crear el primero
                    </button>
                </div>
            ) : (
                <div className="conceptos-grid">
                    {conceptos.map(concepto => (
                        <ConceptoCard
                            key={concepto.id}
                            concepto={concepto}
                            onEditar={handleEditar}
                            onEliminar={handleEliminar}
                        />
                    ))}
                </div>
            )}

            {mostrarFormulario && (
                <FormularioConcepto
                    conceptoEditar={conceptoEditar}
                    onGuardar={handleGuardar}
                    onCancelar={handleCancelar}
                />
            )}
        </div>
    );
}

export default ListaConceptos;