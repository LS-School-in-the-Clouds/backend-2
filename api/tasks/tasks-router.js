const express = require('express');

const Tasks = require('./tasks-model');

const middleware = require('../middleware/tasks-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.findTasks(req.query)
        .then(Tasks => {
            res.status(200).json({ Tasks })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving tasks' })
        })
});

router.get('/:id', middleware.validateTasksId, (req, res) => {
    res.status(200).json({ Task })
});

router.delete('/:id', middleware.validateTasksId, (req, res) => {
    Tasks.deleteTasks(req.params.id)
        .then(count => {
            count > 0
            res.status(200).json({ message: 'The task has been deleted' })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving the task' })
        })
});

router.post('/', (req, res) => {
    const taskData = req.body;

    Tasks.insertTasks(taskData)
        .then(task => {
            if (task) {
                res.status(201).json(task);
            } else {
                res.status(404).json({ message: 'Could not find task' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to create new task' })
        });
});

router.put('/:id', middleware.validateTasksId, (req, res) => {
    const changes = req.body
    Tasks.updateTasks(req.params.id, changes)
        .then(Task => {
            res.status(200).json(Task);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error updating the task' })
        })
});

module.exports = router;
