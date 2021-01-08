const request = require('supertest')
const Mentors = require('./mentors-router');
const db = require('../../database/dbConfig');

const Mentor1 = {first_name: 'Charlie', last_name: 'Murphy', interests: 'Rick James concerts, comedy, & storytelling', career: 'comedian', state: 'New York', country: 'USA', preferred_times: 'After 8pm Eastern', user_id: 4, 'timezone': 4}
const Mentor2 = {first_name: 'John', last_name: 'Smith', interests: 'Math, Making Pizza, Motorcross', career: 'Accountant', state: 'California', country: 'USA', preferred_times: '5-7pm PST', user_id: 5, 'timezone': 1}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('mentors').truncate();
})
afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[GET] /mentors', () => {
      it('responds with 200 OK', async () => {
        const res = await request(Mentors).get('/mentors')
        expect(res.status).toBe(200)
      })
      it('responds with empty array if no mentors', async () => {
        const res = await request(Mentors).get('/mentors')
        expect(res.body).toHaveLength(0)
      })
      it('responds with mentors if mentors', async () => {
        await db('mentors').insert(Mentor1)
        let res = await request(Mentors).get('/mentors')
        expect(res.body).toHaveLength(1)
        await db('mentors').insert(Mentor2)
        res = await request(Mentors).get('/mentors')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(Mentor1)
        expect(res.body[1]).toMatchObject(Mentor2)
      })
    })
    describe('[GET] /mentors/:id', () => {
      it('responds with the mentor with the given id', async () => {
        await db('mentors').insert(Mentor2)
        let res = await request(Mentors).get('/mentors/2')
        expect(res.body).toMatchObject(Mentor2)
      })
      it('responds with a 404 if id not in db', async () => {
        const response = await request(Mentors).get('/mentors/1')
        expect(response.status).toBe(404)
      })
    })
    describe('[POST] /mentors', () => {
      it('resturns the newly created mentor', async () => {
        const res = await request(Mentors).post('/mentors').send(Mentor2);
        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe('Mentor2');
      })
      it('if we add Mentor2 twice responds with "not cool"', async () => {
        await request(Mentors).post('/mentors').send(Mentor2);
        const res = await request(Mentors).post('/mentors').send(Mentor2);
        expect(JSON.stringify(res.body)).toMatch(/not cool/)
      })
    })
  });
