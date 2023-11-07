import { Router } from "express";
import { ProductManager } from "../Services/ProductManager.js";
import { PRODUCTS_PATH } from "../src/config.js";

export const productsRouter = Router()

const pm = new ProductManager(PRODUCTS_PATH)

productsRouter.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const products = await pm.getProducts({limit})
        res.json(products)
})

productsRouter.get('/products/:id', async (req, res) => {
    const productosId = parseInt(req.params.id)
    const productWithId = await pm.getProductById(productosId)
    res.json(productWithId)
})

productsRouter.post('/products', async (req, res) => {
    const body = req.body
    res.json (await pm.addProduct({...body}))
})

productsRouter.put('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id)
    const productUpdate = req.body

    res.json(await pm.modificarProductos(productId, productUpdate ))
})

productsRouter.delete('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id)
    
    res.json(await pm.deleteProducts(productId))
})
