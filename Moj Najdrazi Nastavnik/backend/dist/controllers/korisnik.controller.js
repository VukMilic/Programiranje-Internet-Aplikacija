"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const ucenik_1 = __importDefault(require("../models/ucenik"));
const admin_1 = __importDefault(require("../models/admin"));
class KorisnikController {
    constructor() {
        this.login = (req, resp) => {
            const bcrypt = require('bcrypt');
            let username = req.body.username;
            let password = req.body.password;
            nastavnik_1.default.findOne({ "kor_ime": username }, (err, nastavnik) => {
                if (err)
                    console.log(err);
                else if (nastavnik) {
                    bcrypt.compare(password, nastavnik.lozinka, function (err, result) {
                        if (result == true)
                            resp.json(nastavnik);
                        else
                            resp.json(null);
                    });
                }
                else {
                    ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                        if (err)
                            console.log(err);
                        else if (ucenik) {
                            bcrypt.compare(password, ucenik.lozinka, function (err, result) {
                                if (result == true)
                                    resp.json(ucenik);
                                else
                                    resp.json(null);
                            });
                        }
                        else {
                            admin_1.default.findOne({ "kor_ime": username }, (err, admin) => {
                                if (err)
                                    console.log(err);
                                else if (admin) {
                                    bcrypt.compare(password, admin.lozinka, function (err, result) {
                                        if (result == true)
                                            resp.json(admin);
                                        else
                                            resp.json(null);
                                    });
                                }
                                else
                                    resp.json(null);
                            });
                        }
                    });
                }
            });
        };
        this.findByUsername = (req, resp) => {
            let username = req.body.username;
            nastavnik_1.default.findOne({ "kor_ime": username }, (err, nastavnik) => {
                if (err)
                    console.log(err);
                else {
                    if (nastavnik) {
                        resp.json({ "message": "found" });
                    }
                    else {
                        ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                            if (err)
                                console.log(err);
                            else {
                                if (ucenik) {
                                    resp.json({ "message": "found" });
                                }
                                else {
                                    admin_1.default.findOne({ "kor_ime": username }, (err, admin) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            if (admin)
                                                resp.json({ "message": "found" });
                                            else
                                                resp.json({ "message": "ok" });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.findByEmail = (req, resp) => {
            let email = req.body.email;
            nastavnik_1.default.findOne({ "mejl": email }, (err, nastavnik) => {
                if (err)
                    console.log(err);
                else {
                    if (nastavnik) {
                        resp.json({ "message": "found" });
                    }
                    else {
                        ucenik_1.default.findOne({ "mejl": email }, (err, ucenik) => {
                            if (err)
                                console.log(err);
                            else {
                                if (ucenik) {
                                    resp.json({ "message": "found" });
                                }
                                else {
                                    admin_1.default.findOne({ "mejl": email }, (err, admin) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            if (admin)
                                                resp.json({ "message": "found" });
                                            else
                                                resp.json({ "message": "ok" });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.getQuestion = (req, resp) => {
            let username = req.body.username;
            nastavnik_1.default.findOne({ "kor_ime": username }, (err, nastavnik) => {
                if (err)
                    console.log(err);
                else {
                    if (nastavnik) {
                        resp.json(nastavnik.pitanje);
                    }
                    else {
                        ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                            if (err)
                                console.log(err);
                            else {
                                if (ucenik) {
                                    resp.json(ucenik.pitanje);
                                }
                                else {
                                    admin_1.default.findOne({ "kor_ime": username }, (err, admin) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            if (admin) {
                                                resp.json(admin.pitanje);
                                            }
                                            else {
                                                resp.json(null);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.confirmAnswer = (req, resp) => {
            let username = req.body.username;
            let answer = req.body.answer;
            nastavnik_1.default.findOne({ "kor_ime": username }, (err, nastavnik) => {
                if (err)
                    console.log(err);
                else {
                    if (nastavnik) {
                        if (answer == nastavnik.odgovor) {
                            resp.json({ "message": "ok" });
                        }
                        else {
                            resp.json(null);
                        }
                    }
                    else {
                        ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                            if (err)
                                console.log(err);
                            else {
                                if (ucenik) {
                                    if (answer == ucenik.odgovor) {
                                        resp.json({ "message": "ok" });
                                    }
                                    else {
                                        resp.json(null);
                                    }
                                }
                                else {
                                    admin_1.default.findOne({ "kor_ime": username }, (err, admin) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            if (admin) {
                                                if (answer == admin.odgovor) {
                                                    resp.json({ "message": "ok" });
                                                }
                                                else {
                                                    resp.json(null);
                                                }
                                            }
                                            else {
                                                resp.json(null);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.setNewPassword = (req, resp) => {
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            let username = req.body.username;
            let oldPassword = req.body.oldPassword;
            bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
                nastavnik_1.default.findOne({ "kor_ime": username }, (err, nastavnik) => {
                    if (err)
                        console.log(err);
                    else {
                        if (nastavnik) {
                            bcrypt.compare(oldPassword, nastavnik.lozinka, function (err, result) {
                                if (result == true)
                                    // znaci kredencijali nastavnika su dobri
                                    // update-uj lozinku
                                    nastavnik_1.default.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            // uspesno si updateovao
                                            resp.json({ "message": "ok" });
                                    });
                                else
                                    resp.json(null);
                            });
                        }
                        else {
                            ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (ucenik) {
                                        bcrypt.compare(oldPassword, ucenik.lozinka, function (err, result2) {
                                            if (result2 == true)
                                                // znaci kredencijali ucenika su dobri
                                                // update-uj lozinku
                                                ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                                    if (err)
                                                        console.log(err);
                                                    else
                                                        // uspesno si updateovao
                                                        resp.json({ "message": "ok" });
                                                });
                                            else
                                                resp.json(null);
                                        });
                                    }
                                    else {
                                        admin_1.default.findOne({ "kor_ime": username }, (err, admin) => {
                                            if (err)
                                                console.log(err);
                                            else {
                                                if (admin) {
                                                    bcrypt.compare(oldPassword, admin.lozinka, function (err, result3) {
                                                        if (result3 == true)
                                                            // znaci kredencijali admin su dobri
                                                            // update-uj lozinku
                                                            admin_1.default.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                                                if (err)
                                                                    console.log(err);
                                                                else
                                                                    // uspesno si updateovao
                                                                    resp.json({ "message": "ok" });
                                                            });
                                                        else
                                                            resp.json(null);
                                                    });
                                                }
                                                else {
                                                    resp.json(null);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            });
        };
        this.setNewPasswordWithoutOldPassword = (req, resp) => {
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            let username = req.body.username;
            bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
                nastavnik_1.default.findOne({ "kor_ime": username }, (err, nastavnik) => {
                    if (err)
                        console.log(err);
                    else {
                        if (nastavnik) {
                            // znaci kredencijali nastavnika su dobri
                            // update-uj lozinku
                            nastavnik_1.default.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                if (err)
                                    console.log(err);
                                else
                                    // uspesno si updateovao
                                    resp.json({ "message": "ok" });
                            });
                        }
                        else {
                            ucenik_1.default.findOne({ "kor_ime": username }, (err, ucenik) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (ucenik) {
                                        // znaci kredencijali ucenika su dobri
                                        // update-uj lozinku
                                        ucenik_1.default.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                            if (err)
                                                console.log(err);
                                            else
                                                // uspesno si updateovao
                                                resp.json({ "message": "ok" });
                                        });
                                    }
                                    else {
                                        admin_1.default.findOne({ "kor_ime": username }, (err, admin) => {
                                            if (err)
                                                console.log(err);
                                            else {
                                                if (admin) {
                                                    // znaci kredencijali admina su dobri
                                                    // update-uj lozinku
                                                    admin_1.default.updateOne({ "kor_ime": username }, { $set: { 'lozinka': hash } }, (err, res) => {
                                                        if (err)
                                                            console.log(err);
                                                        else
                                                            // uspesno si updateovao
                                                            resp.json({ "message": "ok" });
                                                    });
                                                }
                                                else {
                                                    resp.json(null);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map