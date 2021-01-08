const request = require('supertest')
const Admins = require('./admins-router');
const db = require('../../database/dbConfig');

const Admin1 = {school_district: 'Half Hollow Hills', school_name: 'West', state: 'New York', country: 'USA', user_id: 1}
const Admin2 = {school_district: 'Half Hollow Hills', school_name: 'East', state: 'New York', country: 'USA', user_id: 2}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('admins').truncate();
})
afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[GET] /admins', () => {
      it('responds with 200 OK', async () => {
        const res = await request(Admins).get('/admins')
        expect(res.status).toBe(200)
      })
      it('responds with empty array if no admins', async () => {
        const res = await request(Admins).get('/admins')
        expect(res.body).toHaveLength(0)
      })
      it('responds with admins if admins', async () => {
        await db('admins').insert(Admin1)
        let res = await request(Admins).get('/admins')
        expect(res.body).toHaveLength(1)
        await db('admins').insert(Admin2)
        res = await request(Admins).get('/admins')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(Admin1)
        expect(res.body[1]).toMatchObject(Admin2)
      })
    })
    describe('[GET] /admins/:id', () => {
      it('responds with the admin with the given id', async () => {
        await db('admins').insert(Admin2)
        let res = await request(Admins).get('/admins/2')
        expect(res.body).toMatchObject(Admin2)
      })
      it('responds with a 404 if id not in db', async () => {
        const response = await request(Admins).get('/admins/1')
        expect(response.status).toBe(404)
      })
    })
    describe('[POST] /admins', () => {
      it('resturns the newly created admin', async () => {
        const res = await request(Admins).post('/admins').send(Admin2);
        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe('Admin2');
      })
      it('if we add Admin2 twice responds with "not cool"', async () => {
        await request(Admins).post('/admins').send(Admin2);
        const res = await request(Admins).post('/admins').send(Admin2);
        expect(JSON.stringify(res.body)).toMatch(/not cool/)
      })
    })
  });
