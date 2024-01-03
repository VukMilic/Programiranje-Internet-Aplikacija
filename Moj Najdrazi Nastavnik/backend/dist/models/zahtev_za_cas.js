"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ZahtevZaCas = new Schema({
    kor_ime_nastavnika: {
        type: String
    },
    kor_ime_ucenika: {
        type: String
    },
    naziv_predmeta: {
        type: String
    },
    datum_i_vreme: {
        type: String
    },
    deskripcija: {
        type: String
    },
    status: {
        type: String
    },
    odgovor: {
        type: String
    }
});
exports.default = mongoose_1.default.model("ZahtevZaCasModel", ZahtevZaCas, "zahtev_za_cas");
//# sourceMappingURL=zahtev_za_cas.js.map