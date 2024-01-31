import { CartService } from "./cart.services";
import { productService } from "./products.services";

class PurchaseService {
    async stock (cartId) {
        const cart = await CartService.readOne({_id: cartId})

        const products = cart.products
        
        const prodIds = products.map(p => p._id)

        for (const pid of prodIds) {
            const product = await productService.readOne({_id: pid})
            const stock = product.stock
            if (stock < products.quantity) throw new Error ('no hay stock')

            if(stock > quantity) {
                
            }
        }
    }
}
