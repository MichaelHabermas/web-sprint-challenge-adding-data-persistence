const db = require('../../data/dbConfig');

function getAllProjects() {
	return db('projects');
}

async function getProjectByID(id) {
	const project = await db('projects').where('project_id', id).first();
	// return project;
	return {
		project_id: project.project_id,
		project_name: project.project_name,
		project_description: project.project_description,
		project_completed: project.project_completed ? true : false
	};
}

async function createProject(projectToBeCreated) {
	const [id] = await db('projects').insert({
		project_name: projectToBeCreated.project_name,
		project_description: projectToBeCreated.project_description,
		project_completed: projectToBeCreated.project_completed
			? projectToBeCreated.project_completed
			: 0
	});
	return getProjectByID(id);
}

module.exports = { getAllProjects, createProject, getProjectByID };
