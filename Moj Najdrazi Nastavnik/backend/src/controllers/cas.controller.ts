import express from 'express'
import CasModel from '../models/cas'
import ZahtevZaCasModel from '../models/zahtev_za_cas'

export class CasController {
    getCasoviNastavnika = (req: express.Request, resp: express.Response) => {
        let username = req.body.username;

        CasModel.find({ "kor_ime_nastavnika": username }, (err, casovi) => {
            if (err) console.log(err)
            else
                if (casovi)
                    resp.json(casovi)
                else
                    resp.json({ "message": "This teacher has no classes" })
        })
    }

    getZahteviZaCasNastavnika = (req: express.Request, resp: express.Response) => {
        let username = req.body.username;

        ZahtevZaCasModel.find({ "kor_ime_nastavnika": username }, (err, casovi) => {
            if (err) console.log(err)
            else
                if (casovi)
                    resp.json(casovi)
                else
                    resp.json({ "message": "This teacher has no requests for classes" })
        })
    }

    setZahtevZaCas = (req: express.Request, resp: express.Response) => {

        let noviZahtevZaCas = new ZahtevZaCasModel({
            kor_ime_nastavnika: req.body.kor_ime_nastavnika,
            kor_ime_ucenika: req.body.kor_ime_ucenika,
            naziv_predmeta: req.body.naziv_predmeta,
            datum_i_vreme: req.body.datum_i_vreme,
            deskripcija: req.body.deskripcija,
            status: "waiting",
            odgovor: "",
            trajanje: req.body.trajanje
        })

        noviZahtevZaCas.save((err, res) => {
            if (err) console.log(err)
            else
                resp.json({ "message": "ok" })
        })
    }

    setAccept = (req: express.Request, resp: express.Response) => {
        let id = req.body.id

        let NoviCas = new CasModel({
            kor_ime_nastavnika: req.body.kor_ime_nastavnika,
            kor_ime_ucenika: req.body.kor_ime_ucenika,
            naziv_predmeta: req.body.naziv_predmeta,
            datum_i_vreme: req.body.datum_i_vreme,
            deskripcija: req.body.deskripcija,
            status: "not_started",
            trajanje: req.body.trajanje
        })

        ZahtevZaCasModel.updateOne({ "_id": id }, { $set: { 'status': "accepted" } }, (err, res) => {
            if (err) console.log(err)
            else {
                NoviCas.save((err, ress) => {
                    if (err) console.log(err)
                    else
                        resp.json(NoviCas)
                })
            }
        })
    }

    setDecline = (req: express.Request, resp: express.Response) => {
        let id = req.body.id
        let odgovor = req.body.odgovor

        ZahtevZaCasModel.updateOne({ "_id": id }, { $set: { 'status': "declined", 'odgovor': odgovor } }, (err, res) => {
            if (err) console.log(err)
            else
                resp.json({ "message": "ok" })
        })
    }

    setCasoviStatus = (req: express.Request, resp: express.Response) => {
        let id = req.body.id
        let status = req.body.status

        CasModel.updateOne({ "_id": id }, { $set: { 'status': status }}, (err, res) => {
            if (err) console.log(err)
            else
                resp.json({ "message": "ok" })
        })
    }
}