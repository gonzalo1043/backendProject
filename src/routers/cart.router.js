import { Router } from "express";
import { handleDelete, handleDeleteAll, handleGet, handlePost, handlePostProtuctCart, handlePutCart, handlePutProductCart } from "../controllers/cart.controllers";
import { usersOnly } from "../middlewares/authorization";

export const cartRouter = Router()


cartRouter.get('/:cid', handleGet)

cartRouter.post('/', handlePost)

cartRouter.post('/:cid/products/:pid', usersOnly, handlePostProtuctCart)

cartRouter.put('/:cid', handlePutCart)

cartRouter.put('/:cid/products/:pid', handlePutProductCart)

cartRouter.delete('/:cid', handleDeleteAll)

cartRouter.delete('/:cid/products/:pid', handleDelete)

