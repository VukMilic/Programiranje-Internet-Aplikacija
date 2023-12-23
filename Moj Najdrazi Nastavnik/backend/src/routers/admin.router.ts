import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const admRouter = express.Router()

admRouter.route('/login').post(
    (req,res) => new AdminController().login(req,res)
)

export default admRouter