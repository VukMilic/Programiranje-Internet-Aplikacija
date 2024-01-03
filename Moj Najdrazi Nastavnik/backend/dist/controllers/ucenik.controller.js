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
        this.editSlika = (req, resp) => {
            let username = req.body.username;
            let slika = req.body.slika;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "slika": slika } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editIme = (req, resp) => {
            let username = req.body.username;
            let name = req.body.name;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "ime": name } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editPrezime = (req, resp) => {
            let username = req.body.username;
            let surname = req.body.surname;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "prezime": surname } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editAdresa = (req, resp) => {
            let username = req.body.username;
            let address = req.body.address;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "adresa": address } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editMejl = (req, resp) => {
            let username = req.body.username;
            let email = req.body.email;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "mejl": email } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editKontakt = (req, resp) => {
            let username = req.body.username;
            let phone = req.body.phone;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "kontakt": phone } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editTipSkole = (req, resp) => {
            let username = req.body.username;
            let tipSkole = req.body.tipSkole;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "tipSkole": tipSkole } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.editRazred = (req, resp) => {
            let username = req.body.username;
            let tipSkole = req.body.tipSkole;
            let razred = req.body.razred;
            ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { "tipSkole": tipSkole, "razred": razred } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(res);
                }
            });
        };
        this.getUcenikByUsername = (req, resp) => {
            let username = req.body.username;
            ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                if (err)
                    console.log(err);
                else {
                    resp.json(ucenik);
                }
            });
        };
    }
}
exports.UcenikController = UcenikController;
//# sourceMappingURL=ucenik.controller.js.map