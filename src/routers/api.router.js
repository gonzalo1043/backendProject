import { Router, json } from "express";
import { cartRouter } from "./cart.router.js";
import { productsRouter } from "./products.router.js";
import { sessionRouter } from "./session.router.js";
import { usersRouter } from "./users.router.js";
import { metodosPersonalizados } from "../middlewares/metodosPersonalizados.js";
import { productsMockRouter } from "./products.mock.router.js";
import { errorHandler } from "../middlewares/errorHandler.js";


export const apiRouter = Router()

apiRouter.use(json())

apiRouter.use(metodosPersonalizados)

apiRouter.use('/cart', cartRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/session', sessionRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/', productsMockRouter)

apiRouter.use(errorHandler)