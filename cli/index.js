#!/usr/bin/env node
import { readFile } from './config/fileHandler.js';
import { createTable, insertIntoTable, selectFromTable } from './config/database.js';
import { tableNames} from "./constants.js";

// CREATING A ASYNC FUNCTION THAT CALLS ITSELF
(async () => {

    // CREATING REQUIRED TABLES
    const countryTableCreated = await createTable(tableNames.COUNTRY);
    const petroleumTableCreated = await createTable(tableNames.PETROLEUM);
    const salesTableCreated = await createTable(tableNames.SALES);

    // FETCHING DATA FROM data.json file
    const data = await readFile('./config/data.json')

    if(!data.error && data.length){
        console.log('TOTAL JSON DATA: ', data.length)

        if(petroleumTableCreated){
            // MAKING ARRAY FOR PETROLEUM PRODUCTS
            const petroleumProductArray = data.reduce((acc, curr) => acc && !acc.includes(curr.petroleum_product) ? [...acc, curr.petroleum_product] : acc, [])

            // INSERTING THE ARRAY VALUES TO ITS TABLE
            await insertIntoTable(tableNames.PETROLEUM, petroleumProductArray)
        }

        if(countryTableCreated){
            // MAKING ARRAY FOR PETROLEUM PRODUCTS
            const countryArray = data.reduce((acc, curr) => acc && !acc.includes(curr.country) ? [...acc, curr.country] : acc, [])

            // INSERTING THE ARRAY VALUES TO ITS TABLE
            await insertIntoTable(tableNames.COUNTRY, countryArray)
        }

        if(petroleumTableCreated && countryTableCreated && salesTableCreated){
            // FETCHING THE LIST OF COUNTRIES & PETROLEUM PRODUCTS (to get ID)
            const countryList = await selectFromTable(tableNames.COUNTRY)
            const petroleumList = await selectFromTable(tableNames.PETROLEUM)

            // FUNCTIONS TO GET ID
            const getCountryId = country => {
                return countryList?.filter(val => val.name === country)[0]?.id || null
            }
            const getProductId = petroleumProduct => {
                return petroleumList?.filter(val => val.name === petroleumProduct)[0]?.id || null
            }

            // MAKING FINAL ARRAY OF SALES
            const salesArray = []

            data.map((val) => {
                salesArray.push(getCountryId(val.country))
                salesArray.push(getProductId(val.petroleum_product))
                salesArray.push(val.sale)
                salesArray.push(val.year)
            })

            // INSERTING THE VALUES TO SALES TABLE
            await insertIntoTable(tableNames.SALES, salesArray, 4)
        }
    }
})();


