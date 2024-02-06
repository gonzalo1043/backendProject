import {productServiceMock } from "../services/products.services.mock.js";


export async function handleGet () {
    try {
        res.status(201).json(await productServiceMock.readMany({}))
    } catch (error) {
        next(error)
    }
}