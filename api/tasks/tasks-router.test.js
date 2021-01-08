const request = require('supertest')
const Tasks = require('./tasks-router');
const db = require('../../database/dbConfig');

const Task1 = {description: "Learn how to breakdance, and do it well.", type: "mentor", date: "01/18/21", assigned_by: 1, assigned_to: 3}
const Task2 = {description: "Dance the magic dance.", type: "mentor", date: "01/18/21", assigned_by: 1, assigned_to: 3}


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('tasks').truncate();
})
afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[GET] /tasks', () => {
      it('responds with 200 OK', async () => {
        const res = await request(Tasks).get('/tasks')
        expect(res.status).toBe(200)
      })
      it('responds with empty array if no tasks', async () => {
        const res = await request(Tasks).get('/tasks')
        expect(res.body).toHaveLength(0)
      })
      it('responds with tasks if tasks', async () => {
        await db('tasks').insert(Task1)
        let res = await request(Tasks).get('/tasks')
        expect(res.body).toHaveLength(1)
        await db('tasks').insert(Task2)
        res = await request(Tasks).get('/tasks')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(Task1)
        expect(res.body[1]).toMatchObject(Task2)
      })
    })
    describe('[GET] /tasks/:id', () => {
      it('responds with the task with the given id', async () => {
        await db('tasks').insert(Task2)
        let res = await request(Tasks).get('/tasks/2')
        expect(res.body).toMatchObject(Task2)
      })
      it('responds with a 404 if id not in db', async () => {
        const response = await request(Tasks).get('/tasks/1')
        expect(response.status).toBe(404)
      })
    })
    describe('[POST] /tasks', () => {
      it('resturns the newly created task', async () => {
        const res = await request(Tasks).post('/tasks').send(Task2);
        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe('Task2');
      })
      it('if we add Task2 twice responds with "not cool"', async () => {
        await request(Tasks).post('/tasks').send(Task2);
        const res = await request(Tasks).post('/tasks').send(Task2);
        expect(JSON.stringify(res.body)).toMatch(/not cool/)
      })
    })
  });
