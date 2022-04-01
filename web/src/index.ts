import { app } from './config'
import { makeErrorObject } from './utils'
import { commonResponse, responseCode } from './utils/constants'
import { combinedRouter } from './app.route'

app.use('/api', combinedRouter)

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    res.status(err.status || responseCode.INTERNAL_SERVER).send(makeErrorObject(err.message || commonResponse.error.INTERNAL_SERVER))
})
