const Tasks = require('./tasks-model');
const db = require('../../database/dbConfig');

const Task1 = {description: "Learn how to breakdance, and do it well.", type: "mentor", date: "01/18/21", assigned_by: 1, assigned_to: 3}

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

describe('tasks model', () => {
    it('Tasks.get returns empty array if no tasks', async () => {
        const result = await Tasks.get()
        expect(result).toHaveLength(0)
    })
    it('Tasks.get returns tasks', async () => {
        await db('tasks').insert(Task1)
        const result = await Tasks.get()
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('description', 'Learn how to breakdance, and do it well.')
        expect(result[0]).toMatchObject(Task1)
    })
});
