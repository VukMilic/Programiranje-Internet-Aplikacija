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
exports.default = ucenRouter;
//# sourceMappingURL=ucenik.router.js.map