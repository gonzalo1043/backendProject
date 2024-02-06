import { TypeOfError } from "../models/errors/typeOfError.js";

export function errorHandler(error, req, res, next) {
    if(error.type === TypeOfError.CART_DOESNT_EXIST || TypeOfError.PRODUCT_DOESNT_EXIST) {
      res.status(404)
    } else if (error.type === TypeOfError.AUTHENTICATION) {
        
    } else {
        res.status(500)
    }
    res.json({
      status: 'error',
      message: error.message,
    })
  }
