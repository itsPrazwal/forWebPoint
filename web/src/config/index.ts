// Initiating configuration of database
import database from './database'

// Initializing configuration of server
import './server'

// Exporting environment variables, server and database instance
export * from './vars'
export * from './server'
export * from './constants'
export { database }