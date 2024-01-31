import { Router } from "express";
import { handleDelete, handleGet, handleGetById, handlePost, handlePut } from "../controllers/products.controllers";
import { adminsOnly } from "../middlewares/authorization";

export const productsRouter = Router()

productsRouter.get('/', handleGet)

productsRouter.get('/:id', handleGetById)

productsRouter.post('/', adminsOnly, handlePost)

productsRouter.put('/:id', adminsOnly, handlePut)

productsRouter.delete('/:id', adminsOnly, handleDelete)

