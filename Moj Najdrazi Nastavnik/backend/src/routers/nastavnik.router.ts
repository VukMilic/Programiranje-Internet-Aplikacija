import express from 'express'
import { NastavnikController } from '../controllers/nastavnik.controller'

const nasRouter = express.Router()

nasRouter.route('/register').post(
    (req,res) => new NastavnikController().register(req,res)
)

nasRouter.route('/countTeachers').get(
    (req,res) => new NastavnikController().countTeachers(req,res)
)

nasRouter.route('/getNastavnici').get(
    (req,res) => new NastavnikController().getNastavnici(req,res)
)

export default nasRouter