import {Router} from "express"

export const webMessagesRouter = Router()

webMessagesRouter.get('/mensaje', async (req, res) => {
    res.render('chats.handlebars', {titulo: 'mensajes'} )
})


