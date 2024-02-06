import { Router } from "express";
import { handleDelete, handleGetCurrent, handlePost } from "../controllers/session.controllers.js";

export const sessionRouter = Router()

sessionRouter.post('/', handlePost )

sessionRouter.get('/current', handleGetCurrent)

sessionRouter.delete('/current', handleDelete)