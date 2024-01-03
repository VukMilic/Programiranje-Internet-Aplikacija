import { Ucenik } from "./korisnik";

export class Cas{
    kor_ime_nastavnika: string;
    kor_ime_ucenika: string;
    naziv_predmeta: string;
    datum_i_vreme: Date;
    deskripcija: string;
}

export class CasSaUcenikom extends Cas{
    ucenik: Ucenik;
    datum: string;
    vreme: string;
}