import express from 'express'
import NastavnikModel from '../models/nastavnik'
import UcenikModel from '../models/ucenik'
import AdminModel from '../models/admin'
import bcrypt from 'bcrypt'
import nastavnik from '../models/nastavnik'

export class KorisnikController {
    login = (req: express.Request, resp: express.Response) => {
        const bcrypt = require('bcrypt');

        let username = req.body.username
        let password = req.body.password

        NastavnikModel.findOne({ "kor_ime": username }, (err, nastavnik) => {
            if (err) console.log(err)
            else
                if (nastavnik) {
                    bcrypt.compare(password, nastavnik.lozinka, function (err, result) {
                        if (result == true)
                            resp.json(nastavnik)
                        else
                            resp.json(null)
                    });
                } else {
                    UcenikModel.findOne({ "kor_ime": username }, (err, ucenik) => {
                        if (err) console.log(err)
                        else
                            if (ucenik) {
                                bcrypt.compare(password, ucenik.lozinka, function (err, result) {
                                    if (result == true)
                                        resp.json(ucenik)
                                    else
                                        resp.json(null)
                                });
                            }
                            else {
                                AdminModel.findOne({ "kor_ime": username }, (err, admin) => {
                                    if (err) console.log(err)
                                    else
                                        if (admin) {
                                            bcrypt.compare(password, admin.lozinka, function (err, result) {
                                                if (result == true)
                                                    resp.json(admin)
                                                else
                                                    resp.json(null)
                                            });
                                        }
                                        else
                                            resp.json(null)
                                })
                            }
                    })
                }
        })
    }

