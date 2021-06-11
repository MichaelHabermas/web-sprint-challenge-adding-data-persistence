const db = require('../../data/dbConfig');

function logger(req, res, next) {
	console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`);
	next();
}

function validateProject(req, res, next) {
	const { project_name } = req.body;
	if (!project_name || typeof project_name !== 'string') {
		next({
			status: 400,
			message: 'Invalid project name'
		});
	} else {
		next();
	}
}

function validateResource(req, res, next) {
	const { resource_name } = req.body;
	if (!resource_name || typeof resource_name !== 'string') {
		next({
			status: 400,
			message: 'Invalid resource name'
		});
	} else {
		next();
	}
}

async function isResourceNameUnique(req, res, next) {
	const resources = await db('resources');
	resources.forEach(resource => {
		if (req.body.resource_name === resource.resource_name) {
			next({
				status: 400,
				message: 'Resource name must be unique'
			});
		}
	});
	next();
}

function validateTask(req, res, next) {
	const { task_description } = req.body;
	if (!task_description || typeof task_description !== 'string') {
		next({
			status: 400,
			message: 'Invalid project name'
		});
	} else {
		next();
	}
}

module.exports = {
	logger,
	validateResource,
	isResourceNameUnique,
	validateProject,
	validateTask
};
