import React from 'react';

export default (props) => {
    var {task,index} = props;
    var completedClass = task.completed ? "task-completed": "";
    var checked  = task.completed ? "checked" : "";
    var editText = task.edit ? "close" : "edit";
    var bodyClass = task.completed ? "task-body task-completed": "task-body";

    var user = props.getUser(task.userId);

    return (
        <li  key={task.id}
            data-id={task.id}
            draggable="true"
            onDragStart={(e) => props.onDragStart && props.onDragStart(e, task.id)}
            onDrag={(e) => props.onDrag && props.onDrag(e, task.id)}
            >
            {task.edit 
                ? <input type="text" 
                    ref={(editTask)=>{this.editTaskInput=editTask}}
                    onChange={()=>{props.onEditTask(task.id,this.editTaskInput)}} 
                    value={task.title} /> 
                :
                <header style={{position: "relative"}} className="task-title">{task.title}
                    {!props.modal &&
                        <span style={{position:"absolute", right: 0, marginTop:"-4px"}} 
                        onClick={()=> {props.onShowTaskModal(task.id)}}>&#x2197;</span>
                    }
                </header>
            }
            <div className={bodyClass}>
                <a href="#" 
                    onClick={() => {props.onDeleteTask(task.id)}} 
                    className="remove-icon">&#x1f5d1;</a>

                <textarea value={task.description}
                    onChange={(e)=>{props.onEditTaskDesc(task.id,e.target.value)}}  />
                
                <input type="checkbox" checked={checked}
                    onChange={() => {props.onToggleComplete(task.id)}} />

                <input type="button" value={editText}
                    onClick={() => {props.onToggleEdit(task.id)}} />
            </div>
            <footer className="task-footer">created by {user.name}</footer>
        </li>
    );
}