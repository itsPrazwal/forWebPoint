// open database connection in store.db
import sqlite3 from "sqlite3";
import {createTableQuery, generateInsetPlaceholder, insertTableQuery, selectAllTableQuery} from "../constants.js";

const db = new sqlite3.Database('./config/store.db',(err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQ-lite database.');
})

const createTable = async (tableName = '') => {
    return new Promise((resolve, reject) => {
        const createQuery = createTableQuery[tableName]
        db.run(createQuery, function(err){
            if(err){
                console.log(`Error creating ${tableName} table: `, err)
            } else {
                console.log(`Table created: ${tableName}`)
            }
            resolve(!err)
        })
    })
}

const insertIntoTable = async (tableName, data, subDataLength) => {
    return new Promise((resolve) => {
        const insertQuery = insertTableQuery[tableName].concat(generateInsetPlaceholder(data, subDataLength))
        return db.run(insertQuery, data, function(err) {
            if (err) {
                console.error(err.message);
            }else{
                console.log(`${this.changes} Rows inserted into ${tableName}`);
            }
            resolve(!err)
        });
    })

}

const selectFromTable = async (tableName, selectQuery = selectAllTableQuery[tableName], queryParams = []) => {
    return new Promise((resolve, reject) => {
        db.all(selectQuery, queryParams, function(err, row){
            if(err){
                console.log(`Error fetching data from ${tableName}: `, err)
                reject({ error: err })
            }else{
                resolve(row)
            }
        })
    })
}

const closeDbConnection = async () => {
    await db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('The database connection closed.');
    });
}


export {
    createTable,
    closeDbConnection,
    insertIntoTable,
    selectFromTable
}