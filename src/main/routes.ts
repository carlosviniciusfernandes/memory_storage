import { Router, Express } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../presentation/openapi.json'
import store from '../data/providers/storeProvider'
import stack from '../data/providers/stackProvider'
import { StackController } from '../presentation/controllers/stackController'
import { StoreController } from '../presentation/controllers/storeController'

export default (app: Express): void => {
    const router = Router();
    const stackController = new StackController(stack)
    const storeController = new StoreController(store)

    // LIFO stack endpoints
    router.post('/stack/add', (req, res) => { stackController.addToStack(req, res) })
    router.get('/stack', (req, res) => { stackController.getFromStack(req, res) })

    // Key-Value store endpoints
    router.post('/store/add', (req, res) => { storeController.addToStore(req, res) })
    router.get('/store/:key', (req, res) => { storeController.getFromStore(req, res) })
    router.delete('/store/:key', (req, res) => { storeController.deleteFromStore(req, res) })

    // Swager API Documentation
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use('', router)
}
