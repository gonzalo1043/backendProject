import passport from "passport"
import { appendJwtAsCookie, removeJwtFromCookies } from "../middlewares/authenticate"
import { usersOnly } from "../middlewares/authorization"

// login
export async function handlePost(req, res, next) {
    try {
        passport.authenticate('localLogin', {
            failWithError: true,
            session: false
        }),
        appendJwtAsCookie,
        res['successfulPost'](req.user)
    } catch (error) {
        next(error)
    }}

//viwe
export async function handleGetCurrent(req, res, next) {
    try {
        passport.authenticate('jwtAuth', {
            failWithError: true,
            session: false
        }),
        usersOnly,
        res['successfulGet'](req.user)
    } catch (error) {
        next(error)
    }
}


//logout
export async function handleDelete(req, res, next) {
    try {
        removeJwtFromCookies,
        res['successfulDelete']()
    } catch (error) {
        next(error)
    }
}





