import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller'

const korRouter = express.Router()

korRouter.route('/login').post(
    (req,res) => new KorisnikController().login(req,res)
)

korRouter.route('/findByUsername').post(
    (req,res) => new KorisnikController().findByUsername(req,res)
)

korRouter.route('/findByEmail').post(
    (req,res) => new KorisnikController().findByEmail(req,res)
)

korRouter.route('/getQuestion').post(
    (req,res) => new KorisnikController().getQuestion(req,res)
)

korRouter.route('/confirmAnswer').post(
    (req,res) => new KorisnikController().confirmAnswer(req,res)
)

korRouter.route('/setNewPassword').post(
    (req,res) => new KorisnikController().setNewPassword(req,res)
)

korRouter.route('/setNewPasswordWithoutOldPassword').post(
    (req,res) => new KorisnikController().setNewPasswordWithoutOldPassword(req,res)
)

export default korRouter