import { fetchAllSale, fetchSaleCount, question3Query, question4AQuery, question4BQuery } from './sales.query'
import { responseCode } from '../../utils/constants'

const conFetchAllSales = (req, res, next) => {
  fetchAllSale()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

const conFetchSaleCount = (req, res, next) => {
  fetchSaleCount()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

const conQuestion3 = (req, res, next) => {
  question3Query()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

const conQuestion4A = (req, res, next) => {
  question4AQuery()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

const conQuestion4B = (req, res, next) => {
  question4BQuery()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

export {
  conFetchAllSales,
  conFetchSaleCount,
  conQuestion3,
  conQuestion4A,
  conQuestion4B
}
