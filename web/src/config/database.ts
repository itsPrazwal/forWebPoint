import * as sqlite3 from "sqlite3";
import {DATABASE_STORE_LOCATION} from "./constants";

const db = new sqlite3.Database(DATABASE_STORE_LOCATION, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQ-lite database.');
})

export default db