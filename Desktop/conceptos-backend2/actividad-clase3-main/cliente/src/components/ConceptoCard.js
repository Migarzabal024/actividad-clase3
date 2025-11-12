// client/src/components/ConceptoCard.js
import React from 'react';
import './ConceptoCard.css';

/**
 * Componente que renderiza una tarjeta de concepto individual
 * @param {Object} concepto - Objeto con los datos del concepto
 * @param {Function} onEliminar - Callback para eliminar el concepto
 */
function ConceptoCard({ concepto, onEliminar }) {
  
  /**
   * Formatea la fecha a formato español
   */
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Maneja el click en eliminar con confirmación
   */
  const handleEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar el concepto "${concepto.nombre}"?`
    );
    
    if (confirmar) {
      onEliminar(concepto.id);
    }
  };

  return (
    <div className="concepto-card">
      <div className="concepto-header">
        <h3>{concepto.nombre}</h3>
        <button 
          className="btn-delete" 
          onClick={handleEliminar}
          aria-label={`Eliminar ${concepto.nombre}`}
          title="Eliminar concepto"
        >
          🗑️
        </button>
      </div>
      
      <p className="concepto-descripcion">
        {concepto.descripcion}
      </p>
      
      <small className="concepto-fecha">
        📅 Creado: {formatearFecha(concepto.created_at || concepto.createdAt)}
      </small>
    </div>
  );
}

export default ConceptoCard;