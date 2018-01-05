import React from 'react';
import TaskList from './TaskList';
import PropTypes from 'prop-types';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
   
    static propTypes = {
        categories: PropTypes.array.isRequired,
        tasks: PropTypes.array.isRequired
    }

    componentWillMount() {
        console.log("Dashboard:willMount->", this.props);
        this.props.setActiveProject(this.props.projectId);
    }

    componentDidMount() {
        console.log("Dashboard:didMount->", this.props);
    }
    componentDidCatch(error, info) {
        console.log("Dashboard: ERROR: ", error, info);
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        var {categories, 
                projectId,
                tasks, 
                subTasks,
                onDragover,
                onDrop,
                match
        } = this.props;

        console.log("MATCH: ", match);
        
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
                    
                    <div className="category-header">
                        <span>{cat}</span>
                        <a title="new task" onClick={(e)=>this.props.onShowAddTaskModal(cat,projectId)} href="#" className="task-add-icon">&#x002B;</a>
                    </div>

                    <TaskList 
                        {...this.props}
                        tasks= {filteredTasks}
                        subTasks = {subTasks}
                        
                    />
                </div>
            )
        });
        return (
            taskLists
        );
    }
}
