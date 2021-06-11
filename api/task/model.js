const db = require('../../data/dbConfig');

function getAllTasks() {
	return db('tasks as t')
		.join('projects as p', 't.project_id', 'p.project_id')
		.select(
			'task_id',
			'task_description',
			'task_notes',
			'task_completed',
			'project_name',
			'project_description'
		)
		.orderBy('task_id');
}

function validateTask(taskToBeCreated) {
	return db('tasks');
}

module.exports = { getAllTasks, validateTask };
