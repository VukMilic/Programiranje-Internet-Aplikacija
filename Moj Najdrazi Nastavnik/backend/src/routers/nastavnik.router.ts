import express from 'express'
import { NastavnikController } from '../controllers/nastavnik.controller'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const nasRouter = express.Router()

nasRouter.route('/register').post(
    (req,res) => new NastavnikController().register(req,res)
)

nasRouter.route('/sendCV').post( 
    upload.single('selectedCV'),
    (req,res) => new NastavnikController().sendCV(req,res)
)

nasRouter.route('/countTeachers').get(
    (req,res) => new NastavnikController().countTeachers(req,res)
)

nasRouter.route('/getNastavnici').get(
    (req,res) => new NastavnikController().getNastavnici(req,res)
)

nasRouter.route('/getNastavnikByUsername').post(
    (req,res) => new NastavnikController().getNastavnikByUsername(req,res)
)

nasRouter.route('/getOceneNastavnika').post(
    (req,res) => new NastavnikController().getOceneNastavnika(req,res)
)

nasRouter.route('/getOcene').get(
    (req,res) => new NastavnikController().getOcene(req,res)
)

nasRouter.route('/editIme').post(
    (req,res) => new NastavnikController().editIme(req,res)
)

nasRouter.route('/editPrezime').post(
    (req,res) => new NastavnikController().editPrezime(req,res)
)

nasRouter.route('/editAdresu').post(
    (req,res) => new NastavnikController().editAdresu(req,res)
)

nasRouter.route('/editMejl').post(
    (req,res) => new NastavnikController().editMejl(req,res)
)

nasRouter.route('/editKontakt').post(
    (req,res) => new NastavnikController().editKontakt(req,res)
)

nasRouter.route('/editUzrast').post(
    (req,res) => new NastavnikController().editUzrast(req,res)
)

nasRouter.route('/editPredmeti').post(
    (req,res) => new NastavnikController().editPredmeti(req,res)
)

nasRouter.route('/editSlika').post(
    (req,res) => new NastavnikController().editSlika(req,res)
)

nasRouter.route('/getSveZahteve').get(
    (req,res) => new NastavnikController().getSveZahteve(req,res)
)

export default nasRouter