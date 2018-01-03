import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';

import Dashboard from './Components/Dashboard';
import Modal from './Components/Modal';
import Task from './Components/Task';

class App extends Component {
  state = {
    tasks: [
      {id: 1, title: "Code a react app", completed: false, category: "inprogress",userId:"1" },
      {id: 2, title: "Code a node app", completed: true, category: "inprogress",userId:"1"  },
      {id: 3, title: "Code a full stack app", completed: true, category: "todo",userId:"2"  },
      {id: 4, title: "Learn devops", completed: false, category: "todo",userId:"2"  },
      {id: 5, title: "Learn cloud computing", completed: true, category: "completed",userId:"1"  },
    ],
    categories: [
      "inprogress",
      "todo",
      "completed"
    ],
    users: [
      {id: 1, name: "Rajesh Pillai"},
      {id: 2, name: "Radhika Pillai"},
    ]
  }

  componentDidMount() {
    var tasks = this.state.tasks;
    for(let i = 0; i < tasks.length; i++) {
      tasks[i].description = "Some random text " + i;
    }

    this.setState({
      tasks
    });

  }

  getUser = (userId) => {
    var users = this.state.users;
    var user = users.filter((user) => {
      return user.id == userId;
    });

    return user[0];
  }

  onShowTaskModal = (taskId) => {
    this.toggleModal(taskId);
  }

  toggleModal = (taskId) => { 
    var task = this.state.tasks.filter((task) => {
      if (task.id === taskId) return task;
    })[0];

    this.setState({
      isOpen: !this.state.isOpen,
      task: task
    });
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

  onEditTaskDesc = (taskId, desc) => {
    var tasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        task.description = desc;
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


  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", ev.target.dataset.id);
    ev.dataTransfer.setData("index", ev.target.dataset.index);
  }

  onDrag = (ev, id) => {
    console.log('drag:',id);
  }

  onDragover = (ev) => {
    ev.preventDefault();
  }


  onDrop = (ev, cat) => {
    ev.preventDefault();
    var id = Number(ev.dataTransfer.getData("id"));
    var tasks = this.state.tasks;

    var tasks = tasks.filter((task) => {
      if (task.id === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({     
      ...this.state ,
      tasks:tasks
    });
  }

  render() {
    var task = this.state.task;
    return (
      <div className="App">
          <Header />
          <TaskForm onSubmit={this.onTaskSubmit} />
          <Dashboard categories = {this.state.categories} 
                 tasks= {this.state.tasks}
                 getUser={this.getUser}
                        onDeleteTask={this.onDeleteTask}
                        onToggleComplete={this.onToggleComplete}
                        onToggleEdit={this.onToggleEdit}
                        onEditTask={this.onEditTask}
                        onEditTaskDesc= {this.onEditTaskDesc}
                        onDragover={this.onDragover}
                        onDrag={this.onDrag}
                        onDragStart={this.onDragStart}
                        onDrop={this.onDrop}
                        onShowTaskModal={this.onShowTaskModal}
          />

          {task && 
            <Modal show={this.state.isOpen} onClose={this.toggleModal}>
             <Task  task={task} modal={true}
               getUser={this.getUser}
                onDeleteTask={this.onDeleteTask}
                onToggleComplete={this.onToggleComplete}
                onToggleEdit={this.onToggleEdit}
                onEditTask={this.onEditTask}
                onEditTaskDesc= {this.onEditTaskDesc}
             />
            </Modal>  
          }

      </div>
    );
  }
}

export default App;
