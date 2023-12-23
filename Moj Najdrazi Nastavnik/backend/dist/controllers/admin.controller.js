"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_1 = __importDefault(require("../models/admin"));
class AdminController {
    constructor() {
        this.login = (req, resp) => {
            const bcrypt = require('bcrypt');
            let username = req.body.username;
            let password = req.body.password;
            admin_1.default.findOne({ "kor_ime": username }, (err, adm) => {
                if (err)
                    console.log(err);
                else {
                    if (adm)
                        bcrypt.compare(password, adm.lozinka, function (err, result) {
                            if (result == true)
                                resp.json(adm);
                            else
                                resp.json(null);
                        });
                    else
                        resp.json(null);
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map