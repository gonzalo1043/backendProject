import express from 'express'
import { apiRouter } from '../routers/api.router'
import express from 'express'
import { engine } from 'express-handlebars'
import { sessions } from './middleware/session.js'
import { apiRouter } from './router/api/apirestRouter.js'
import autenticacion from './middleware/passport.js'
import cors from 'cors'

export const app = express()

app.use(cors)
app.use('/static', express.static('./static'))
app.use(sessions)
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(autenticacion)

app.use('api', apiRouter)