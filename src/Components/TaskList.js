import React from 'react';
import Task from './Task'
var taskList = (props) => {
    var taskList =  props.tasks.map((task, i) => {
        return(
           <Task key={task.id} {...props} task={task} index={i} />
        );
    });
    return (
        <div>
            <ul className="task-list" key={props.category}>{taskList}</ul>
        </div>
    );
}
export default taskList;