import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korRouter from './routers/korisnik.router';
import admRouter from './routers/admin.router';
import ucenRouter from './routers/ucenik.router';
import nasRouter from './routers/nastavnik.router';
import predRouter from './routers/predmet.router';
import casRouter from './routers/cas.router';

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/skola')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("connection successful")
})

const router = express.Router()

router.use('/korisnici', korRouter)
router.use('/admin', admRouter)
router.use('/ucenici', ucenRouter)
router.use('/nastavnici', nasRouter)
router.use('/predmeti', predRouter)
router.use('/casovi', casRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
