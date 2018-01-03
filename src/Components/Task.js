import React from 'react';

export default (props) => {
    var {task,index} = props;
    var completedClass = task.completed ? "task-completed": "";
    var checked  = task.completed ? "checked" : "";
    var editText = task.edit ? "close" : "edit";
    
    return (
        <li  key={task.id}
            data-id={task.id}
            data-category={task.category}
            data-index={index}
            draggable="true"
            onDragStart={(e) => props.onDrag(e, task.id)}
            className={completedClass}>
            {task.edit 
                ? <input type="text" 
                    ref={(editTask)=>{this.editTaskInput=editTask}}
                    onChange={()=>{props.onEditTask(task.id,this.editTaskInput)}} 
                    value={task.title} /> 
                :
                <header className="task-title">{task.title}</header>
            }
            <div className="task-body">
                <a href="#" 
                    onClick={() => {props.onDeleteTask(task.id)}} 
                    className="remove-icon">&#x1f5d1;</a>

                <textarea value={task.description}
                    onChange={(e)=>{props.onEditTaskDesc(task.id,e.target.value)}}  />
                
                <input type="checkbox" checked={checked}
                    defaultChecked={checked}
                    onClick={() => {props.onToggleComplete(task.id)}} />

                <input type="button" value={editText}
                    onClick={() => {props.onToggleEdit(task.id)}} />
            </div>
        </li>
    );
}