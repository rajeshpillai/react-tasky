import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TaskForm from './Components/TaskForm';

import Dashboard from './Components/Dashboard';
import Modal from './Components/Modal';
import Task from './Components/Task';
import Menu from './Components/Menu';
import ProjectList from './Components/ProjectList';

const uuidv4 = require('uuid/v4');

class App extends Component {
  state = {
    isOpen: false,  // for Edit task modal.  Refactor naming
    showAddTaskModal: false,
    task: null,
    catForTask: "todo", // category for new task,
    
    project: {
      id: null,
      title: null,
      status: "todo"
    },

    projects: [
      {id: 1, title: "Angular eBook",status:"inprogress"},
      {id: 2, title: "React eBook",status:"inprogress"},
      {id: 3, title: "NodeJS eBook",status:"inprogress"},
      {id: 4, title: "Modern JavaScript eBook",status:"inprogress"},
      {id: 5, title: "API Development",status:"inprogress"},
      
    ],
    tasks: [
      {id: 1,userId:"1",projectId: "1",title: "Code a react app", completed: false, category: "inprogress"},
      {id: 2,userId:"1",projectId: "1", title: "Code a node app", completed: true, category: "inprogress"},
      {id: 3,userId:"1",projectId: "1", title: "Code a full stack app", completed: true, category: "todo"},
      {id: 4,userId:"2",projectId: "2", title: "Learn devops", completed: false, category: "todo"},
      {id: 5,userId:"2",projectId: "2",title: "Learn cloud computing", completed: true, category: "completed"},
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

  getProject = (projectId) => {
    var projects = this.state.projects;
    var project = projects.filter((project) => {
      return project.id == projectId;
    });

    return project[0];
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
    var id = ev.dataTransfer.getData("id");
    console.log(`DROPPED task ${id} at ${cat}`);
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
        subTasks: [...subTasks, newSubTask]
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
    var {subTasks,projects} = this.state;
    var tasks = [];

    for(let p = 1; p <= 10; p++) {
      var projectId = uuidv4();
      projects.push({
        id: projectId,
        title: `Project ${p}`,
        status: 'todo'
      });

      for(let i = 1; i <= 5; i++) {
          var taskId = uuidv4();
          tasks.push({
            id: taskId,
            title: `Task ${i}`,
            description: "Some random text " + i,
            projectId: projectId,
            category: (i%2) ? "inprogress": "todo",
            userId: (i%2) ? 1 : 2
          });
          for(let j = 0; j < 5; j++) {
            subTasks.push({
              id:  uuidv4(),
              taskId: taskId,
              title: "Subtask of " + j + 1,
              completed: false
            })
          }
       }
    }
   
    this.setState({
      tasks,
      subTasks,
      projects
    });

  }

  render() {
    var task = this.state.task;
    var showAddTaskModal = this.state.showAddTaskModal;
    
    return (
      <div className="App">
          <Header />
          <Menu/>
          <ProjectList projects={this.state.projects}/>

          <Dashboard categories = {this.state.categories} 
                 tasks= {this.state.tasks}
                 subTasks={this.state.subTasks}
                 getUser={this.getUser}
                 getProject={this.getProject}
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
                onToggleNewSubTask={this.onToggleNewSubTask}
                onEditSubTask={this.onEditSubTask}
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
