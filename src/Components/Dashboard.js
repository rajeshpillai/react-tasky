import React from 'react';
import TaskList from './TaskList';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var categories = this.props.categories;
        var taskLists = categories.map((cat) => {
            var filteredTasks = this.props.tasks.filter((task) => {
                if(task.category == cat) return task;
            });
            return (
                <div className="category">
                    {cat}
                    <TaskList tasks= {filteredTasks}
                        onDeleteTask={this.props.onDeleteTask}
                        onToggleComplete={this.props.onToggleComplete}
                        onToggleEdit={this.props.onToggleEdit}
                        onEditTask={this.props.onEditTask}
                    />
                </div>
            )
        });
        return (
            taskLists
        );
    }
}
