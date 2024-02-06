import { TypeOfError } from "./typeOfError.js";

export class ProductDoesntExistError extends Error {
    constructor() {
        super('No existe el producto');
        this.type = TypeOfError.PRODUCT_DOESNT_EXIST;
    }
}
