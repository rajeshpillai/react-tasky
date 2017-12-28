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
      {id: 3, title: "Code a full stack app", completed: true },
      {id: 4, title: "Learn devops", completed: false },
      {id: 5, title: "Learn cloud computing", completed: false },
    ]
  }

  onTaskSubmit = (task) => {
    task.id = this.state.tasks.length + 1;

    this.setState({
      tasks: [task, ...this.state.tasks]
    })
  }

  onDeleteTask = (taskId) => {
    var tasks = this.state.tasks.filter((task) => {
      return task.id !== taskId;
    });

    this.setState({
      tasks
    });
  }
  onToggle = (taskId) => {
    var tasks = this.state.tasks.map((task) => {
       if (task.id === taskId) {
         task.completed = !task.completed;
       }
       return task;
    });

    this.setState({
      tasks
    });
  }

  render() {
    return (
      <div className="App">
          <Header />
          <TaskForm onSubmit={this.onTaskSubmit} />
          <TaskList tasks= {this.state.tasks}
                    onDeleteTask={this.onDeleteTask}
                    onToggle={this.onToggle}
          />

      </div>
    );
  }
}

export default App;
