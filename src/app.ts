import express from 'express'
import cookieSession from 'cookie-session'
import 'express-async-errors'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUser } from './middlewares/current-user'
import { authRouter } from './auth/router'
import { eventRouter } from './event/router'
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/apidoc';


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.set('trust proxy', true)
app.use(cookieSession({
    signed: false,
}))
app.use(currentUser)
app.use(authRouter)
app.use(eventRouter)
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.all('*', async (req, res) => {
    throw new NotFoundError()
})


app.use(errorHandler)

export {app}