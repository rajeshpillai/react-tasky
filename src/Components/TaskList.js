import React from 'react';
import Task from './Task'
var taskList = (props) => {
    var taskList =  props.tasks.map((task) => {
        return(
           <Task {...props} task={task} />
        );
    });

    return (
        <div>
            <ul>{taskList}</ul>
        </div>
    );
}

export default taskList;