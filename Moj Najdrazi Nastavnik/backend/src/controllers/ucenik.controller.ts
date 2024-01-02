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

    editSlika = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let slika = req.body.slika
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"slika": slika}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editIme = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let name = req.body.name
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"ime": name}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editPrezime = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let surname = req.body.surname
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"prezime": surname}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editAdresa = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let address = req.body.address
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"adresa": address}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editMejl = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let email = req.body.email
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"mejl": email}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editKontakt = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let phone = req.body.phone
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"kontakt": phone}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editTipSkole = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let tipSkole = req.body.tipSkole
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"tipSkole": tipSkole}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

    editRazred = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let tipSkole = req.body.tipSkole
        let razred = req.body.razred
        
        UcenikModel.updateOne({"kor_ime": username}, {$set: {"tipSkole": tipSkole, "razred": razred}}, (err, res)=>{
            if(err) console.log(err)
            else{
                   resp.json(res)
            }
        })
    }

}