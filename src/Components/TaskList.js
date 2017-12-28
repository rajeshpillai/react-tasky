import React from 'react';

var taskList = (props) => {
    var taskList =  props.tasks.map((task) => {
        var completed = task.completed ? "task-completed": "";
        return(
        <li key={task.id} className={completed}>
            {task.title}
            <a href="#" 
                onClick={() => {props.onDeleteTask(task.id)}} 
                className="remove-icon">&#x1f5d1;</a>

            {task.completed ?  <input type="checkbox" checked
                   onClick={() => {props.onToggle(task.id)}} />
                   :
                <input type="checkbox" value={task.completed}
                   onClick={() => {props.onToggle(task.id)}} />
            }
           
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