import React from 'react';
import PropTypes from 'prop-types';

const Task = (props) => {
    var {task,subTasks,getProject,index} = props;
    var completedClass = task.completed ? "task-completed": "";
    var checked  = task.completed ? "checked" : "";
    var editText = task.edit ? "close" : "edit";
    var bodyClass = task.completed ? "task-body task-completed": "task-body";

    var user = props.getUser(task.userId);

    var project = getProject(task.projectId);

    var subTasksView = subTasks.map((subTask) => {
        var edit = subTask.edit;

        var subTaskchecked =  subTask.completed ? "checked" : "";
        return (
            <li key={subTask.id}>
              {edit ? <input type="text" title="enter to submit"  
                        placeholder="press esc to cancel"
                    onChange={(e)=>{props.onEditSubTask(e,subTask.id)}} 
                    onKeyUp={(e) => {
                        console.log(e.which, e.keyCode);
                        if (e.which === 13) {
                            console.log("enter..");
                            props.onToggleNewSubTask(task.id, subTask.id)
                        } else if (e.which === 27) {
                            props.onToggleNewSubTask(task.id, subTask.id);
                        }
                    }}
                /> 
                : 
                <div className="subtask-actions">
                  <span className={subTask.completed?"task-completed":""}>{subTask.title}</span>
                  <button type="button" onClick={(e) =>{props.onDeleteSubTask(subTask.id)}}>&#x2716;</button>
                  <input type="checkbox" checked={subTaskchecked} 
                    onChange={(e)=>{props.onToggleSubTask(subTask)}} />
                </div>
              }  

            </li>
        );
    })

    return (
        <div  key={task.id}
            data-id={task.id}
            draggable="true"
            onDragStart={(e) => props.onDragStart && props.onDragStart(e, task.id)}
            onDrag={(e) => props.onDrag && props.onDrag(e, task.id)}
            >
            {task.edit 
                ? <header style={{position: "relative"}} className="task-title">
                    <input type="text" 
                    ref={(editTask)=>{this.editTaskInput=editTask}}
                    onChange={()=>{props.onEditTask(task.id,this.editTaskInput)}} 
                    value={task.title} /> 

                    <input type="button" value={editText} className="edit-task-action"
                    onClick={() => {props.onToggleEdit(task.id)}} />

                    <a href="#" 
                    onClick={() => {props.onDeleteTask(task.id)}} 
                    className="remove-icon">&#x1f5d1;</a>
                </header>
                :
                <header style={{position: "relative"}} className="task-title">{task.title}
                    {!props.modal &&
                        <span style={{position:"absolute", right: 0, marginTop:"-4px"}} 
                        onClick={()=> {props.onShowTaskModal(task.id)}}>&#x2197;</span>
                    }
                    <input type="button" value={editText} className="edit-task-action"
                    onClick={() => {props.onToggleEdit(task.id)}} />

                    <a href="#" 
                    onClick={() => {props.onDeleteTask(task.id)}} 
                    className="remove-icon">&#x1f5d1;</a>
                </header>
            }
            <div className={bodyClass}>
                {task.edit ?
                <textarea className="task-desc-edit" value={task.description}
                    onChange={(e)=>{props.onEditTaskDesc(task.id,e.target.value)}}  />
                :<div className="task-desc">{task.description}</div>
                }

                <input type="checkbox" checked={checked}
                    onChange={() => {props.onToggleComplete(task.id)}} />

                <input type="button" value="Add subtask"
                    onClick={() => {props.onToggleNewSubTask(task.id)}} />
            </div>
            <div className="sub-tasks">
                <ol>
                 { subTasksView }
                </ol>
            </div>

            <footer className="task-footer">created by {user.name} for {project.title}</footer>
        </div>
    );
}

Task.propTypes = {
    onDeleteTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired
}

export default Task;