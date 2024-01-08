import mongoose from "mongoose";


const Schema = mongoose.Schema

let Cas = new Schema({
    kor_ime_nastavnika:{
        type: String
    },
    kor_ime_ucenika:{
        type: String
    },
    naziv_predmeta:{
        type: String
    },
    datum_i_vreme:{
        type: String
    },
    deskripcija:{
        type: String
    },
    status:{
        type: String
    },
    trajanje:{
        type: String
    }
})


export default mongoose.model("CasModel", Cas, "cas")
