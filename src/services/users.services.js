import {randomUUID} from 'crypto'
import { usersDao } from '../daos/index'
import { hasheadasSonIguales, hashear } from '../utils/criptografia'

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
        if(!user) throw new Error ('authentication error')
        if (!hasheadasSonIguales({
            recibida: password,
            almacenada: user.password
        })) throw new Error ('authetication error')
    }

}

export const userService = new UserService()