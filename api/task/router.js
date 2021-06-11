const express = require('express');
const { validateTask } = require('../middleware/middleware');

const Tasks = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
	Tasks.getAllTasks()
		.then(tasks => {
			res.status(200).json(tasks);
		})
		.catch(next);
});

router.post('/', validateTask, (req, res, next) => {
	Tasks.createTask(req.body)
		.then(task => {
			res.status(200).json(task);
		})
		.catch(next);
});

module.exports = router;
