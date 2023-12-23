"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ucenik = new Schema({
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
    tipSkole: {
        type: String
    },
    razred: {
        type: String
    }
});
exports.default = mongoose_1.default.model("UcenikModel", Ucenik, "ucenik");
//# sourceMappingURL=ucenik.js.map