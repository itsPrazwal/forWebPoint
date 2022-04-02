import { fetchAllProduct, fetchProductCount } from './product.query'
import { responseCode } from '../../utils/constants'

const conFetchAllProducts = (req, res, next) => {
  fetchAllProduct()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

const conFetchProductCount = (req, res, next) => {
  fetchProductCount()
    .then(data => {
      res.status(responseCode.OK).send(data)
    })
    .catch(err => {
      next({ status: responseCode.BAD_REQUEST, message: err.error })
    })
}

export {
  conFetchAllProducts,
  conFetchProductCount
}
