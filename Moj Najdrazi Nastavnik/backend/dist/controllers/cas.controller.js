"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasController = void 0;
const cas_1 = __importDefault(require("../models/cas"));
const zahtev_za_cas_1 = __importDefault(require("../models/zahtev_za_cas"));
class CasController {
    constructor() {
        this.getCasoviNastavnika = (req, resp) => {
            let username = req.body.username;
            cas_1.default.find({ "kor_ime_nastavnika": username }, (err, casovi) => {
                if (err)
                    console.log(err);
                else if (casovi)
                    resp.json(casovi);
                else
                    resp.json({ "message": "This teacher has no classes" });
            });
        };
        this.getCasoviUcenika = (req, resp) => {
            let username = req.body.username;
            cas_1.default.find({ "kor_ime_ucenika": username }, (err, casovi) => {
                if (err)
                    console.log(err);
                else if (casovi)
                    resp.json(casovi);
                else
                    resp.json({ "message": "This student has no classes" });
            });
        };
        this.getZahteviZaCasNastavnika = (req, resp) => {
            let username = req.body.username;
            zahtev_za_cas_1.default.find({ "kor_ime_nastavnika": username }, (err, casovi) => {
                if (err)
                    console.log(err);
                else if (casovi)
                    resp.json(casovi);
                else
                    resp.json({ "message": "This teacher has no requests for classes" });
            });
        };
        this.setZahtevZaCas = (req, resp) => {
            let noviZahtevZaCas = new zahtev_za_cas_1.default({
                kor_ime_nastavnika: req.body.kor_ime_nastavnika,
                kor_ime_ucenika: req.body.kor_ime_ucenika,
                naziv_predmeta: req.body.naziv_predmeta,
                datum_i_vreme: req.body.datum_i_vreme,
                deskripcija: req.body.deskripcija,
                status: "waiting",
                odgovor: "",
                trajanje: req.body.trajanje
            });
            noviZahtevZaCas.save((err, res) => {
                if (err)
                    console.log(err);
                else
                    resp.json({ "message": "ok" });
            });
        };
        this.setAccept = (req, resp) => {
            let id = req.body.id;
            let NoviCas = new cas_1.default({
                kor_ime_nastavnika: req.body.kor_ime_nastavnika,
                kor_ime_ucenika: req.body.kor_ime_ucenika,
                naziv_predmeta: req.body.naziv_predmeta,
                datum_i_vreme: req.body.datum_i_vreme,
                deskripcija: req.body.deskripcija,
                status: "not_started",
                trajanje: req.body.trajanje
            });
            zahtev_za_cas_1.default.updateOne({ "_id": id }, { $set: { 'status': "accepted" } }, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    NoviCas.save((err, ress) => {
                        if (err)
                            console.log(err);
                        else
                            resp.json(NoviCas);
                    });
                }
            });
        };
        this.setDecline = (req, resp) => {
            let id = req.body.id;
            let odgovor = req.body.odgovor;
            zahtev_za_cas_1.default.updateOne({ "_id": id }, { $set: { 'status': "declined", 'odgovor': odgovor } }, (err, res) => {
                if (err)
                    console.log(err);
                else
                    resp.json({ "message": "ok" });
            });
        };
        this.setCasoviStatus = (req, resp) => {
            let id = req.body.id;
            let status = req.body.status;
            cas_1.default.updateOne({ "_id": id }, { $set: { 'status': status } }, (err, res) => {
                if (err)
                    console.log(err);
                else
                    resp.json({ "message": "ok" });
            });
        };
        this.getCasoviUcenikaINastavnika = (req, resp) => {
            let usernameTeacher = req.body.usernameTeacher;
            let usernameStudent = req.body.usernameStudent;
            cas_1.default.find({ "kor_ime_nastavnika": usernameTeacher, "kor_ime_ucenika": usernameStudent }, (err, casovi) => {
                if (err)
                    console.log(err);
                else
                    resp.json(casovi);
            });
        };
    }
}
exports.CasController = CasController;
//# sourceMappingURL=cas.controller.js.map