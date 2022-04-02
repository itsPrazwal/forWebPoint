import {join} from 'path'
import {TableName} from "../utils/enum";

const DATABASE_NAME = 'store.db'

export const DATABASE_STORE_LOCATION = join(process.cwd(), 'src/store/').concat(DATABASE_NAME)

export const tableAttributes = {
    [TableName.PRODUCT]: ['name'],
    [TableName.COUNTRY]: ['name'],
    [TableName.SALES]: ['sale', 'year', 'petroleum_product_id', 'country_id'],
}

export const createTableAttributes = {
    [TableName.PRODUCT]: `name TEXT`,
    [TableName.COUNTRY]: `name Text`,
    [TableName.SALES]: `sale INTEGER, year INTEGER, petroleum_product_id INTEGER, country_id INTEGER, FOREIGN KEY(petroleum_product_id) REFERENCES petroleum_product(id), FOREIGN KEY(country_id) REFERENCES country(id)`
}


export const selectAllSQLQuery = {
    [TableName.PRODUCT]: `SELECT * FROM ${TableName.PRODUCT}`,
    [TableName.COUNTRY]: `SELECT * FROM ${TableName.COUNTRY}`,
    [TableName.SALES]: `SELECT * FROM ${TableName.SALES}`
}