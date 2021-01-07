const router = require('express').Router();
const MS = require('./mentor-student-model');
const User = require('./../users/users-model');

// middleware 
const validateStudentId = async (req, res, next) => {
  try {
    const student = await User.getById(req.body.student_id)
    if(!student) { 
      res.status(404).json({ message: "Invalid student ID "})
    } else if (student.role != 3) {
      res.status(400).json({ message: "User is not a student "})
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking student by Id "})
  }
}

const validatementortId = async (req, res, next) => {
  try {
    const mentor = await User.getById(req.body.mentor_id)
    if(!mentor) { 
      res.status(404).json({ message: "Invalid mentor ID "})
    } else if (mentor.role != 2) {
      res.status(400).json({ message: "User is not a mentor "})
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking mentorby Id "})
  }
}

// get list of students by mentor
router.get("/:id/students", (req, res) => {
  MS.getByMentorId(req.params.id)
    .then(connections => {
      res.status(200).json(connections)
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: "Server error retrieving connections"})
    })
})

// get list of mentor by student
router.get("/:id/mentors", (req, res) => {
  MS.getByStudentId(req.params.id)
    .then(connections => {
      res.status(200).json(connections)
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: "Server error retrieving connections"})
    })
})

router.post('/', validateStudentId, validatementortId, (req, res) => {
  MS.insert(req.body)
    .then((connection) => {
      res.status(201).json(connection)
    })
    .catch(e => {
      console.log(e)
      res.status(500).json({ message: "Server error creating mentor student pair "})
    })
})

router.delete('/:id', (req, res) => {
  MS.remove(req.params.id)
    .then(connection => {
      res.status(500).json({ message: "Connection Deleted" })
    })
    .catch(e => {
      console.log(e)
      res.status(500).json({ message: "Server error deleting mentor student pair "})
    })
})

module.exports = router;