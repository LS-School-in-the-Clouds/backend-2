const router = require('express').Router();
const Task = require('./../tasks/tasks-model');
const Admin = require('./admins-model');
const User = require('./../users/users-model')
const checkRole = require('../auth/check-role-middleware');
const mid = require('./../middleware/users-middleware');

// endpoints

router.get("/", checkRole('admin'), (req, res) => {
  Admin.get()
    .then((admins) => {
      res.status(200).json(admins);
    })
    .catch((error) => {
      console.log(error.message);
    })
})

router.get("/:id", mid.validateUserIdParam, (req, res) => {
  Admin.getById(req.params.id)
    .then(admin => {
      res.status(200).json(admin)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving admin information" });
    });
})

router.post("/", mid.validateUserId, (req, res) => {
  Admin.insert(req.body)
    .then((admin) => {
      res.status(201).json(admin)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error posting admin information" });
    });
})

router.put("/:id", (req, res) => {
  Admin.update(req.params.id, req.body)
    .then((admin) => {
      res.status(201).json(admin)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error updating r" });
    });
})


module.exports = router;