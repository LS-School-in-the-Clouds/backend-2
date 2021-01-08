const Tasks = require('../tasks/tasks-model')

const validateTasksId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id);
        if (!task) {
            res.status(404).json({ message: `Task with id ${id} not found` });
        } else {
            req.task = task;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the task', error: error.message })
    }
};

module.exports = {
    validateTasksId
}
