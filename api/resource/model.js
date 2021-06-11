const db = require('../../data/dbConfig');

function getAllResources() {
	return db('resources');
}

function createResource(resourceToBeCreated) {
	return db('resources');
}

async function isResourceNameUnique(resource_name) {
	const resources = await db('resources');
	resources.forEach(resource => {
		return resource_name === resource.resource_name ? false : true;
	});
}

module.exports = { getAllResources, createResource, isResourceNameUnique };
