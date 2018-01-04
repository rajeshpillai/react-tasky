import React from 'react';
import Link from './Router/Link';

const ProjectList = (props) => {
	var {projects} = props;

	var projectView = projects.map((project) => {
		return (
			<li className="project" key={project.id}>
				<div className="project-header">
					<Link to={"/dashboard/" + project.id}>{project.title}</Link>
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