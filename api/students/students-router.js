const router = require('express').Router();
const Task = require('./../tasks/tasks-model');
const Student = require('./students-model');
const User = require('./../users/users-model')
const checkRole = require('../auth/check-role-middleware');
const mid = require('./../middleware/users-middleware');

// endpoints

router.get("/", checkRole('admin'), (req, res) => {
  Student.get()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.log(error.message);
    })
})

router.get("/:id", mid.validateUserIdParam, (req, res) => {
  Student.getById(req.params.id)
    .then(student => {
      res.status(200).json(student)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving student information" });
    });
})

router.post("/", mid.validateUserId, (req, res) => {
  Student.insert(req.body)
    .then((student) => {
      res.status(201).json(student)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error posting student information" });
    });
})

router.put("/:id", (req, res) => {
  Student.update(req.params.id, req.body)
    .then((student) => {
      res.status(201).json(student)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error updating student" });
    });
})


module.exports = router;