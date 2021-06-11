const express = require('express');
const { validateResource } = require('../middleware/middleware');

const Resources = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
	Resources.getAllResources()
		.then(resources => {
			res.status(200).json(resources);
		})
		.catch(next);
});

router.post('/', validateResource, (req, res, next) => {
	Resources.createResource(req.body)
		.then(resource => {
			res.status(200).json(resource);
		})
		.catch(next);
});

module.exports = router;
