import { fetchAllCountry, fetchCountryCount } from './country.query'
import { responseCode } from '../../utils/constants'

const conFetchAllCountries = (req, res, next) => {
  fetchAllCountry()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

const conFetchCountryCount = (req, res, next) => {
  fetchCountryCount()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

export {
  conFetchAllCountries,
  conFetchCountryCount
}
