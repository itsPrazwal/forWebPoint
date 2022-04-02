import { Router } from 'express'
import { conFetchAllProducts, conFetchProductCount } from './product.controller'

const router = Router()

router.get('/', conFetchAllProducts)
router.get('/count', conFetchProductCount)

export { router as productRouter }
