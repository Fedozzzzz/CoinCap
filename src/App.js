import React from 'react';
import './App.css';
import MainTable from "./components/MainTable";
import Logo from "./components/Logo"

function App() {
  return (
      <div className="app">
        <Logo/>
        <MainTable/>
      </div>
  );
}

export default App;
