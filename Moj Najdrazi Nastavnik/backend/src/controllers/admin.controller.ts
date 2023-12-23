import express from 'express'
import AdminModel from '../models/admin'
import bcrypt from 'bcrypt'

export class AdminController {
    login = (req: express.Request, resp: express.Response) => {
        const bcrypt = require('bcrypt');

        let username = req.body.username
        let password = req.body.password

        AdminModel.findOne({ "kor_ime": username }, (err, adm) => {
            if (err) console.log(err)
            else {
                if (adm)
                    bcrypt.compare(password, adm.lozinka, function (err, result) {
                        if (result == true)
                            resp.json(adm)
                        else
                            resp.json(null)
                    });
                else
                    resp.json(null)
            }
        })
    }
}