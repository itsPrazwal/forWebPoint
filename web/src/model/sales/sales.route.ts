import {Router} from "express";
import {conFetchAllSales, conFetchSaleCount, conQuestion3, conQuestion4A, conQuestion4B} from "./sales.controller";

const router = Router()

router.get('/', conFetchAllSales)
router.get('/count', conFetchSaleCount)
router.get('/question3', conQuestion3)
router.get('/question4A', conQuestion4A)
router.get('/question4B', conQuestion4B)

export { router as saleRouter }