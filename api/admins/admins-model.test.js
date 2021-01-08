const Admins = require('./admins-model');
const db = require('../../database/dbConfig');

const Admin1 = {school_district: 'Half Hollow Hills', school_name: 'West', state: 'New York', country: 'USA', user_id: 1}

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

describe('Admins model', () => {
    it('Admins.get returns empty array if no admins', async () => {
        const result = await Admins.get()
        expect(result).toHaveLength(0)
    })
    it('Admins.get returns Admins', async () => {
        await db('admins').insert(Admin1)
        const result = await Admins.get()
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('school_name', 'West')
        expect(result[0]).toMatchObject(Admin1)
    })
});
