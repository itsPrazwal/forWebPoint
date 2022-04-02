import {TableName} from "../../utils/enum";
import {database} from "../../config";
import {ErrorObject} from "../../types";
import {FieldTypeProduct} from "./product.type";


const fetchAllProduct = () => {
    const sqlSelectAll = `SELECT * FROM ${TableName.PRODUCT}`

    return new Promise<ErrorObject | FieldTypeProduct[]>((resolve, reject) =>{
        database.all(sqlSelectAll, [], (err, rows) => {
            if(err){
                reject({error: err.message})
            }else{
                resolve(rows)
            }
        })
    })
}

const fetchProductCount = () => {
    const sqlCount = `SELECT COUNT(*) as TotalProduct FROM ${TableName.PRODUCT}`

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
    fetchAllProduct,
    fetchProductCount
}