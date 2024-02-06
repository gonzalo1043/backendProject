import mongoose from "mongoose";
import { CNX_STR } from "../config/config.js";
import { CartDao } from "./cart.daos.js";
import { ProductDao } from "./products.daos.js";
import { UsersDao } from "./users.daos.js";
import { TicketDao } from "./ticket.daos.js";

await mongoose.connect(CNX_STR)
console.log(`conectado a base de datos en: ${CNX_STR}`)

export const cartDao = new CartDao
export const productDao = new ProductDao
export const usersDao = new UsersDao
export const ticketDao = new TicketDao