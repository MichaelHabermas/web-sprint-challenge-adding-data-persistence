const db = require('../../data/dbConfig');

async function getAllProjects() {
	const projects = await db('projects');
	return projects.map(project => {
		const {
			project_id,
			project_name,
			project_description,
			project_completed
		} = project;
		return {
			project_id: project_id,
			project_name: project_name,
			project_description: project_description,
			project_completed: project_completed === 1 ? true : false
		};
	});
}

async function getProjectByID(id) {
	const project = await db('projects').where('project_id', id).first();
	const { project_id, project_name, project_description, project_completed } =
		project;
	return {
		project_id: project_id,
		project_name: project_name,
		project_description: project_description,
		project_completed: project_completed ? true : false
	};
}

async function createProject(projectToBeCreated) {
	const { project_name, project_description, project_completed } =
		projectToBeCreated;
	const [id] = await db('projects').insert({
		project_name: project_name,
		project_description: project_description,
		project_completed: project_completed ? project_completed : 0
	});
	return getProjectByID(id);
}

module.exports = { getAllProjects, createProject, getProjectByID };
