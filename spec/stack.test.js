const request = require('supertest');
const app = require('../app');

describe('When adding an item to an empty stack', () => {
    it('should be added and become the only item in the stack', () => {
        const data = {
            item: 'some random data'
        }
        request(app)
            .post('/stack/add')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                assert(response.body.stack, [data.item])
            }))
    })
})

describe('When adding an item to a non-empty stack', () => {
    beforeAll(() => {
        request(app)
            .post('/stack/add')
            .send({item: 'existing item'})
            .set('Accept', 'application/json')
    })

    it('should pile up the new item on the top of the stack', () => {
        const data = {
            item: 'new item'
        }
        request(app)
            .post('/stack/add')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                assert(response.body.stack.length, 2)
            }))

        request(app)
            .get('/stack')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                assert(response.body.stack.length, 1)
            }))
    })
})

describe('When trying to retrieve an item from an empty stack', () => {
    it('should return and error message', () => {
        request(app)
            .get('/stack')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response => {
                assert(response.body.message, 'Empty stack, could not retrieve an item from it')
            }))
    })
})
