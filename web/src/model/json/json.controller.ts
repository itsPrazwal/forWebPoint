import {readFile} from "../../utils/fileHandler";
import {errorResponse, JSON_FILE_PATH, responseCode, successResponse} from "../../utils/constants";
import {makeErrorObject, makeSuccessObject} from "../../utils";
import {ErrorObject, JsonDataType} from "../../types";

const fetchDataFromJson = async (req, res, next) => {
    const data = await readFile<JsonDataType[]>(JSON_FILE_PATH)
    if((data as ErrorObject).error){
        next(makeErrorObject(errorResponse.FETCH_FILE_DATA))
    }else{
        res.status(responseCode.OK).send(makeSuccessObject<JsonDataType[]>(data as JsonDataType[], successResponse.FETCH_FILE_DATA))
    }
}

const getTotalDataFromJson = async (req, res, next) => {
    const data = await readFile<JsonDataType[]>(JSON_FILE_PATH)
    if((data as ErrorObject).error){
        next(makeErrorObject(errorResponse.FETCH_FILE_DATA))
    }else{
        res.status(responseCode.OK).send(makeSuccessObject<number>((data as JsonDataType[]).length, successResponse.COUNT_FILE_DATA))
    }
}

export {
    fetchDataFromJson,
    getTotalDataFromJson
}