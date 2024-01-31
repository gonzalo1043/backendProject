import { Router } from "express";
import { handleGet, handleGetCurrent, handlePost } from "../controllers/users.controllers";

export const usersRouter = Router()

usersRouter.post('/', handlePost)

usersRouter.get('/current', handleGetCurrent)

usersRouter.get('/', handleGet)

