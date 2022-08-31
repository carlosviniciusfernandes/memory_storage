const request = require('supertest');
const app = require('../app');

/* Empty stack use cases */
describe('When adding an item to an empty stack', () => {
    it('should be added and become the only item in the stack', async () => {
        const data = {
            item: 'some random data'
        }
        const response = await request(app)
            .post('/stack/add')
            .send(data)
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200)
        expect(response.body.stackSize).toBe(1)
        expect(response.body.item).toBe(data.item)
    })
})

describe('When trying to retrieve an item from an empty stack', () => {
    it('should return and error message', async () => {
        const response = await request(app).get('/stack')
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Empty stack, could not retrieve an item from it')
    })
})

/* Non-empty stack use cases */
describe('When adding an item to a non-empty stack', () => {
    beforeEach(async () => {
        const existingItem = {item: 'existing item'}
        await request(app)
            .post('/stack/add')
            .send(existingItem)
            .set('Accept', 'application/json')
    })

    it('should pile up the new item on the top of the stack', async () => {
        const data = {
            item: 'new item'
        }
        let response
        response = await request(app)
            .post('/stack/add')
            .send(data)
            .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200)
        expect(response.body.stackSize).toBe(2)

        response = await request(app).get('/stack')
        expect(response.statusCode).toBe(200)
        expect(response.body.stackSize).toBe(1)
    })
})
