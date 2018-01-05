import React from 'react';
import Link from './Router/Link';

const ProjectList = (props) => {
	var {projects} = props;

	var projectView = projects.map((project) => {
		var users = props.getUsersByProject(project.id);
		console.log("Project Users: ", users);
		return (
			<li className="project" key={project.id}>
				<div className="project-header">
					<Link to={"/dashboard/" + project.id}>{project.title}</Link>
				</div>
				<div className="project-body">
					<span className="badge"># Users: {users.length} </span>
				</div>

				<div className="project-footer">&copy;</div>

			</li>
		);	
	});
	return (
		<ul className="project-list">
			{projectView}
		</ul>
	);	
}

export default ProjectList;