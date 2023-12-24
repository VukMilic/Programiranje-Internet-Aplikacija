"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NastavnikController = void 0;
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const ocena_1 = __importDefault(require("../models/ocena"));
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
        this.getNastavnikByUsername = (req, resp) => {
            let username = req.body.username;
            nastavnik_1.default.findOne({ "kor_ime": username }, (err, nas) => {
                if (err)
                    console.log(err);
                else if (nas)
                    resp.json(nas);
                else
                    resp.json(null);
            });
        };
        this.getOceneNastavnika = (req, resp) => {
            let username = req.body.username;
            ocena_1.default.find({ "kor_ime_nastavnika": username }, (err, ocene) => {
                if (err)
                    console.log(err);
                else {
                    if (ocene)
                        resp.json(ocene);
                    else
                        resp.json(null);
                }
            });
        };
        this.getOcene = (req, resp) => {
            ocena_1.default.find({}, (err, ocene) => {
                if (err)
                    console.log(err);
                else {
                    if (ocene)
                        resp.json(ocene);
                    else
                        resp.json(null);
                }
            });
        };
    }
}
exports.NastavnikController = NastavnikController;
//# sourceMappingURL=nastavnik.controller.js.map