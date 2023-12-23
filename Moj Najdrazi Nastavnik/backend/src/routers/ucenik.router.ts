import express from 'express'
import { UcenikController } from '../controllers/ucenik.controller'

const ucenRouter = express.Router()

ucenRouter.route('/register').post(
    (req,res) => new UcenikController().register(req,res)
)

ucenRouter.route('/countStudents').get(
    (req,res) => new UcenikController().countStudents(req,res)
)

export default ucenRouter