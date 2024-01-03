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
                odgovor: ""
            });
            noviZahtevZaCas.save((err, res) => {
                if (err)
                    console.log(err);
                else
                    resp.json({ "message": "ok" });
            });
        };
    }
}
exports.CasController = CasController;
//# sourceMappingURL=cas.controller.js.map