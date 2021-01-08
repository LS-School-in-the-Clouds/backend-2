const Mentors = require('./mentors-model');
const db = require('../../database/dbConfig');

const Mentor1 = {first_name: 'Charlie', last_name: 'Murphy', interests: 'Rick James concerts, comedy, & storytelling', career: 'comedian', state: 'New York', country: 'USA', preferred_times: 'After 8pm Eastern', user_id: 4, 'timezone': 4}

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

describe('Mentors model', () => {
    it('Mentors.get returns empty array if no mentors', async () => {
        const result = await Mentors.get()
        expect(result).toHaveLength(0)
    })
    it('Mentors.get returns mentors', async () => {
        await db('mentors').insert(Mentor1)
        const result = await Mentors.get()
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('first_name', 'Charlie')
        expect(result[0]).toMatchObject(Mentor1)
    })
});
