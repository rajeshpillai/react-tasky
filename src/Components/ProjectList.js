import React from 'react';

const ProjectList = (props) => {
	var {projects} = props;

	var projectView = projects.map((project) => {
		return (
			<li className="project" key={project.id}>
				<div className="project-header"><a href="#">{project.title}</a></div>

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