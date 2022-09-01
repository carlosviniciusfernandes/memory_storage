const request = require('supertest');
const app = require('../main/app');
const inMemoryStore = require('../data/providers/storeProvider')

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    inMemoryStore.clearStore()
})

/* Add use cases */
describe('When adding a key-value pair to the store', () => {

    describe('with missing or invalid params', () => {

        it.each([
            null,
            "",
            {},
            {
                notKey: 'testKey',
                value: 'testValue'
            },
            {
                key: 'testKey',
                notValue: 'testValue'
            },
            {
                key: 'testKey',
                value: 'testValue',
                ttl: null
            },
            {
                key: 'testKey',
                value: 'testValue',
                ttl: 'not numerical value'
            }

        ])('should return an error', async(data) => {
            const response = await request(app)
                .post('/store/add')
                .send(data)
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(400)
        })
    })

    describe('with valid params', () => {
        it.each([
            {
                key: 'testKey',
                value: 'testValue'
            },
            {
                key: 'testKeyTTL',
                value: 'testValueTTL',
                ttl: 10
            },
            {
                key: 'testKeyTTL',
                value: 'testValueTTL',
                ttl: '10'
            }
        ])
        ('should be setted in the store', async (data) => {
            const response = await request(app)
                .post('/store/add')
                .send(data)
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200)
        })

    })

})

/* Get use cases */
describe('When getting a key-value from the store by its key', () => {

    describe('with an invalid key', () => {
        it('should return an error if not found', async () => {
            const response = await request(app).get(`/store/not-valid-key`)
            expect(response.statusCode).toBe(404)
        })
    })

    describe('with a valid key and no TTL set', () => {

        const data = {
            key: 'testKey',
            value: 'testValue'
        }
        beforeEach(() => {
            inMemoryStore.setToStore(data.key, data.value)
        })

        it('should return its value', async () => {
            const response = await request(app).get(`/store/${data.key}`)
            expect(response.statusCode).toBe(200)
            expect(response.body.value).toBe(data.value)
        })

    })

    describe('with a valid key and TTL set', () => {

        const data = {
            key: 'testKeyTTL',
            value: 'testValueTTL',
            ttl: 10
        }
        beforeEach(() => {
            inMemoryStore.setToStore(data.key, data.value)
        })

        it('should return its value within its TTL', async () => {
            const response = await request(app).get(`/store/${data.key}`)
            expect(response.statusCode).toBe(200)
            expect(response.body.value).toBe(data.value)
        })

        it('should not be found after TTL times out', async () => {
            jest.advanceTimersByTime(data.ttl*1000) // This ensures the time to live times out
            const response = await request(app).get(`/store/${data.key}`)
            expect(response.statusCode).toBe(404)
        })

    })

})

/* 'Update' use cases - In reallity it hit the add endpoint and overwrittes existing data */
describe('When adding a key-value pair to the store', () => {

    describe('if the key already exists without a TTL', () => {

        const oldData = {
            key: 'testKey',
            value: 'testValueOld'
        }
        beforeEach(() => {
            inMemoryStore.setToStore(oldData.key, oldData.value)
        })

        describe('and a TTL is not set for new value', () => {

            it('should just have its value updated in the store', async () => {
                const newData = {
                    key: 'testKey',
                    value: 'testValueNew'
                }
                let response = await request(app)
                    .post('/store/add')
                    .send(newData)
                    .set('Accept', 'application/json')
                expect(response.statusCode).toBe(200)
            })
        })

        describe('and a TTL is set for new value', () => {

            it('should have its value updated and TTL set in the store', async () => {
                const newData = {
                    key: 'testKey',
                    value: 'testValueNew',
                    ttl: 10
                }
                const response = await request(app)
                    .post('/store/add')
                    .send(newData)
                    .set('Accept', 'application/json')
                expect(response.statusCode).toBe(200)
            })
        })


    })

    describe('if the key already exists with a TTL', () => {

        const oldData = {
            key: 'testKey',
            value: 'testValueOld',
            ttl: 10
        }
        beforeEach(() => {
            inMemoryStore.setToStore(oldData.key, oldData.value, oldData.ttl)
        })

        describe('and a TTL is not set for new value', () => {

            it('should have its value updated and TTL removed from the store', async () => {
                const newData = {
                    key: 'testKey',
                    value: 'testValueNew'
                }
                let response = await request(app)
                    .post('/store/add')
                    .send(newData)
                    .set('Accept', 'application/json')
                expect(response.statusCode).toBe(200)
            })


        })

        describe('and a TTL is set for new value', () => {

            it('should have its value and TTL updated in the store', async () => {
                const newData = {
                    key: 'testKey',
                    value: 'testValueNew',
                    ttl: 20
                }
                let response = await request(app)
                .post('/store/add')
                .send(newData)
                .set('Accept', 'application/json')
                expect(response.statusCode).toBe(200)
            })

        })

    })

})

/* Delete use cases*/
describe('When deleting a key-value by its key', () => {

    const data = {
        key: 'testKey',
        value: 'testValue'
    }
    beforeEach(() => {
        inMemoryStore.setToStore(data.key, data.value)
    })

    it('should be deleted if it exists', async () => {
        const response = await request(app).delete(`/store/${data.key}`)
        expect(response.statusCode).toBe(200)
    })

    it('should return an error if not found', async () => {
        const response = await request(app).delete(`/store/not-${data.key}`)
        expect(response.statusCode).toBe(404)
    })
})
