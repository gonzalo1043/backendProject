import {randomUUID} from 'crypto'
import { usersDao } from '../daos/index.js'
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'
import { AuthenticationError } from '../models/errors/AuthenticationError.js'



class UserService {
    async readOne(criteria) {
        return await usersDao.readOne(criteria)
    }

    async readMany(criteria) {
        return await usersDao.readMany(criteria)
    }

    async register (userData) {
        userData.password = hashear(userData.password)
        const user = await usersDao.create(userData)
    }

    async login ({username, password}) {
        const user = await usersDao.readOne({username})
        if(!user) {
            throw AuthenticationError()
        }
        if (!hasheadasSonIguales({
            recibida: password,
            almacenada: user.password
        })) throw AuthenticationError()
    }

}

export const userService = new UserService()