import express from 'express'
import { PredmetController } from '../controllers/predmet.controller'

const predRouter = express.Router()

predRouter.route('/getPredmeti').get(
    (req,res) => new PredmetController().getPredmeti(req,res)
)

export default predRouter