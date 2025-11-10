// client/src/App.js
import React from 'react';
import ConceptosList from './components/ConceptosList';
import './App.css';

/**
 * Componente principal de la aplicación React
 */
function App() {
  
  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>📚 Gestión de Conceptos</h1>
        <p>Taller de Programación 2 - Franco Borsani</p>
        <div className="tech-badges">
          <span className="badge">React</span>
          <span className="badge">Express.js</span>
          <span className="badge">MySQL</span>
          <span className="badge">Sequelize</span>
        </div>
      </header>

      {/* Navegación */}
      <nav className="app-nav">
        <a href="http://localhost:3000/" className="nav-link">
          ➕ Agregar Concepto
        </a>
        <a href="http://localhost:3000/lista" className="nav-link">
          📋 Ver Lista (EJS)
        </a>
        <a href="http://localhost:3001" className="nav-link active">
          ⚛️ Ver Lista (React)
        </a>
      </nav>

      {/* Contenido Principal */}
      <main className="app-main">
        <ConceptosList />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Trabajo Práctico N°3 - 2025</p>
        <p>Integrantes: [Tu Nombre] y [Nombre Compañero]</p>
        <div className="footer-info">
          <span>💡 Aplicación construida con Create React App</span>
          <span>🔗 Conectada a MySQL via API REST</span>
        </div>
      </footer>
    </div>
  );
}

export default App;