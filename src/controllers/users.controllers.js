import passport from "passport"
import { appendJwtAsCookie } from "../middlewares/authenticate.js"
import { adminsOnly, usersOnly } from "../middlewares/authorization.js"
import { userService } from "../services/users.services.js"

export async function handleGet(req, res, next) {
    try {
        passport.authenticate('jwtAuth', {
            failWithError: true,
            session: false
        }),
        adminsOnly,
        await userService.readMany({}, {password: 0})
        res['successfulPost'](users)
    } catch (error) {
        next(error)
    }
}

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

export async function handlePost() {
    try {
        passport.authenticate('localRegister', {
            failWithError: true,
            session: false
        }),
        appendJwtAsCookie,
        async (req, res, next) => {
            res['successfulPost'](req.user)
        }
    } catch (error) {
        next(error)
    }}




