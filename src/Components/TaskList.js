import React from 'react';

var taskList = (props) => {
    var taskList =  props.tasks.map((task) => {
        return(
        <li key={task.id}>
            {task.title}
            <a href="#" className="remove-icon">&#x1f5d1;</a>
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