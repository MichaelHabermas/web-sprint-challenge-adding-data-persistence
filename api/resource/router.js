const express = require('express');
const {
	validateResource,
	isResourceNameUnique
} = require('../middleware/middleware');

const Resources = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
	Resources.getAllResources()
		.then(resources => {
			const newResourceArray = resources.map(resource => {
				return {
					resource_id: resource.resource_id,
					resource_name: resource.resource_name,
					resource_description: resource.resource_description
				};
			});
			res.status(200).json(newResourceArray);
		})
		.catch(next);
});

router.post('/', validateResource, isResourceNameUnique, (req, res, next) => {
	Resources.createResource(req.body)
		.then(resource => {
			res.status(200).json(resource);
		})
		.catch(next);
});

module.exports = router;
