exports.seed = function (knex) {
	return knex('resources').insert([
		{
			resource_name: 'computer',
			resource_description: 'a computer running software'
		},
		{
			resource_name: 'brain',
			resource_description: 'stuff inside my head'
		}
	]);
};
