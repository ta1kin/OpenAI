import { Router } from 'express'
import { protect } from '../middlewares/auth.middleware'
import docsController from './docs.controller'


const docsRouter = Router()

docsRouter.use( protect )

docsRouter.get( '/docs', docsController.getDocs )
docsRouter.get( '/docs/:id', docsController.getDoc )

docsRouter.put( '/docs', docsController.updateDocs )

docsRouter.delete( '/docs:id', docsController.deleteDoc )

export default docsRouter