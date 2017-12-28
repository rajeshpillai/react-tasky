import React from 'react';

var taskList = (props) => {
    var taskList =  props.tasks.map((task) => {
        var completedClass = task.completed ? "task-completed": "";
        var checked  = task.completed ? "checked" : "";
        return(
        <li key={task.id} className={completedClass}>
            {task.edit 
                ? <input type="text" 
                    ref={(editTask)=>{this.editTaskInput=editTask}}
                    onChange={()=>{props.onEditTask(task.id,this.editTaskInput)}} 
                    value={task.title} /> 
                :
                task.title
            }
            <a href="#" 
                onClick={() => {props.onDeleteTask(task.id)}} 
                className="remove-icon">&#x1f5d1;</a>

           <input type="checkbox" checked={checked}
             onClick={() => {props.onToggleComplete(task.id)}} />

           <input type="button" value="edit"
             onClick={() => {props.onToggleEdit(task.id, task.title)}} />
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