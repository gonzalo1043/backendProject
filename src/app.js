import express from 'express'
import { productsRouter } from '../Router/productsRouter.js'
import { PORT } from './config.js'
import { cartRouter } from '../Router/cartRouter.js'

const app = express()

app.use(express.json())

app.use('/api', productsRouter)
app.use('/api', cartRouter)

app.listen(PORT, () => {
    console.log('Conectado al puerto 8080')
})

