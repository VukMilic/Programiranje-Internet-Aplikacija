import express from 'express'
import PredmetModel from '../models/predmet'

export class PredmetController {
    getPredmeti = (req: express.Request, resp: express.Response) => {
        PredmetModel.find({}, (err, predmeti)=>{
            if(err) console.log(err)
            else
                resp.json(predmeti)
        })
    }
}