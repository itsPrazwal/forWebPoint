import {TableName} from "../../utils/enum";
import {database} from "../../config";
import {ErrorObject} from "../../types";
import {FieldTypeSaleDB} from "./sales.type";
import {selectFromTable} from "../../config/database";

const fetchAllSale = () => {
    const sqlSelectAll = `SELECT * FROM ${TableName.SALES}`

    return new Promise<ErrorObject | FieldTypeSaleDB[]>((resolve, reject) =>{
        database.all(sqlSelectAll, [], (err, rows) => {
            if(err){
                reject({error: err.message})
            }else{
                resolve(rows)
            }
        })
    })
}

const fetchSaleCount = () => {
    const sqlCount = `SELECT COUNT(*) as TotalSale FROM ${TableName.SALES}`

    return new Promise<ErrorObject | number[]>((resolve, reject) =>{
        database.all(sqlCount, [], (err, rows) => {
            if(err){
                reject({error: err.message})
            }else{
                resolve(rows)
            }
        })
    })
}

const question3Query = () => {
    const selectSumSalesSQLQuery = `
        SELECT pe.name, SUM(sa.sale) as totalSales
        FROM ${TableName.PRODUCT} pe, ${TableName.SALES} sa
        WHERE pe.id=sa.petroleum_product_id
        GROUP BY sa.petroleum_product_id
    `;

    return selectFromTable(selectSumSalesSQLQuery)
}

const question4AQuery = () => {
    const selectMaxSaleSQLQuery = `
        SELECT s.year, s.countryName, MAX(s.totalSale) as maxSale FROM (
            SELECT co.name as countryName, sa.year as year, SUM(sa.sale) as totalSale
            FROM ${TableName.SALES} sa, ${TableName.COUNTRY} as co
            WHERE sa.country_id = co.id
            GROUP BY sa.year, sa.country_id
        ) s
        GROUP BY s.year
    `;

    return selectFromTable(selectMaxSaleSQLQuery)
}

const question4BQuery = () => {
    const selectMinSaleSQLQuery = `
        SELECT s.year, s.countryName, MIN(s.totalSale) as minSale FROM (
            SELECT co.name as countryName, sa.year as year, SUM(sa.sale) as totalSale
            FROM ${TableName.SALES} sa, ${TableName.COUNTRY} as co
            WHERE sa.country_id = co.id
            GROUP BY sa.year, sa.country_id
        ) s
        GROUP BY s.year
    `;

    return selectFromTable(selectMinSaleSQLQuery)
}

export {
    fetchAllSale,
    fetchSaleCount,
    question3Query,
    question4AQuery,
    question4BQuery
}