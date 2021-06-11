const db = require('../../data/dbConfig');

function getAllResources() {
	return db('resources');
}

async function getResourceByID(id) {
	const resource = await db('resources').where('resource_id', id).first();
	// return resource;
	return {
		resource_id: resource.resource_id,
		resource_name: resource.resource_name,
		resource_description: resource.resource_description
	};
}

async function createResource(resourceToBeCreated) {
	const [id] = await db('resources').insert({
		resource_name: resourceToBeCreated.resource_name,
		resource_description: resourceToBeCreated.resource_description
	});
	return getResourceByID(id);
}

module.exports = { getAllResources, createResource };
