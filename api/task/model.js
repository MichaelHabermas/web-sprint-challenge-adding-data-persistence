const db = require('../../data/dbConfig');

async function getAllTasks() {
	const tasks = await db('tasks as t')
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

	return tasks.map(task => {
		return {
			task_id: task.task_id,
			task_description: task.task_description,
			task_notes: task.task_notes,
			task_completed: task.task_completed ? true : false,
			project_name: task.project_name,
			project_description: task.project_description
		};
	});
}

async function getTaskByID(id) {
	const task = await db('tasks').where('task_id', id).first();
	const {
		task_id,
		task_notes,
		task_description,
		task_completed,
		project_id
	} = task;
	return {
		task_id: task_id,
		task_notes: task_notes,
		task_description: task_description,
		task_completed: task_completed ? true : false,
		project_id: project_id
	};
}

async function createTask(taskToBeCreated) {
	const { task_notes, task_description, task_completed, project_id } =
		taskToBeCreated;
	const [id] = await db('tasks').insert({
		task_notes: task_notes ? task_notes : null,
		task_description: task_description,
		task_completed: task_completed ? task_completed : 0,
		project_id: project_id
	});
	return getTaskByID(id);
}

module.exports = { getAllTasks, createTask };
