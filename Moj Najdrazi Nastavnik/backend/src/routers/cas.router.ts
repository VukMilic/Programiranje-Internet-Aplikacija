import express from 'express'
import { CasController } from '../controllers/cas.controller'

const casRouter = express.Router()

casRouter.route('/getCasoviNastavnika').post(
    (req,res) => new CasController().getCasoviNastavnika(req,res)
)

casRouter.route('/getZahteviZaCasNastavnika').post(
    (req,res) => new CasController().getZahteviZaCasNastavnika(req,res)
)

casRouter.route('/setZahtevZaCas').post(
    (req,res) => new CasController().setZahtevZaCas(req,res)
)

casRouter.route('/getZahteviZaCasNastavnika').post(
    (req,res) => new CasController().getZahteviZaCasNastavnika(req,res)
)

casRouter.route('/setAccept').post(
    (req,res) => new CasController().setAccept(req,res)
)

casRouter.route('/setDecline').post(
    (req,res) => new CasController().setDecline(req,res)
)

casRouter.route('/setCasoviStatus').post(
    (req,res) => new CasController().setCasoviStatus(req,res)
)

export default casRouter