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
    render() {
        var {categories, 
                tasks, 
                subTasks,
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
                    
                    <div className="category-header">
                        <span>{cat}</span>
                        <a title="new task" onClick={(e)=>this.props.onShowAddTaskModal(cat)} href="#" className="task-add-icon">&#x002B;</a>
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
