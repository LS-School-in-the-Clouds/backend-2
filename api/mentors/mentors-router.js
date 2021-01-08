const router = require('express').Router();
const Mentor = require('./mentors-model');
const mid = require('./../middleware/users-middleware');

// endpoints

router.get("/", (req, res) => {
  Mentor.get()
    .then((mentors) => {
      res.status(200).json(mentors);
    })
    .catch((error) => {
      console.log(error.message);
    })
})

router.get("/:id", mid.validateUserIdParam, (req, res) => {
  Mentor.getById(req.params.id)
    .then(mentor => {
      res.status(200).json(mentor)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving mentor information" });
    });
})

router.post("/", mid.validateUserId, (req, res) => {
  Mentor.insert(req.body)
    .then((mentor) => {
      res.status(201).json(mentor)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error posting mentor information" });
    });
})

router.put("/:id", (req, res) => {
  Mentor.update(req.params.id, req.body)
    .then((mentor) => {
      res.status(201).json(mentor)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server error updating r" });
    });
})


module.exports = router;