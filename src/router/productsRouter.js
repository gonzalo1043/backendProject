import { Router } from "express";
// import { PRODUCTS_PATH } from "../src/config.js";
import { productManager } from "../dao/services/ProductManager.js";

export const productsRouter = Router()


productsRouter.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const products = await productManager.getProducts({limit})
        res.json(products)
})

productsRouter.get('/products/:id', async (req, res) => {
    try {
        const productosId = req.params.id
        const productWithId = await productManager.getProductById(productosId)
        res.json(productWithId)
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

productsRouter.post('/products', async (req, res) => {
    try {
        const body = req.body
        res.json (await productManager.addProduct({...body}))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

productsRouter.put('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const productUpdate = req.body
    
        res.json(await productManager.modificarProductos(productId, productUpdate ))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

productsRouter.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        
        res.json(await productManager.deleteProducts(productId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})
