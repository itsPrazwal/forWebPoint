import { Router } from 'express'
import { countryRouter, jsonRouter, productRouter, saleRouter } from './model'

const router = Router()

router.use('/json', jsonRouter)
router.use('/product', productRouter)
router.use('/country', countryRouter)
router.use('/sales', saleRouter)

export { router as combinedRouter }
