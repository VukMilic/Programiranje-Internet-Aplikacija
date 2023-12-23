"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nastavnik = new Schema({
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
        type: String
    },
    predmeti: {
        type: [{ naziv: String }]
    },
    uzrast: {
        type: [{ uzrast: String }]
    },
    odgovorZaSajt: {
        type: String
    }
});
exports.default = mongoose_1.default.model("NastavnikModel", Nastavnik, "nastavnik");
//# sourceMappingURL=nastavnik.js.map