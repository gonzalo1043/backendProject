import session from 'express-session'
import connectMongo from 'connect-mongo'
import { CNX_STR } from '../config/config.js'

const store = connectMongo.create({
    mongoUrl:CNX_STR,
    // ttl: 60
})

export const sessions = session ({
    store, 
    secret: 'secretProyect',
    resave: true, 
    saveUninitialized: true
})


