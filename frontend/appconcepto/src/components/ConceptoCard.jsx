import React from 'react';
import './ConceptoCard.css';

function ConceptoCard({ concepto, onEditar, onEliminar }) {
    return (
        <div className="concepto-card">
            <div className="concepto-header">
                <h3>{concepto.nombre}</h3>
                <span className="concepto-id">#{concepto.id}</span>
            </div>
            
            <p className="concepto-descripcion">{concepto.descripcion}</p>
            
            <div className="concepto-actions">
                {onEditar && (
                    <button 
                        className="btn-editar"
                        onClick={() => onEditar(concepto)}
                    >
                        ✏️ Editar
                    </button>
                )}
                
                {onEliminar && (
                    <button 
                        className="btn-eliminar"
                        onClick={() => onEliminar(concepto.id)}
                    >
                        🗑️ Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}

export default ConceptoCard;