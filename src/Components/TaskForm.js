import React from 'react';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        task: {
            title: "",
            completed: false
        }
    }

    onTitleChange = (e) => {
        this.setState({
            task: {
                title: e.target.value,
                completed: false
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var {onSubmit} = this.props;
        onSubmit(this.state.task);

        this.setState({
            task: {
                ...this.state.task,
                title: ''                
            }
        });
        this.taskInput.focus();
    }

    render() {
        var {title} = this.state.task;
        return (
            <div>
                <h2>Form</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                        ref = {(taskInput) => this.taskInput = taskInput}
                        placeholder="enter task"
                        value = {title}
                        onChange = {this.onTitleChange}
                    />
                    <input type="submit" 
                        value="submit"
                    />
                </form>
            </div>
        );
    }
}