    findByUsername = (req: express.Request, resp: express.Response) => {
        let username = req.body.username

        NastavnikModel.findOne({ "kor_ime": username }, (err, nastavnik) => {
            if (err) console.log(err)
            else {
                if (nastavnik) {
                    resp.json({ "message": "found" })
                } else {
                    UcenikModel.findOne({ "kor_ime": username }, (err, ucenik) => {
                        if (err) console.log(err)
                        else {
                            if (ucenik) {
                                resp.json({ "message": "found" })
                            } else {
                                AdminModel.findOne({ "kor_ime": username }, (err, admin) => {
                                    if (err) console.log(err)
                                    else {
                                        if (admin)
                                            resp.json({ "message": "found" })
                                        else
                                            resp.json({ "message": "ok" })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    findByEmail = (req: express.Request, resp: express.Response) => {
        let email = req.body.email

        NastavnikModel.findOne({ "mejl": email }, (err, nastavnik) => {
            if (err) console.log(err)
            else {
                if (nastavnik) {
                    resp.json({ "message": "found" })
                } else {
                    UcenikModel.findOne({ "mejl": email }, (err, ucenik) => {
                        if (err) console.log(err)
                        else {
                            if (ucenik) {
                                resp.json({ "message": "found" })
                            } else {
                                AdminModel.findOne({ "mejl": email }, (err, admin) => {
                                    if (err) console.log(err)
                                    else {
                                        if (admin)
                                            resp.json({ "message": "found" })
                                        else
                                            resp.json({ "message": "ok" })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    getQuestion = (req: express.Request, resp: express.Response) => {
        let username = req.body.username

        NastavnikModel.findOne({ "kor_ime": username }, (err, nastavnik) => {
            if (err) console.log(err)
            else {
                if (nastavnik) {
                    resp.json(nastavnik.pitanje)
                } else {
                    UcenikModel.findOne({ "kor_ime": username }, (err, ucenik) => {
                        if (err) console.log(err)
                        else {
                            if (ucenik) {
                                resp.json(ucenik.pitanje)
                            } else {
                                AdminModel.findOne({ "kor_ime": username }, (err, admin) => {
                                    if (err) console.log(err)
                                    else {
                                        if (admin) {
                                            resp.json(admin.pitanje)
                                        } else {
                                            resp.json(null)
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

    }

    confirmAnswer = (req: express.Request, resp: express.Response) => {
        let username = req.body.username
        let answer = req.body.answer

        NastavnikModel.findOne({ "kor_ime": username }, (err, nastavnik) => {
            if (err) console.log(err)
            else {
                if (nastavnik) {
                    if (answer == nastavnik.odgovor) {
                        resp.json({ "message": "ok" })
                    } else {
                        resp.json(null)
                    }
                } else {
                    UcenikModel.findOne({ "kor_ime": username }, (err, ucenik) => {
                        if (err) console.log(err)
                        else {
                            if (ucenik) {
                                if (answer == ucenik.odgovor) {
                                    resp.json({ "message": "ok" })
                                } else {
                                    resp.json(null)
                                }
                            } else {
                                AdminModel.findOne({ "kor_ime": username }, (err, admin) => {
                                    if (err) console.log(err)
                                    else {
                                        if (admin) {
                                            if (answer == admin.odgovor) {
                                                resp.json({ "message": "ok" })
                                            } else {
                                                resp.json(null)
                                            }
                                        } else {
                                            resp.json(null)
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    setNewPassword = (req: express.Request, resp: express.Response) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;

        let username = req.body.username;
        let oldPassword = req.body.oldPassword;

        bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
            NastavnikModel.findOne({ "kor_ime": username }, (err, nastavnik) => {
                if (err) console.log(err)
                else {
                    if (nastavnik) {
                        bcrypt.compare(oldPassword, nastavnik.lozinka, function (err, result) {
                            if (result == true)
                                // znaci kredencijali nastavnika su dobri
                                // update-uj lozinku
                                NastavnikModel.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                    if (err) console.log(err)
                                    else
                                        // uspesno si updateovao
                                        resp.json({ "message": "ok" })
                                })
                            else
                                resp.json(null)
                        });
                    } else {
                        UcenikModel.findOne({ "kor_ime": username }, (err, ucenik) => {
                            if (err) console.log(err)
                            else {
                                if (ucenik) {
                                    bcrypt.compare(oldPassword, ucenik.lozinka, function (err, result2) {
                                        if (result2 == true)
                                            // znaci kredencijali ucenika su dobri
                                            // update-uj lozinku
                                            UcenikModel.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                                if (err) console.log(err)
                                                else
                                                    // uspesno si updateovao
                                                    resp.json({ "message": "ok" })
                                            })
                                        else
                                            resp.json(null)
                                    });
                                } else {
                                    AdminModel.findOne({ "kor_ime": username }, (err, admin) => {
                                        if (err) console.log(err)
                                        else {
                                            if (admin) {
                                                bcrypt.compare(oldPassword, admin.lozinka, function (err, result3) {
                                                    if (result3 == true)
                                                        // znaci kredencijali admin su dobri
                                                        // update-uj lozinku
                                                        AdminModel.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                                            if (err) console.log(err)
                                                            else
                                                                // uspesno si updateovao
                                                                resp.json({ "message": "ok" })
                                                        })
                                                    else
                                                        resp.json(null)
                                                });
                                            } else {
                                                resp.json(null)
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        })
    }

    setNewPasswordWithoutOldPassword = (req: express.Request, resp: express.Response) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;

        let username = req.body.username;

        bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
            NastavnikModel.findOne({ "kor_ime": username }, (err, nastavnik) => {
                if (err) console.log(err)
                else {
                    if (nastavnik) {
                        // znaci kredencijali nastavnika su dobri
                        // update-uj lozinku
                        NastavnikModel.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                            if (err) console.log(err)
                            else
                                // uspesno si updateovao
                                resp.json({ "message": "ok" })
                        })
                    } else {
                        UcenikModel.findOne({ "kor_ime": username }, (err, ucenik) => {
                            if (err) console.log(err)
                            else {
                                if (ucenik) {
                                    // znaci kredencijali ucenika su dobri
                                    // update-uj lozinku
                                    UcenikModel.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                        if (err) console.log(err)
                                        else
                                            // uspesno si updateovao
                                            resp.json({ "message": "ok" })
                                    })

                                } else {
                                    AdminModel.findOne({ "kor_ime": username }, (err, admin) => {
                                        if (err) console.log(err)
                                        else {
                                            if (admin) {
                                                // znaci kredencijali admina su dobri
                                                // update-uj lozinku
                                                AdminModel.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                                    if (err) console.log(err)
                                                    else
                                                        // uspesno si updateovao
                                                        resp.json({ "message": "ok" })
                                                })
                                            } else {
                                                resp.json(null)
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        })
    }

}
