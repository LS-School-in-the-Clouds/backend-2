const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restricted = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const tasksRouter = require('./tasks/tasks-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
server.use('/api/tasks', restricted, tasksRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
})

module.exports = server;