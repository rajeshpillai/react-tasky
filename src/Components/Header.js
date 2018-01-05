import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("Header:willMount->",this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Header:willReceiptProps->",nextProps);
    }
    render() {
        return (
            <header class="app-header">
                <h2>Tasky &#9728; {this.props.projectTitle || ""}</h2>
                <hr/>
            </header>
        );
    }
}