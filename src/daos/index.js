import mongoose from "mongoose";
import { CNX_STR } from "../config/config";
import { CartDao } from "./cart.daos";
import { ProductDao } from "./products.daos";
import { UsersDao } from "./users.daos";
import { TicketDao } from "./ticket.daos";

await mongoose.connect(CNX_STR)
console.log(`conectado a base de datos en: ${CNX_STR}`)

export const cartDao = new CartDao
export const productDao = new ProductDao
export const usersDao = new UsersDao
export const ticketDao = new TicketDao