import { Router, json, urlencoded} from "express";
import { messageManager } from "../dao/services/mongoDB/MessageManagerMongoDB.js";

export const apiMessageRouter = Router()

apiMessageRouter.use(json())
apiMessageRouter.use(urlencoded({ extended: true}))


apiMessageRouter.post('/mensajes', async (req, res) => {
    try {
        const mensaje = await messageManager.registrar(req.body)
        res.status(201).json(mensaje)
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})