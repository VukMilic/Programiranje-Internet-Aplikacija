"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korRouter = express_1.default.Router();
korRouter.route('/login').post((req, res) => new korisnik_controller_1.KorisnikController().login(req, res));
korRouter.route('/findByUsername').post((req, res) => new korisnik_controller_1.KorisnikController().findByUsername(req, res));
korRouter.route('/findByEmail').post((req, res) => new korisnik_controller_1.KorisnikController().findByEmail(req, res));
korRouter.route('/getQuestion').post((req, res) => new korisnik_controller_1.KorisnikController().getQuestion(req, res));
korRouter.route('/confirmAnswer').post((req, res) => new korisnik_controller_1.KorisnikController().confirmAnswer(req, res));
korRouter.route('/setNewPassword').post((req, res) => new korisnik_controller_1.KorisnikController().setNewPassword(req, res));
korRouter.route('/setNewPasswordWithoutOldPassword').post((req, res) => new korisnik_controller_1.KorisnikController().setNewPasswordWithoutOldPassword(req, res));
exports.default = korRouter;
//# sourceMappingURL=korisnik.router.js.map