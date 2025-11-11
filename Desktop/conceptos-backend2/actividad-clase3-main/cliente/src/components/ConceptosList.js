// client/src/components/ConceptosList.js
import React, { useState, useEffect } from 'react';
import ConceptoCard from './ConceptoCard';
import './ConceptosList.css';

/**
 * Componente que maneja la lista completa de conceptos
 * Incluye carga, visualización y eliminación
 */
function ConceptosList() {
  
  // ========== ESTADOS ==========
  const [conceptos, setConceptos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ========== EFECTOS ==========
  
  /**
   * Cargar conceptos al montar el componente
   */
  useEffect(() => {
    cargarConceptos();
  }, []);

  // ========== FUNCIONES ==========

  /**
   * Obtiene los conceptos desde la API
   */
  const cargarConceptos = async () => {
    try {
      setCargando(true);
      setError(null);

      const response = await fetch('/api/conceptos');
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setConceptos(data);
      
      console.log(`✅ ${data.length} conceptos cargados`);
      
    } catch (err) {
      console.error('❌ Error al cargar conceptos:', err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Elimina un concepto específico
   */
  const eliminarConcepto = async (id) => {
    try {
      const response = await fetch(`/api/conceptos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar concepto');
      }

      // Actualizar estado local
      setConceptos(conceptos.filter(c => c.id !== id));
      
      console.log(`✅ Concepto ${id} eliminado`);
      
    } catch (err) {
      console.error('❌ Error al eliminar:', err);
      alert('Error al eliminar el concepto: ' + err.message);
    }
  };

  /**
   * Elimina todos los conceptos
   */
  const eliminarTodos = async () => {
    const confirmar = window.confirm(
      '⚠️ ¿Estás seguro de eliminar TODOS los conceptos?\n\nEsta acción no se puede deshacer.'
    );

    if (!confirmar) return;

    try {
      const response = await fetch('/api/conceptos', {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar conceptos');
      }

      setConceptos([]);
      console.log('✅ Todos los conceptos eliminados');
      
    } catch (err) {
      console.error('❌ Error al eliminar todos:', err);
      alert('Error al eliminar conceptos: ' + err.message);
    }
  };

  // ========== RENDERIZADO CONDICIONAL ==========

  if (cargando) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>⏳ Cargando conceptos desde MySQL...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>❌ Error al cargar conceptos: {error}</p>
        <button onClick={cargarConceptos} className="btn-primary">
          🔄 Reintentar
        </button>
      </div>
    );
  }

  // ========== RENDERIZADO PRINCIPAL ==========

  return (
    <section className="list-section">
      <div className="list-header">
        <h2>📚 Conceptos Guardados ({conceptos.length})</h2>
        <button 
          className="btn-danger" 
          onClick={eliminarTodos}
          disabled={conceptos.length === 0}
        >
          🗑️ Eliminar Todos
        </button>
      </div>

      {conceptos.length === 0 ? (
        <div className="empty-message">
          <p>📭 No hay conceptos guardados</p>
          <p className="empty-hint">
            Los conceptos que agregues aparecerán aquí
          </p>
        </div>
      ) : (
        <div className="conceptos-grid">
          {conceptos.map(concepto => (
            <ConceptoCard
              key={concepto.id}
              concepto={concepto}
              onEliminar={eliminarConcepto}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ConceptosList;