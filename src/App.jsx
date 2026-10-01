import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600">Vertex Copier</h1>
      </div>
    </Router>
  );
}

export default App;
