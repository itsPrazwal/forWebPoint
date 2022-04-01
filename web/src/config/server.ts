import * as express from 'express'
import { envVars } from './vars'
import * as cors from 'cors'

const server = express()

const PORT = envVars.PORT

server.use(cors())

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

// Loading Files
server.use(express.static('files'))

server.listen(parseInt(PORT), '', 0,() => {
  /* eslint-disable */
  console.log('Server listening at port ' + PORT)
  /* eslint-enable */
})

export { server as app }
