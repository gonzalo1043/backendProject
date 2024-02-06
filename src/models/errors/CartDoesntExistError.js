import { TypeOfError } from "./typeOfError.js";

export class CartDoesntExistError extends Error {
    constructor() {
        super('No existe el carrito');
        this.type = TypeOfError.CART_DOESNT_EXIST;
    }
}
