const express = require('express');
const server = express();
const projectRouter = require('./project/router');
const resourceRouter = require('./resource/router');
const taskRouter = require('./task/router');
const { logger } = require('./middleware/middleware');

server.use(express.json());
server.use('/api/project', projectRouter);
server.use('/api/resource', resourceRouter);
server.use('/api/task', taskRouter);
server.use(logger);

server.use((err, req, res, next) => {
	console.log();
	res.status(err.status || 500).json({
		custom: "something's rotten in the state of Denmark",
		message: err.message,
		stack: err.stack
	});
});

module.exports = server;
