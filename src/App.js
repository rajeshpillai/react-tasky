import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

class App extends Component {
  state = {
    tasks: [],

  }
  render() {
    return (
      <div className="App">
          <Header />
          <TaskForm />
          <TaskList />

      </div>
    );
  }
}

export default App;
