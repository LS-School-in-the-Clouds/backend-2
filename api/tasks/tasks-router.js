const router = require('express').Router();
const Task = require('./tasks-model');

router.get("/", (req, res) => {
  Task.get()
    .then((tasks) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log
    })
})


module.exports = router;