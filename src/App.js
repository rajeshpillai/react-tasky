import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';

import Dashboard from './Components/Dashboard';

class App extends Component {
  state = {
    tasks: [
      {id: 1, title: "Code a react app", completed: false, category: "inprogress" },
      {id: 2, title: "Code a node app", completed: true, category: "inprogress" },
      {id: 3, title: "Code a full stack app", completed: true, category: "todo" },
      {id: 4, title: "Learn devops", completed: false, category: "todo" },
      {id: 5, title: "Learn cloud computing", completed: true, category: "completed" },
    ],
    categories: [
      "inprogress",
      "todo",
      "completed"
    ]
  }

  onTaskSubmit = (task) => {
    task.id = this.state.tasks.length + 1;
    task.category = "todo";
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
  onToggleComplete = (taskId) => {
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

  onEditTask = (taskId, editInput) => {
    var tasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        task.title = editInput.value
      }
      return task;
    });

    this.setState({
      tasks
    });
  }
  onToggleEdit = (taskId) => {
    var tasks = this.state.tasks.map((task) => {
       if (task.id === taskId) {
         task.edit = !task.edit;
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
          <Dashboard categories = {this.state.categories} 
                 tasks= {this.state.tasks}
                        onDeleteTask={this.onDeleteTask}
                        onToggleComplete={this.onToggleComplete}
                        onToggleEdit={this.onToggleEdit}
                        onEditTask={this.onEditTask}
          />

      </div>
    );
  }
}

export default App;
