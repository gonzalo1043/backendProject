import express from 'express'
import { productsRouter } from './router/productsRouter.js'
import {PORT} from './config/serverConfig.js'
import { cartRouter } from './router/cartRouter.js'
import { MONGODB_CNX_STR } from './config/mongoDbConfig.js'
import mongoose from 'mongoose'
import { webMessagesRouter } from './router/webMessagesRouter.js'
import { engine } from 'express-handlebars'
import { apiMessageRouter } from './router/messageRouter.js'
import { messageManager } from './dao/services/mongoDB/MessageManagerMongoDB.js'

await mongoose.connect(MONGODB_CNX_STR)

const app = express()

app.engine('handlebars', engine())

app.use(express.json())

app.use('/static', express.static('./static'))


app.use('/api', productsRouter)
app.use('/api', cartRouter)
app.use('/api', apiMessageRouter)
app.use('/', webMessagesRouter)



app.listen(PORT, () => {
    console.log('Conectado al puerto 8080')
})

