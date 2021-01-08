const Students = require('./students-model');
const db = require('../../database/dbConfig');

const Student1 = {first_name: 'Matthew', last_name: 'Serwer', interests: 'Synthesisers, Guitars', career_goals: 'To be a web developer', state: 'New York', country: 'USA', preferred_times: 'After 7pm EST', user_id: 8, 'timezone': 4}

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

describe('students model', () => {
    it('Students.get returns empty array if no students', async () => {
        const result = await Students.get()
        expect(result).toHaveLength(0)
    })
    it('Students.get returns students', async () => {
        await db('students').insert(Student1)
        const result = await Students.get()
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('first_name', 'Matthew')
        expect(result[0]).toMatchObject(Student1)
    })
});
