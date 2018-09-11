import React, { Component } from 'react';
import './App.css';
import Bnavbar from './components/navbar.js';
class App extends Component {
  render() {
    return (
        <div className={App}>
          <Bnavbar />
        </div>
    );
  }
}

export default App;