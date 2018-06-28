import React, { Component } from 'react';
import './App.css';
import SideBar from './components/MainView';
class App extends Component {
  render() {
    return (
      <div className="App">
          <SideBar/>
      </div>
    );
  }
}

export default App;
