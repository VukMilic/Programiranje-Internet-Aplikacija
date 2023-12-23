"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredmetController = void 0;
const predmet_1 = __importDefault(require("../models/predmet"));
class PredmetController {
    constructor() {
        this.getPredmeti = (req, resp) => {
            predmet_1.default.find({}, (err, predmeti) => {
                if (err)
                    console.log(err);
                else
                    resp.json(predmeti);
            });
        };
    }
}
exports.PredmetController = PredmetController;
//# sourceMappingURL=predmet.controller.js.map