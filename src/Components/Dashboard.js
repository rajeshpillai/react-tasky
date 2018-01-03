import React from 'react';
import TaskList from './TaskList';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {categories, 
                tasks, 
                getUser,
                onDeleteTask,
                onEditTaskDesc, 
                onShowTaskModal,
                onToggleComplete, 
                onEditTask, 
                onToggleEdit,
                onDragStart,
                onDrag,
                onDragover,
                onDrop
        } = this.props;
        
        var taskLists = categories.map((cat) => {
            var filteredTasks = tasks.filter((task) => {
                if(task.category == cat) return task;
            });
            return (
                <div 
                    className="category"
                    key ={cat}
                    onDragOver={(e) => { onDragover(e)}}
                    onDrop={(e) =>{onDrop(e, cat)}}>
                    {cat}
                    <TaskList tasks= {filteredTasks}
                        getUser = {getUser}
                        onDeleteTask={onDeleteTask}
                        onToggleComplete={onToggleComplete}
                        onToggleEdit={onToggleEdit}
                        onEditTaskDesc={onEditTaskDesc}
                        onEditTask={onEditTask}
                        onDrag={onDrag}
                        onDragStart={onDragStart}
                        onShowTaskModal={onShowTaskModal}
                    />
                </div>
            )
        });
        return (
            taskLists
        );
    }
}
