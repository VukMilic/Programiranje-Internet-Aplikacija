import mongoose from "mongoose";


const Schema = mongoose.Schema

let Ocena = new Schema({
    naziv_predmeta:{
        type: String
    },
    kor_ime_nastavnika:{
        type: String
    },
    kor_ime_ucenika:{
        type: String
    },
    ocena:{
        type: String
    }
})


export default mongoose.model("OcenaModel", Ocena, "ocena")
