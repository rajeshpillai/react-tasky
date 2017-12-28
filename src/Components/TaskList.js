import React from 'react';

var taskList = (props) => {
    var taskList =  props.tasks.map((task) => {
        var completedClass = task.completed ? "task-completed": "";
        var checked  = task.completed ? "checked" : "";
        var editText = task.edit ? "close" : "edit";
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

            <input type="button" value={editText}
                onClick={() => {props.onToggleEdit(task.id)}} />
            </li>
        );
    });

    return (
        <div>
            <ul>{taskList}</ul>
        </div>
    );
}

export default taskList;