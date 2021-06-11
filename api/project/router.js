const express = require('express');
const { validateProject } = require('../middleware/middleware');

const Projects = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
	Projects.getAllProjects()
		.then(projects => {
			const newProjectArray = projects.map(project => {
				return {
					project_id: project.project_id,
					project_name: project.project_name,
					project_description: project.project_description,
					project_completed: project.project_completed ? true : false
				};
			});
			res.status(200).json(newProjectArray);
		})
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	Projects.getProjectByID(req.params.id)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(next);
});

router.post('/', validateProject, (req, res, next) => {
	Projects.createProject(req.body)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(next);
});

module.exports = router;
