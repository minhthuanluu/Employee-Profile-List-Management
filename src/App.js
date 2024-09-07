import React from 'react';
import './App.css';
import EmployeeList from './pages/EmployeeList';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Employee Directory</h1>
      </header> */}
      <EmployeeList /> {/* Display the EmployeeList component */}
    </div>
  );
}

export default App;
