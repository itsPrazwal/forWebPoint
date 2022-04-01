import * as dotenv from 'dotenv-safe'
import * as path from 'path'

// import .env variables
dotenv.config({
  path: path.join(process.cwd(), './.env'),
  sample: path.join(process.cwd(), './.env.example')
})

export const envVars = {
  ENVIRONMENT: process.env.NODE_ENV,
  PORT: process.env.NODE_PORT
}
