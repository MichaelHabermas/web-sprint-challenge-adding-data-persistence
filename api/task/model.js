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

async function getTaskByID(id) {
	const task = await db('tasks').where('task_id', id).first();
	return {
		task_id: task.task_id,
		task_notes: task.task_notes,
		task_description: task.task_description,
		task_completed: task.task_completed ? true : false,
		project_id: task.project_id
	};
}

async function createTask(taskToBeCreated) {
	const [id] = await db('tasks').insert({
		task_notes: taskToBeCreated.task_notes
			? taskToBeCreated.task_notes
			: null,
		task_description: taskToBeCreated.task_description,
		task_completed: taskToBeCreated.task_completed
			? taskToBeCreated.task_completed
			: 0,
		project_id: taskToBeCreated.project_id
	});
	return getTaskByID(id);
}

module.exports = { getAllTasks, createTask };
