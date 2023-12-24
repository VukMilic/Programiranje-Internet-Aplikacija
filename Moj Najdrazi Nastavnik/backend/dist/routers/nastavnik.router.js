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
exports.default = nasRouter;
//# sourceMappingURL=nastavnik.router.js.map