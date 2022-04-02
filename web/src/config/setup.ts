import { TableName } from '../utils/enum'
import { createTable, insertIntoTable, selectFromTable } from './database'
import { readFile } from '../utils'
import { ErrorObject, JsonDataType } from '../types'
import { JSON_FILE_PATH } from '../utils/constants'
import { selectAllSQLQuery } from './constants'
import { FieldTypeCountryDB } from '../model/country/country.type'
import { FieldTypeProductDB } from '../model/product/product.type';

(async () => {
  // CREATING REQUIRED TABLES
  const countryTableCreated = await createTable(TableName.COUNTRY)
  const petroleumTableCreated = await createTable(TableName.PRODUCT)
  const salesTableCreated = await createTable(TableName.SALES)

  // FETCHING DATA FROM data.json file
  const data = await readFile<JsonDataType[]>(JSON_FILE_PATH)

  if (!(data as ErrorObject).error && (data as JsonDataType[]).length) {
    console.log('TOTAL JSON DATA: ', (data as JsonDataType[]).length)

    if (petroleumTableCreated) {
      // MAKING ARRAY FOR PETROLEUM PRODUCTS
      const petroleumProductArray = (data as JsonDataType[]).reduce<string[]>((acc, curr) => acc && !acc.includes(curr.petroleum_product) ? [...acc, curr.petroleum_product] : acc, [])

      // INSERTING THE ARRAY VALUES TO ITS TABLE
      await insertIntoTable<string>(TableName.PRODUCT, petroleumProductArray)
    }

    if (countryTableCreated) {
      // MAKING ARRAY FOR PETROLEUM PRODUCTS
      const countryArray = (data as JsonDataType[]).reduce<string[]>((acc, curr) => acc && !acc.includes(curr.country) ? [...acc, curr.country] : acc, [])

      // INSERTING THE ARRAY VALUES TO ITS TABLE
      await insertIntoTable(TableName.COUNTRY, countryArray)
    }

    if (petroleumTableCreated && countryTableCreated && salesTableCreated) {
      // FETCHING THE LIST OF COUNTRIES & PETROLEUM PRODUCTS (to get ID)
      const countryList = await selectFromTable<FieldTypeCountryDB[]>(selectAllSQLQuery[TableName.COUNTRY])
      const petroleumList = await selectFromTable<FieldTypeCountryDB[]>(selectAllSQLQuery[TableName.PRODUCT])

      // FUNCTIONS TO GET ID
      const getCountryId = country => {
        return (countryList as FieldTypeCountryDB[]).filter(val => val.name === country)[0]?.id || null
      }
      const getProductId = petroleumProduct => {
        return (petroleumList as FieldTypeProductDB[]).filter(val => val.name === petroleumProduct)[0]?.id || null
      }

      // MAKING FINAL ARRAY OF SALES
      const salesArray = [];

      (data as JsonDataType[]).forEach((val) => {
        salesArray.push(getCountryId(val.country))
        salesArray.push(getProductId(val.petroleum_product))
        salesArray.push(val.sale)
        salesArray.push(val.year)
      })

      // INSERTING THE VALUES TO SALES TABLE
      await insertIntoTable(TableName.SALES, salesArray)
    }
  }
})()
