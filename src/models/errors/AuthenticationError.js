import { TypeOfError } from "./typeOfError.js";

export class AuthenticationError extends Error {
    constructor() {
        super('No existe el producto');
        this.type = TypeOfError.AUTHENTICATION_ERROR;
    }
}
