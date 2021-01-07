const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restricted = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const tasksRouter = require('./tasks/tasks-router')
const mentorsRouter = require('./mentors/mentors-router')
const adminsRouter = require('./admins/admins-router')
const studentsRouter = require('./students/students-router');
const connectionsRouter = require('./connections/connections-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
server.use('/api/tasks', restricted, tasksRouter);
server.use('/api/mentors', restricted, mentorsRouter);
server.use('/api/admins', restricted, adminsRouter);
server.use('/api/students', restricted, studentsRouter);
server.use('/api/connections', restricted, connectionsRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
})

module.exports = server;