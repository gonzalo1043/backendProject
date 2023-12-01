import { Message } from "../../models/MessageMongoose.js";
import {randomUUID} from 'crypto'

class MessageManagerMongoDB {
    async registrar (datosMensaje) {
        const mensaje = await Message.create(datosMensaje)
        return mensaje.toObject()    
    }

    async consultar() {
        return await Message.find().lean()
    }
}

export const messageManager = new MessageManagerMongoDB()
