"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UcenikController = void 0;
const ucenik_1 = __importDefault(require("../models/ucenik"));
class UcenikController {
    constructor() {
        this.register = (req, resp) => {
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                let noviUcenik = new ucenik_1.default({
                    kor_ime: req.body.username,
                    lozinka: hash,
                    pitanje: req.body.question,
                    odgovor: req.body.answer,
                    ime: req.body.firstname,
                    prezime: req.body.lastname,
                    pol: req.body.sex,
                    adresa: req.body.adress,
                    kontakt: req.body.phone,
                    mejl: req.body.email,
                    tip: "ucenik",
                    slika: req.body.selectedImage,
                    tipSkole: req.body.tipSkole,
                    razred: req.body.razred
                });
                noviUcenik.save((err, res) => {
                    if (err)
                        console.log(err);
                    else
                        resp.json({ "message": "ok" });
                });
            });
        };
        this.countStudents = (req, resp) => {
            ucenik_1.default.count({}, (err, num) => {
                if (err)
                    console.log(err);
                else
                    resp.json(num);
            });
        };
    }
}
exports.UcenikController = UcenikController;
//# sourceMappingURL=ucenik.controller.js.map