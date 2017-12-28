import React from 'react';

export default class TaskForm extends React.Component {
    constructor() {
        super();
    }
    state = {
        task: {
            title: "",
            completed: false
        }
    }

    onTitleChange = (e) => {
        this.setState({
            ...this.state,
            task: {
                title: e.target.value
            }
        })
    }

    render() {
        var {title} = this.state.task;
        return (
            <div>
                <h2>Form</h2>
                <input type="text" 
                    placeholder="enter task"
                    value = {title}
                    onChange = {this.onTitleChange}
                />
            </div>
        );
    }
}