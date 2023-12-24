"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ocena = new Schema({
    naziv_predmeta: {
        type: String
    },
    kor_ime_nastavnika: {
        type: String
    },
    kor_ime_ucenika: {
        type: String
    },
    ocena: {
        type: String
    }
});
exports.default = mongoose_1.default.model("OcenaModel", Ocena, "ocena");
//# sourceMappingURL=ocena.js.map