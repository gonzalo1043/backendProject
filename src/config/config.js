import { Command } from "commander"
import dotenv from 'dotenv'

const CNX_STR_REMOTO = 'mongodb+srv://gonzalociresa1:perro123@cluster0.m0kcvtz.mongodb.net/clases'
const CNX_STR_LOCAL =  'mongodb://localhost:8080'

const program = new Command ()
program
    .option('-p, --prod', 'entorno de ejecucion', false)
    .parse()  

const {prod} = program.opts()

dotenv.config({
    path: prod ? './config/prod.env' : './config/dev.env'
})

export const PORT = process.env.PORT;
export const MODE = process.env.MODE
export const CNX_STR = process.env.CNX_STR

export const JWT_PRIVATE_KEY = 'jwtsecret'
export const COOKIE_SECRET = 'cookiesecret'
export const PRODUCTS_PATH = './db/product.json';
export const CARTPATH = './db/cart.json';
export const SESSION_SECRET = 'SecretCoder'




