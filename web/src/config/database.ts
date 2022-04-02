import * as sqlite3 from "sqlite3";
import {createTableAttributes, DATABASE_STORE_LOCATION, tableAttributes} from "./constants";
import {TableName} from "../utils/enum";
import {ErrorObject, FunctionWithParamsAndReturn, GenericArray} from "../types";

const db = new sqlite3.Database(DATABASE_STORE_LOCATION, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQ-lite database.');
})

const generateCreateSQLQuery:FunctionWithParamsAndReturn<TableName, string> = (table) =>
    `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${createTableAttributes[table]})`;

const generateInsetPlaceholder = (data = [], subDataLength = 1):string => {
    const tempArray1 = [...Array(subDataLength)].map(() => 0)
    const tempArray2 = [...Array(data.length / subDataLength)].map(() => 0)

    if(data.length){
        return tempArray2.map(() => `(${subDataLength > 1 ? tempArray1.map(() => '?').join(',') : '?'})`).join(',')
    }
    return ''
}

const generateInsertSQLQuery:FunctionWithParamsAndReturn<{ table: TableName, data: GenericArray<any> }, string> = ({ table, data}) =>
    `INSERT INTO ${table}(${tableAttributes[table].join(',')}) VALUES `.concat(generateInsetPlaceholder(data, tableAttributes[table].length))

const createTable = async (table: TableName) => {
    return new Promise((resolve) => {

        db.run(generateCreateSQLQuery(table), function(err){
            if(err){
                console.log(`Error creating ${table} table: `, err)
            } else {
                console.log(`Table created: ${table}`)
            }
            resolve(!err)
        })
    })
}

const insertIntoTable = <T>(table: TableName, data: GenericArray<T>) => {
    return new Promise((resolve) => {

        db.run(generateInsertSQLQuery({table, data}), data, function(err) {
            if (err) {
                console.error(err.message);
            }else{
                console.log(`${this.changes} Rows inserted into ${table}`);
            }
            resolve(!err)
        });
    })
}

const selectFromTable = <T>(selectQuery: string, queryParams: GenericArray<any> = []):Promise<ErrorObject | T> => {
    return new Promise((resolve, reject) => {
        db.all(selectQuery, queryParams, function(err, row: T){
            if(err){
                reject({ error: err.message })
            }else{
                resolve(row)
            }
        })
    })
}

export {insertIntoTable, createTable, selectFromTable}
export default db