exports.seed = function (knex) {
	return knex('projects').insert([
		{
			project_name: 'build database',
			project_description: 'create and maintain a new unknown database',
			project_completed: 0
		}
	]);
};
