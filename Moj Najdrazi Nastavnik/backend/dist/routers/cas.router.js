"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cas_controller_1 = require("../controllers/cas.controller");
const casRouter = express_1.default.Router();
casRouter.route('/getCasoviNastavnika').post((req, res) => new cas_controller_1.CasController().getCasoviNastavnika(req, res));
casRouter.route('/getZahteviZaCasNastavnika').post((req, res) => new cas_controller_1.CasController().getZahteviZaCasNastavnika(req, res));
casRouter.route('/setZahtevZaCas').post((req, res) => new cas_controller_1.CasController().setZahtevZaCas(req, res));
casRouter.route('/getZahteviZaCasNastavnika').post((req, res) => new cas_controller_1.CasController().getZahteviZaCasNastavnika(req, res));
casRouter.route('/setAccept').post((req, res) => new cas_controller_1.CasController().setAccept(req, res));
casRouter.route('/setDecline').post((req, res) => new cas_controller_1.CasController().setDecline(req, res));
casRouter.route('/setCasoviStatus').post((req, res) => new cas_controller_1.CasController().setCasoviStatus(req, res));
exports.default = casRouter;
//# sourceMappingURL=cas.router.js.map