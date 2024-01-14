"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ZahtevZaRegistraciju = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    pitanje: {
        type: String
    },
    odgovor: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    adresa: {
        type: String
    },
    kontakt: {
        type: String
    },
    mejl: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    },
    CV: {
        type: Array
    },
    predmeti: {
        type: [{ naziv: String }]
    },
    uzrast: {
        type: [{ uzrast: String }]
    },
    odgovorZaSajt: {
        type: String
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model("ZahtevZaRegistracijuModel", ZahtevZaRegistraciju, "zahtev_za_registraciju");
//# sourceMappingURL=zahtev_za_registraciju.js.map