const db = require('../../data/dbConfig');

function getAllTasks() {
	return db('tasks');
}

function validateTask(taskToBeCreated) {
	return db('tasks');
}

module.exports = { getAllTasks, validateTask };
