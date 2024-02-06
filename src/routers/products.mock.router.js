import { Router } from "express";
import { handleGet } from "../controllers/products.mock.controller.js";


export const productsMockRouter = Router()

productsMockRouter.get('/mockingproducts', handleGet)
