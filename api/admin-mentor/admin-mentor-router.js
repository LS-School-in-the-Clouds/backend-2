const router = require('express').Router();
const AM = require('./admin-mentor-model');
const User = require('./../users/users-model');

// middleware
const validateMentorId = async (req, res, next) => {
    try {
        const mentor = await User.getById(req.body.mentor_id)
        if(!mentor) {
            res.status(404).json({ message: "Invalid mentor ID" })
        } else if (mentor.role != 2) {
            res.status(400).json({ message: "User is not a mentor" })
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: "Error checking mentor by Id" })
    }
};

const validateAdminId = async (req, res, next) => {
    try {
        const admin = await User.getById(req.body.admin_id)
        if(!admin) {
            res.status(404).json({ message: "Invalid admin ID" })
        } else if (admin.role != 1) {
            res.status(400).json({ message: "User is not an admin" })
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: "Error checking admin by Id" })
    }
};

// get list of mentors by admin
router.get("/:id/mentors", (req, res) => {
    AM.getByAdminId(req.params.id)
    .then(connections => {
        res.status(200).json(connections)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Server error retrieving connections" })
    })
});

// get list of admin by mentor
router.get("/:id/admins", (req, res) => {
    AM.getByMentorId(req.params.id)
    .then(connections => {
        res.status(200).json(connections)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Server error in retrieving connections" })
    })
});

router.post('/', validateMentorId, validateAdminId, (req, res) => {
    AM.insert(req.body)
    .then((connection)=> {
        res.status(201).json(connection)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Server error creating admin mentor pair"})
    })
});

router.delete('/:id', (req, res) => {
    AM.remove(req.params.id)
    .then(connection => {
        res.status(500).json({ message: "Connection Deleted" })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Server error deleting admin mentor pair" })
    })
});

module.exports = router;
