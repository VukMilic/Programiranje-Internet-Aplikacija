"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const predmet_controller_1 = require("../controllers/predmet.controller");
const predRouter = express_1.default.Router();
predRouter.route('/getPredmeti').get((req, res) => new predmet_controller_1.PredmetController().getPredmeti(req, res));
exports.default = predRouter;
//# sourceMappingURL=predmet.router.js.map