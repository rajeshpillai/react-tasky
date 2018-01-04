import React from 'react';

export default ({projectId = -1}) => {
    return (
        <header>
            <h2>Tasky &#9728; {projectId}</h2>
            <hr/>
        </header>
    );
}