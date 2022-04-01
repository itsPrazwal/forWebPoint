import { Router } from "express";
import {jsonRouter} from "./model";

const router = Router()

router.use('/json', jsonRouter)
// router.use('/table')
// router.use('/query')

export { router as combinedRouter }