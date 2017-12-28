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
            ...this.state,
            task: {
                title: e.target.value
            }
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var {onSubmit} = this.props;
        onSubmit(this.state.task);
    }

    render() {
        var {title} = this.state.task;
        return (
            <div>
                <h2>Form</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
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