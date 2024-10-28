// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Electric Vehicle Population Dashboard</h1>
        <p>Track and analyze the growth of electric vehicles over the years.</p>
      </header>
      <Dashboard />
    </div>
  );
};

export default App;
