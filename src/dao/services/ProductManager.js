import { ProductManagerArchivos } from './fileSystem/ProductManagerArchivos.js';
import { ProductManagerMongoDB } from './mongoDB/ProductManagerMongoDB.js';


// export const productsManager = new ProductManagerArchivos('./db/product.json')

export const productManager = new ProductManagerMongoDB()

