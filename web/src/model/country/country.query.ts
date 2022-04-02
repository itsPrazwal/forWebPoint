import {TableName} from "../../utils/enum";
import {database} from "../../config";
import {ErrorObject} from "../../types";
import {FieldTypeCountry} from "./country.type";

const fetchAllCountry = () => {
    const sqlSelectAll = `SELECT * FROM ${TableName.COUNTRY}`

    return new Promise<ErrorObject | FieldTypeCountry[]>((resolve, reject) =>{
        database.all(sqlSelectAll, [], (err, rows) => {
            if(err){
                reject({error: err.message})
            }else{
                resolve(rows)
            }
        })
    })
}

const fetchCountryCount = () => {
    const sqlCount = `SELECT COUNT(*) as TotalCountry FROM ${TableName.COUNTRY}`

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

export {
    fetchAllCountry,
    fetchCountryCount
}