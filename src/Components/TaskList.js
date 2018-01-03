import React from 'react';
import Task from './Task'
var taskList = (props) => {
    var allsubtasks = props.subTasks;
    var taskList =  props.tasks.map((task, i) => {
        let subtasks = allsubtasks.filter((st) => {
            return task.id == st.taskId;
        });
        return(
           <Task key={task.id} {...props} task={task} subTasks={subtasks} index={i} />
        );
    });
    return (
        <div>
            <div className="task-list" key={props.category}>{taskList}</div>
        </div>
    );
}
export default taskList;