"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NastavnikController = void 0;
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
class NastavnikController {
    constructor() {
        this.register = (req, resp) => {
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                let noviNastavnik = new nastavnik_1.default({
                    kor_ime: req.body.username,
                    lozinka: hash,
                    pitanje: req.body.question,
                    odgovor: req.body.answer,
                    ime: req.body.firstname,
                    prezime: req.body.lastname,
                    pol: req.body.sex,
                    adresa: req.body.address,
                    kontakt: req.body.phone,
                    mejl: req.body.email,
                    tip: "nastavnik",
                    slika: req.body.selectedImage,
                    CV: req.body.selectedCV,
                    predmeti: req.body.predmeti,
                    uzrast: req.body.uzrasti,
                    odgovorZaSajt: req.body.odgovorZaSajt
                });
                noviNastavnik.save((err, res) => {
                    if (err)
                        console.log(err);
                    else
                        resp.json({ "message": "ok" });
                });
            });
        };
        this.countTeachers = (req, resp) => {
            nastavnik_1.default.count({}, (err, num) => {
                if (err)
                    console.log(err);
                else
                    resp.json(num);
            });
        };
        this.getNastavnici = (req, resp) => {
            nastavnik_1.default.find({}, (err, nastavnici) => {
                if (err)
                    console.log(err);
                else
                    resp.json(nastavnici);
            });
        };
    }
}
exports.NastavnikController = NastavnikController;
//# sourceMappingURL=nastavnik.controller.js.map