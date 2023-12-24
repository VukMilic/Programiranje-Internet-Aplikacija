import express from 'express'
import NastavnikModel from '../models/nastavnik'
import OcenaModel from '../models/ocena'
import bcrypt from "bcrypt";

export class NastavnikController {
    register = (req: express.Request, resp: express.Response) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;

        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            let noviNastavnik = new NastavnikModel({
                kor_ime: req.body.username,
                lozinka: hash,
                pitanje: req.body.question,
                odgovor: req.body.answer,
                ime: req.body.firstname,
                prezime: req.body.lastname,
                pol: req.body.sex,
                adresa: req.body.address,
                kontakt: req.body.phone,
                mejl: req.body.email,
                tip: "nastavnik",
                slika: req.body.selectedImage,
                CV: req.body.selectedCV,
                predmeti: req.body.predmeti,
                uzrast: req.body.uzrasti,
                odgovorZaSajt: req.body.odgovorZaSajt
            })

            noviNastavnik.save((err, res) => {
                if (err) console.log(err)
                else
                    resp.json({ "message": "ok" })
            })
        });
    }

    countTeachers = (req: express.Request, resp: express.Response) => {
        NastavnikModel.count({}, (err, num) => {
            if (err) console.log(err)
            else
                resp.json(num)
        })
    }

    getNastavnici = (req: express.Request, resp: express.Response) => {
        NastavnikModel.find({}, (err, nastavnici) => {
            if (err) console.log(err)
            else
                resp.json(nastavnici)
        })
    }

    getNastavnikByUsername = (req: express.Request, resp: express.Response) => {
        let username = req.body.username

        NastavnikModel.findOne({ "kor_ime": username }, (err, nas) => {
            if (err) console.log(err)
            else
                if (nas)
                    resp.json(nas)
                else
                    resp.json(null)
        })
    }

    getOceneNastavnika = (req: express.Request, resp: express.Response) => {
        let username = req.body.username

        OcenaModel.find({"kor_ime_nastavnika": username}, (err, ocene)=>{
            if(err) console.log(err)
            else{
                if(ocene)
                    resp.json(ocene)
                else
                    resp.json(null)
            }
        })
    }

    getOcene = (req: express.Request, resp: express.Response) => {
        OcenaModel.find({}, (err, ocene)=>{
            if(err) console.log(err)
            else{
                if(ocene)
                    resp.json(ocene)
                else
                    resp.json(null)
            }
        })
    }
    
}