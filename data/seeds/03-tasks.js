exports.seed = function (knex) {
	return knex('tasks').insert([
		{
			task_description: 'design database',
			task_notes: 'note 1',
			task_completed: 1,
			project_id: 1
		},
		{
			task_description: 'build database',
			task_completed: 0,
			project_id: 1
		},
		{
			task_description: 'maintain database',
			task_notes: 'note 2',
			task_completed: 0,
			project_id: 1
		}
	]);
};
