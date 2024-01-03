"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ucenik_controller_1 = require("../controllers/ucenik.controller");
const ucenRouter = express_1.default.Router();
ucenRouter.route('/register').post((req, res) => new ucenik_controller_1.UcenikController().register(req, res));
ucenRouter.route('/countStudents').get((req, res) => new ucenik_controller_1.UcenikController().countStudents(req, res));
ucenRouter.route('/editSlika').post((req, res) => new ucenik_controller_1.UcenikController().editSlika(req, res));
ucenRouter.route('/editIme').post((req, res) => new ucenik_controller_1.UcenikController().editIme(req, res));
ucenRouter.route('/editPrezime').post((req, res) => new ucenik_controller_1.UcenikController().editPrezime(req, res));
ucenRouter.route('/editAdresa').post((req, res) => new ucenik_controller_1.UcenikController().editAdresa(req, res));
ucenRouter.route('/editMejl').post((req, res) => new ucenik_controller_1.UcenikController().editMejl(req, res));
ucenRouter.route('/editKontakt').post((req, res) => new ucenik_controller_1.UcenikController().editKontakt(req, res));
ucenRouter.route('/editTipSkole').post((req, res) => new ucenik_controller_1.UcenikController().editTipSkole(req, res));
ucenRouter.route('/editRazred').post((req, res) => new ucenik_controller_1.UcenikController().editRazred(req, res));
ucenRouter.route('/getUcenikByUsername').post((req, res) => new ucenik_controller_1.UcenikController().getUcenikByUsername(req, res));
exports.default = ucenRouter;
//# sourceMappingURL=ucenik.router.js.map