import * as fs from "fs";
import {ErrorObject} from "../types";

const readFile = <T>(filePath: string):Promise<ErrorObject | T> => {
    return new Promise<ErrorObject | T>((resolve) => {
        fs.readFile(filePath, (err, jsonString) => {
            if(err){
                console.log('Error fetching data: ', err)
                resolve({error: 'Error fetching data'})
            }else{
                try{
                    const result = JSON.parse(jsonString.toString('utf-8'))
                    resolve(result)
                }catch (err){
                    console.log('Error parsing JSON data: ', err)
                    resolve({error: 'Error parsing JSON data'})
                }
            }
        })
    })
}

export { readFile }