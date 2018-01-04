import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';

import Dashboard from './Components/Dashboard';
import Modal from './Components/Modal';
import Task from './Components/Task';
import Menu from './Components/Menu';

class App extends Component {
  state = {
    isOpen: false,  // for Edit task modal.  Refactor naming
    showAddTaskModal: false,
    task: null,
    catForTask: "todo", // category for new task
    tasks: [
      {id: 1, title: "Code a react app", completed: false, category: "inprogress",userId:"1" },
      {id: 2, title: "Code a node app", completed: true, category: "inprogress",userId:"1"  },
      {id: 3, title: "Code a full stack app", completed: true, category: "todo",userId:"2"  },
      {id: 4, title: "Learn devops", completed: false, category: "todo",userId:"2"  },
      {id: 5, title: "Learn cloud computing", completed: true, category: "completed",userId:"1"  },
    ],
    subTask: {
      id: null,
      taskId: null,
      title: null,
      completed: false,
      edit: false // toggle edit mode
    },

    subTasks: [],

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

  

  getUser = (userId) => {
    var users = this.state.users;
    var user = users.filter((user) => {
      return user.id == userId;
    });

    return user[0];
  }

  getSubTasks = (taskId) => {
    var subTasks = this.state.subTasks.filter((t) => {
        return t.taskId === taskId;
    });

    return subTasks;
  }

  onShowAddTaskModal = (cat = "todo") => {
    this.toggleAddTaskModal(cat);
  }

  toggleAddTaskModal = (cat) => { 
    this.setState({
      showAddTaskModal: !this.state.showAddTaskModal,
      catForTask: cat
    });
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
    task.category = this.state.catForTask;
    task.userId = "1";

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

  // if taskSubTaskId present, then edit mode, otherwise new subtask
  onToggleNewSubTask = (taskId, taskSubTaskId = -1) => {
    var subTasks = this.state.subTasks;
    if (taskSubTaskId < 0) {
      var newSubTask = {id: subTasks.length + 1, title: 'todo', taskId: taskId, completed: false,edit: true};
      this.setState({
        subTasks: [newSubTask, ...subTasks]
      });
    } else {
      var subTask = this.state.subTasks.filter((subT) => {
        return subT.id === taskSubTaskId;
      })[0];
      subTask.edit = false;
      this.setState({
        subTask
      })
    }
  }

  // When subtask title changes.. refactor
  onEditSubTask = (e,subTaskId) => {
    var target = e.target;
    var subTasks = this.state.subTasks.map((task) => {
      if (task.id === subTaskId) {
        task.title = target.value;
      }
      return task;
    });
    this.setState({
      subTasks
    });
  }
  
  componentDidMount() {
    var {tasks,subTasks} = this.state;
    for(let i = 0; i < tasks.length; i++) {
      tasks[i].description = "Some random text " + i;

      for(let j = 0; j < 5; j++) {
        subTasks.push({
          id:  i + j,
          taskId: tasks[i].id,
          title: "Subtask of " + j + 1,
          completed: false
        })
      }
    }

    this.setState({
      tasks,
      subTasks
    });

  }

  render() {
    var task = this.state.task;
    var showAddTaskModal = this.state.showAddTaskModal;
    
    return (
      <div className="App">
          <Header />
          <Menu/>
          <Dashboard categories = {this.state.categories} 
                 tasks= {this.state.tasks}
                 subTasks={this.state.subTasks}
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
                        onShowAddTaskModal={this.onShowAddTaskModal}
                        onToggleNewSubTask={this.onToggleNewSubTask}
                        onEditSubTask={this.onEditSubTask}
          />

          {task && 
            <Modal show={this.state.isOpen} onClose={this.toggleModal}>
             <Task  task={task} modal={true}
               getUser={this.getUser}
               subTasks={this.getSubTasks(task.id)}
                onDeleteTask={this.onDeleteTask}
                onToggleComplete={this.onToggleComplete}
                onToggleEdit={this.onToggleEdit}
                onEditTask={this.onEditTask}
                onEditTaskDesc= {this.onEditTaskDesc}
             />
            </Modal>  
          }

          {showAddTaskModal && 
            <Modal show={showAddTaskModal} onClose={this.toggleAddTaskModal}>
             <TaskForm onSubmit={this.onTaskSubmit} />
            </Modal>  
          }

      </div>
    );
  }
}

export default App;
