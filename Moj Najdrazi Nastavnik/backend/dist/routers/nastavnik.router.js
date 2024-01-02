"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nastavnik_controller_1 = require("../controllers/nastavnik.controller");
const nasRouter = express_1.default.Router();
nasRouter.route('/register').post((req, res) => new nastavnik_controller_1.NastavnikController().register(req, res));
nasRouter.route('/countTeachers').get((req, res) => new nastavnik_controller_1.NastavnikController().countTeachers(req, res));
nasRouter.route('/getNastavnici').get((req, res) => new nastavnik_controller_1.NastavnikController().getNastavnici(req, res));
nasRouter.route('/getNastavnikByUsername').post((req, res) => new nastavnik_controller_1.NastavnikController().getNastavnikByUsername(req, res));
nasRouter.route('/getOceneNastavnika').post((req, res) => new nastavnik_controller_1.NastavnikController().getOceneNastavnika(req, res));
nasRouter.route('/getOcene').get((req, res) => new nastavnik_controller_1.NastavnikController().getOcene(req, res));
nasRouter.route('/editIme').post((req, res) => new nastavnik_controller_1.NastavnikController().editIme(req, res));
nasRouter.route('/editPrezime').post((req, res) => new nastavnik_controller_1.NastavnikController().editPrezime(req, res));
nasRouter.route('/editAdresu').post((req, res) => new nastavnik_controller_1.NastavnikController().editAdresu(req, res));
nasRouter.route('/editMejl').post((req, res) => new nastavnik_controller_1.NastavnikController().editMejl(req, res));
nasRouter.route('/editKontakt').post((req, res) => new nastavnik_controller_1.NastavnikController().editKontakt(req, res));
nasRouter.route('/editUzrast').post((req, res) => new nastavnik_controller_1.NastavnikController().editUzrast(req, res));
nasRouter.route('/editPredmeti').post((req, res) => new nastavnik_controller_1.NastavnikController().editPredmeti(req, res));
nasRouter.route('/editSlika').post((req, res) => new nastavnik_controller_1.NastavnikController().editSlika(req, res));
exports.default = nasRouter;
//# sourceMappingURL=nastavnik.router.js.map