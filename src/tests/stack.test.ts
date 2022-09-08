import request from 'supertest';
import app from '../main/app';
import stack from '../data/providers/stackProvider';

afterEach(() => {
    stack.clearStack()
})

/* Get from stack use cases */
describe('When trying to retrieve an item', () => {

    describe('from a non-empty stack', () => {
        beforeEach(() => {
            stack.pushToStack('first item')
            stack.pushToStack('last item')
        })
        it('should return the last item and remove it from the stack', async () => {
            const response = await request(app).get('/stack')
            expect(response.statusCode).toBe(200)
            expect(response.body.stackSize).toBe(1)
            expect(response.body.item).toBe('last item')
        })
    })

    describe('from an empty stack', () => {
        it('should return an error message', async () => {
            const response = await request(app).get('/stack')
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('Empty stack, could not retrieve an item from it')
        })
    })
})

/* Add to stack use cases */
describe('When adding an item', () => {

    describe('to an empty stack', () => {
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

    describe('to a non-empty stack', () => {
        beforeEach(() => {
            stack.pushToStack('existing item')
        })

        it('should pile up the new item to the stack', async () => {
            const data = {
                item: 'new item'
            }
            const response = await request(app)
                .post('/stack/add')
                .send(data)
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200)
            expect(response.body.stackSize).toBe(2)
            expect(response.body.item).toBe(data.item)
        })
    })

    describe('with a invalid value', () => {
        it.each([
            null,
            {},
            {item: undefined},
            {notItem: 'random value'}
        ])('should return an error message', async (data) => {
            const response = await request(app)
                .post('/stack/add')
                .send(data)
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe(`A valid value for 'item' must be provided`)
        })
    })
})
