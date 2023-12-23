import mongoose from "mongoose";


const Schema = mongoose.Schema

let Predmet = new Schema({
    naziv:{
        type: String
    }
})


export default mongoose.model("PredmetModel", Predmet, "predmet")
