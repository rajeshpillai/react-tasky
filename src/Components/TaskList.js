import React from 'react';

var taskList = (props) => {
    var taskList =  props.tasks.map((task) => {
        var completedClass = task.completed ? "task-completed": "";
        var checked  = task.completed ? "checked" : "";
        return(
        <li key={task.id} className={completedClass}>
            {task.title}
            <a href="#" 
                onClick={() => {props.onDeleteTask(task.id)}} 
                className="remove-icon">&#x1f5d1;</a>

           <input type="checkbox" checked={checked}
                   onClick={() => {props.onToggleComplete(task.id)}} />
        </li>
        );
    });

    return (
        <div>
            <h2>Task List</h2>
            <ul>{taskList}</ul>
        </div>
    );
}

export default taskList;