import express from 'express'
import { UcenikController } from '../controllers/ucenik.controller'

const ucenRouter = express.Router()

ucenRouter.route('/register').post(
    (req,res) => new UcenikController().register(req,res)
)

ucenRouter.route('/countStudents').get(
    (req,res) => new UcenikController().countStudents(req,res)
)

ucenRouter.route('/editSlika').post(
    (req,res) => new UcenikController().editSlika(req,res)
)

ucenRouter.route('/editIme').post(
    (req,res) => new UcenikController().editIme(req,res)
)

ucenRouter.route('/editPrezime').post(
    (req,res) => new UcenikController().editPrezime(req,res)
)

ucenRouter.route('/editAdresa').post(
    (req,res) => new UcenikController().editAdresa(req,res)
)

ucenRouter.route('/editMejl').post(
    (req,res) => new UcenikController().editMejl(req,res)
)

ucenRouter.route('/editKontakt').post(
    (req,res) => new UcenikController().editKontakt(req,res)
)

ucenRouter.route('/editTipSkole').post(
    (req,res) => new UcenikController().editTipSkole(req,res)
)

ucenRouter.route('/editRazred').post(
    (req,res) => new UcenikController().editRazred(req,res)
)

ucenRouter.route('/getUcenikByUsername').post(
    (req,res) => new UcenikController().getUcenikByUsername(req,res)
)
export default ucenRouter