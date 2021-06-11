const db = require('../../data/dbConfig');

async function getAllResources() {
	const resources = await db('resources');
	return resources.map(resource => {
		const { resource_id, resource_name, resource_description } = resource;
		return {
			resource_id: resource_id,
			resource_name: resource_name,
			resource_description: resource_description
		};
	});
}

async function getResourceByID(id) {
	const resource = await db('resources').where('resource_id', id).first();
	const { resource_id, resource_name, resource_description } = resource;
	return {
		resource_id: resource_id,
		resource_name: resource_name,
		resource_description: resource_description
	};
}

async function createResource(resourceToBeCreated) {
	const { resource_name, resource_description } = resourceToBeCreated;
	const [id] = await db('resources').insert({
		resource_name: resource_name,
		resource_description: resource_description
	});
	return getResourceByID(id);
}

module.exports = { getAllResources, createResource };
