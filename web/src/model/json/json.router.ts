import { Router } from 'express'
import { fetchDataFromJson, getTotalDataFromJson } from './json.controller'

const router = Router()

router.get('/fetch', fetchDataFromJson)
router.get('/count', getTotalDataFromJson)

export { router as jsonRouter }
