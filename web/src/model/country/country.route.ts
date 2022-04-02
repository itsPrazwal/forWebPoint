import {Router} from "express";
import {conFetchAllCountries, conFetchCountryCount} from "./country.controller";

const router = Router()

router.get('/', conFetchAllCountries)
router.get('/count', conFetchCountryCount)

export { router as countryRouter }