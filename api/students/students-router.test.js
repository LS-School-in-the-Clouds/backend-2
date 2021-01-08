const request = require('supertest')
const Students = require('./students-router');
const db = require('../../database/dbConfig');

const Student1 = {first_name: 'Matthew', last_name: 'Serwer', interests: 'Synthesisers, Guitars', career_goals: 'To be a web developer', state: 'New York', country: 'USA', preferred_times: 'After 7pm EST', user_id: 8, 'timezone': 4}
const Student2 = {first_name: 'Danny', last_name: 'McDude', interests: 'Science fiction, oregami', career_goals: 'Have my own company', state: 'Texas', country: 'USA', preferred_times: 'After 7pm EST', user_id: 9, 'timezone': 3}


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('students').truncate();
})
afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[GET] /students', () => {
      it('responds with 200 OK', async () => {
        const res = await request(Students).get('/students')
        expect(res.status).toBe(200)
      })
      it('responds with empty array if no students', async () => {
        const res = await request(Students).get('/students')
        expect(res.body).toHaveLength(0)
      })
      it('responds with students if students', async () => {
        await db('students').insert(Student1)
        let res = await request(Students).get('/students')
        expect(res.body).toHaveLength(1)
        await db('students').insert(Student2)
        res = await request(Students).get('/students')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(Student1)
        expect(res.body[1]).toMatchObject(Student2)
      })
    })
    describe('[GET] /students/:id', () => {
      it('responds with the student with the given id', async () => {
        await db('students').insert(Student2)
        let res = await request(Students).get('/students/2')
        expect(res.body).toMatchObject(Student2)
      })
      it('responds with a 404 if id not in db', async () => {
        const response = await request(Students).get('/students/1')
        expect(response.status).toBe(404)
      })
    })
    describe('[POST] /students', () => {
      it('resturns the newly created student', async () => {
        const res = await request(Students).post('/students').send(Student2);
        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe('Student2');
      })
      it('if we add Student2 twice responds with "not cool"', async () => {
        await request(Students).post('/students').send(Student2);
        const res = await request(Students).post('/students').send(Student2);
        expect(JSON.stringify(res.body)).toMatch(/not cool/)
      })
    })
  });
