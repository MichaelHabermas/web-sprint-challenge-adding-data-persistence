exports.up = function (knex) {
	return knex.schema
		.createTable('projects', tbl => {
			tbl.increments('project_id');
			tbl.text('project_name', 128).notNullable();
			tbl.text('project_description', 128);
			tbl.integer('project_completed').notNullable().defaultTo(0);
		})
		.createTable('resources', tbl => {
			tbl.increments('resource_id');
			tbl.text('resource_name', 128).notNullable().unique();
			tbl.text('resource_description');
		})
		.createTable('tasks', tbl => {
			tbl.increments('task_id');
			tbl.text('task_description', 128).notNullable();
			tbl.text('task_notes', 128);
			tbl.integer('task_completed', 128).notNullable().defaultTo(0);
			tbl.integer('project_id')
				.unsigned() // can't do negative
				.notNullable()
				.references('project_id')
				.inTable('projects')
				.onUpdate('CASCADE')
				.onDelete('CASCADE'); // or RESTRICT
		})
		.createTable('project_resources', tbl => {
			tbl.increments();
			tbl.integer('project_id')
				.unsigned() // can't do negative
				.notNullable()
				.references('project_id')
				.inTable('projects')
				.onUpdate('CASCADE')
				.onDelete('CASCADE'); // or RESTRICT
			tbl.integer('resource_id')
				.unsigned() // can't do negative
				.notNullable()
				.references('resource_id')
				.inTable('resources')
				.onUpdate('CASCADE')
				.onDelete('CASCADE'); // or RESTRICT
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('project_resources')
		.dropTableIfExists('tasks')
		.dropTableIfExists('resources')
		.dropTableIfExists('projects');
};
