import { Router } from "express";
import { cartRouter } from "./cart.router";
import { productsRouter } from "./products.router";
import { sessionRouter } from "./session.router";
import { usersRouter } from "./users.router";
import { metodosPersonalizados } from "../middlewares/metodosPersonalizados";


export const apiRouter = Router()

apiRouter.use(json())

apiRouter.use(metodosPersonalizados)

apiRouter.use('/cart', cartRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/session', sessionRouter)
apiRouter.use('/users', usersRouter)

apiRouter.use(errorHandler)