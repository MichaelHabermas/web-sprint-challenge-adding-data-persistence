const express = require('express');
const { validateTask } = require('../middleware/middleware');

const Tasks = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
	Tasks.getAllTasks()
		.then(tasks => {
			const newTaskArray = tasks.map(task => {
				return {
					task_id: task.task_id,
					task_description: task.task_description,
					task_notes: task.task_notes,
					task_completed: task.task_completed ? true : false,
					project_name: task.project_name,
					project_description: task.project_description
				};
			});
			res.status(200).json(newTaskArray);
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
