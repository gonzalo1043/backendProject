import { Router } from "express";
import { handleDelete, handleDeleteAll, handleGet, handlePost, handlePostProtuctCart, handlePutCart, handlePutProductCart } from "../controllers/cart.controllers";

export const cartRouter = Router()


cartRouter.get('/:cid', handleGet)

cartRouter.post('/', handlePost)

cartRouter.post('/:cid/products/:pid', handlePostProtuctCart)

cartRouter.put('/:cid', handlePutCart)

cartRouter.put('/:cid/products/:pid', handlePutProductCart)

cartRouter.delete('/:cid', handleDeleteAll)

cartRouter.delete('/:cid/products/:pid', handleDelete)

