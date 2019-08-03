import React from 'react';
import './App.css';
import MainTable from "./components/MainTable";
import Logo from "./components/Logo"
import Socket from "./components/Socket";

function App() {
  return (
      <div className="app">
        <Logo/>
        <MainTable/>
        {/*<Socket/>*/}
      </div>
  );
}

export default App;
