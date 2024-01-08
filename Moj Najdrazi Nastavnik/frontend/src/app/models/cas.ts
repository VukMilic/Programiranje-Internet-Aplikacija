import { Ucenik } from "./korisnik";

export class Cas{
    _id: string;
    kor_ime_nastavnika: string;
    kor_ime_ucenika: string;
    naziv_predmeta: string;
    datum_i_vreme: Date;
    deskripcija: string;
    status: string;
    trajanje: string;
}

export class CasSaUcenikom extends Cas{
    ucenik: Ucenik;
    datum: string;
    vreme: string;
}

export class ZahtevZaCas{
    _id: string;
    kor_ime_nastavnika: string;
    kor_ime_ucenika: string;
    naziv_predmeta: string;
    datum_i_vreme: Date;
    deskripcija: string;
    status: string;
    odgovor: string;
    trajanje: string;
}

export class ZahtevZaCasSaUcenikom extends ZahtevZaCas{
    ucenik: Ucenik;
    datum: string;
    vreme: string;
}
