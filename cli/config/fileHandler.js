import fs from "fs";

const readFile = (filePath, format = 'utf-8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, format, (err, jsonString) => {
            if(err){
                console.log('Error fetching data: ', err)
                reject({error: 'Error fetching data'})
            }else{
                try{
                    const result = JSON.parse(jsonString)
                    resolve(result)
                }catch (err){
                    console.log('Error parsing JSON data: ', err)
                    reject({error: 'Error parsing JSON data'})
                }
            }
        })
    })
}

export {readFile}