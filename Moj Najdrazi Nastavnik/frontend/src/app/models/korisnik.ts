import { Predmet } from "./predmet";
import { Uzrast } from "./uzrast";

export class Korisnik{
    kor_ime: string;
    lozinka: string;
    pitanje: string;
    odgovor: string;
    ime: string;
    prezime: string;
    pol: string;
    adresa: string;
    kontakt: string;
    mejl: string;
    tip: string;
    slika: string;
}

export class Admin extends Korisnik{

}

export class Nastavnik extends Korisnik{
    CV: string;
    predmeti: Array<Predmet>;
    uzrast: Array<Uzrast>;
    odgovorZaSajt: string;
}

export class Ucenik extends Korisnik{
    tipSkole: string;
    razred: string;
}