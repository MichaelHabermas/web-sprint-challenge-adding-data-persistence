const db = require('../../data/dbConfig');

function getAllProjects() {
	return db('projects');
}

function createProject(projectToBeCreated) {
	return db('projects');
}

module.exports = { getAllProjects, createProject };
