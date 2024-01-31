import { Router } from "express";
import { handleDelete, handleGet, handleGetById, handlePost, handlePut } from "../controllers/products.controllers";

export const productsRouter = Router()

productsRouter.get('/', handleGet)

productsRouter.get('/:id', handleGetById)

productsRouter.post('/', handlePost)

productsRouter.put('/:id', handlePut)

productsRouter.delete('/:id', handleDelete)

