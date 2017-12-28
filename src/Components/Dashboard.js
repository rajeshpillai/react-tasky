import React from 'react';
import TaskList from './TaskList';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {categories, tasks, onDeleteTask, onToggleComplete, onEditTask,onToggleEdit} = this.props;
        var taskLists = categories.map((cat) => {
            var filteredTasks = this.props.tasks.filter((task) => {
                if(task.category == cat) return task;
            });
            return (
                <div className="category">
                    {cat}
                    <TaskList tasks= {filteredTasks}
                        onDeleteTask={onDeleteTask}
                        onToggleComplete={onToggleComplete}
                        onToggleEdit={onToggleEdit}
                        onEditTask={onEditTask}
                    />
                </div>
            )
        });
        return (
            taskLists
        );
    }
}
