import * as path from "path";

const JSON_FILE_NAME = 'mockData.json'

export const JSON_FILE_PATH = path.join(process.cwd(), '/src/store/').concat(JSON_FILE_NAME)
