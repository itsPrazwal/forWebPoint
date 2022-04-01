import {join} from 'path'

const DATABASE_NAME = 'store.db'
export const BCRYPT_SALT_ROUNDS = 10
export const DATABASE_STORE_LOCATION = join(process.cwd(), 'src/store/').concat(DATABASE_NAME)