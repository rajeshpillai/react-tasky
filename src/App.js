import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

class App extends Component {
  state = {
    tasks: [
      {id: 1, title: "Code a react app", completed: false },
      {id: 2, title: "Code a node app", completed: true },
      {id: 3, title: "Code a full stack app", completed: false },
    ]
  }
  render() {
    return (
      <div className="App">
          <Header />
          <TaskForm />
          <TaskList tasks= {this.state.tasks} />

      </div>
    );
  }
}

export default App;
