import mongoose from "mongoose";


const Schema = mongoose.Schema

let Ucenik = new Schema({
    kor_ime:{
        type: String
    },
    lozinka:{
        type: String
    },
    pitanje:{
        type: String
    },
    odgovor:{
        type: String
    },
    ime:{
        type: String
    },
    prezime:{
        type: String
    },
    pol:{
        type: String
    },
    adresa:{
        type: String
    },
    kontakt:{
        type: String
    },
    mejl:{
        type: String
    },
    tip:{
        type: String
    },
    slika:{
        type: String
    },
    tipSkole:{
        type: String
    },
    razred:{
        type: String
    }
})


export default mongoose.model("UcenikModel", Ucenik, "ucenik")
