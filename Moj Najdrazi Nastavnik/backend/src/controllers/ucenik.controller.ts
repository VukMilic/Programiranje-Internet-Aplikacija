import express from 'express'
import UcenikModel from '../models/ucenik'
import bcrypt from 'bcrypt'

export class UcenikController {
    register = (req: express.Request, resp: express.Response) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;

        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            let noviUcenik = new UcenikModel({
                kor_ime: req.body.username,
                lozinka: hash,
                pitanje: req.body.question,
                odgovor: req.body.answer,
                ime: req.body.firstname,
                prezime: req.body.lastname,
                pol: req.body.sex,
                adresa: req.body.adress,
                kontakt: req.body.phone,
                mejl: req.body.email,
                tip: "ucenik",
                slika: req.body.selectedImage,
                tipSkole: req.body.tipSkole,
                razred: req.body.razred
            })
    
            noviUcenik.save((err, res) => {
                if (err) console.log(err)
                else
                    resp.json({ "message": "ok" })
            })
    
        })
    }

    countStudents = (req: express.Request, resp: express.Response) => {
        UcenikModel.count({}, (err, num)=>{
            if(err) console.log(err)
            else
                resp.json(num)
        })
    }
}