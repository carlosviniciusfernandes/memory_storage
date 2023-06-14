# Memory Storage

This project is based on **TMG Node Challenge** that I did in 2022. It consists of in memory storage system support LIFO stacks and a key-value store with a TTL feature.

Original challenge description <a href='./original_challenge.md'>here</a>.

---
## Installation
The installation of the is done by executing the following commands:

> npm install

__NOTE__: You can use other node package managers like `Yarn`, but for simplicity `NPM` is used here as example.

---

## Design

The projects is structured in a very simple manner, with two main modules for storage (`stack` and `store`) under the application `core`. Those modules stores data in singleton instances when the application is running, and are injected into their respective controller for the REST API. Data is not persisted, so be aware that data is lost when the application is turned down or restarted.

```
src/
+--api/
   +--controllers/
      +--stackController.ts
      +--storeController.ts
+--core/
   +--stack/
   +--store/
```

### Stack

The `stack` is a **Last In First Out** data structure. On a lower level it operates using a simple array structure for keeping track of data.
### Store

The `store` is a **key-value** data struture with a **TTL** feature. On a lower level it operates using 2 hashmaps using the objects' key, one for storing the actual value, and the other for storing the timeout object. This way it is possible to clear and/or overwrite the timeouts for each item.


## REST API
To start the express app, run the following command:

> npm start

this will expose the API to the address http://localhost:3000

### API Endpoints

There are 5 exposed endpoints. Those are also documented using swagger, with the API running check http://localhost:3000/api/docs

#### Stack
Get from stack
```
method: GET
path: /stack
description: Retrieve an item from the top of the stack and remove that item

responses:
    success
        status: 200
        body: {
            "message": "item has been removed from the stack pile",
            "stackSize": integer value with the remaining stack size,
            "item": "value retrivied"
        }
    error - stack is empty
        status: 400
        body: {
            "message": "Empty stack, could not retrieve an item from it",
        }

```

Add to stack
```
method: POST
path: /stack/add
description: Add an item to the top of the stack

request body: {
  "item": "some defined value to be added"
}

responses:
    success
        status: 200
        body: {
            "message": "item has been added to the stack pile",
            "stackSize": integer value with the stack size after adding,
            "item": "some defined value to be added"
        }
    error - bad request
        status: 400
        body: {
            "message": "A valid value for 'item' must be provided",
        }

```

#### Key-Value Store
Get from store
```
method: GET
path: /store/<:key>
description: Retrieve the value of a key-value pair by its key

responses:
    success
        status: 200
        body: {
            "value": "the value stored with the given key"
        }
    error - not found (if the key does not exists, or was unset due timeout)
        status: 404
```

Add to store
```
method: POST
path: /store/add
description: Add a key-value pair do the store

request body: {
  "key": string that maps to the 'value',
  "value": "some defined value",
  "ttl": optional integer value in seconds of the time to live for key-value,
}

responses:
    success
        status: 200
    error - bad request
        status: 400
        body: {
            "message": "Validation error",
        }
```

Delete from store
```
method: DELETE
path: /store/<:key>
description: Remove a value from the store by its key

responses:
    success
        status: 200
    error - not found (if the key does not exists, or was unset due timeout)
        status: 404
```

---
## Tests
The tests are using `Jest` as the test runner. To run the test, execute the following command:
> npm test

---
## TODOs

- Add a command line interface alternative for the interacting with the application
