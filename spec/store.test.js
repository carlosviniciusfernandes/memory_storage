const request = require('supertest');
const app = require('../app');

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})

describe('When adding a key-value pair to the store', () => {

    describe('without a time to live', () => {
        const data = {
            key: 'testKey',
            value: 'testValue'
        }

        it('should be setted in the store', () => {
            request(app)
                .post('/store/add')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })

    describe('with a time to live in seconds', () => {
        const data = {
            key: 'testKeyTTL',
            value: 'testValueTTL',
            ttl: 10
        }

        it('should be setted in the store', () => {
            request(app)
                .post('/store/add')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })

    describe('if the key already exists', () => {

        beforeEach(() => {
            const oldData = {
                key: 'testKey',
                value: 'testValueOld'
            }
            request(app)
                .post('/store/add')
                .send(oldData)
                .set('Accept', 'application/json')
        })

        it('should have its value updated in the store', () => {
            const newData = {
                key: 'testKey',
                value: 'testValueNew'
            }
            request(app)
                .post('/store/add')
                .send(newData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
        })

    })

})

describe('When getting a key-value with no TTL from the store by its key', () => {

    const data = {
        key: 'testKey',
        value: 'testValue'
    }

    beforeEach(() => {
        request(app)
            .post('/store/add')
            .send(data)
            .set('Accept', 'application/json')
    })

    it('should return its value', () => {
        request(app)
            .get(`/store/${data.key}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                assert(response.body.value, data.value)
            }))
    })

})

describe('When getting a key-value with TTL from the store by its key', () => {

    const data = {
        key: 'testKeyTTL',
        value: 'testValueTTL',
        ttl: 10
    }

    beforeEach(() => {
        request(app)
            .post('/store/add')
            .send(data)
            .set('Accept', 'application/json')
    })

    it('should return its value within its TTL', () => {
        request(app)
            .get(`/store/${data.key}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response => {
                assert(response.body.value, data.value)
            }))
    })

    it('should not be found after TTL times out', () => {
        jest.runAllTimers() // This ensures the time to live times out
        request(app)
            .get(`/store/${data.key}`)
            .expect('Content-Type', /json/)
            .expect(404)
    })

})

describe('When deleting a key-value by its key', () => {

    const data = {
        key: 'testKey',
        value: 'testValue'
    }

    beforeEach(() => {
        request(app)
            .post('/store/add')
            .send(data)
            .set('Accept', 'application/json')
    })

    it('should be deleted if it exists', () => {
        request(app)
            .delete(`/store/${data.key}`)
            .expect('Content-Type', /json/)
            .expect(200)
    })

    it('should return an error if not found', () => {
        request(app)
            .delete(`/store/${data.key}`)
            .expect('Content-Type', /json/)
            .expect(404)
    })
})