const db = require('../../data/dbConfig');

function getAllResources() {
	return db('resources');
}

function createResource(resourceToBeCreated) {
	return db('resources');
}

module.exports = { getAllResources, createResource };
