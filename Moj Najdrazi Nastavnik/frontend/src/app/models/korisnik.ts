import { Predmet } from "./predmet";
import { Uzrast } from "./uzrast";

export class Korisnik {
    kor_ime: string;
    lozinka: string;
    ime: string;
    prezime: string;
    pol: string;
    adresa: string;
    kontakt: string;
    mejl: string;
    tip: string;
    slika: string;
}

export class Admin extends Korisnik {

}

export class Nastavnik extends Korisnik {
    predmeti: Array<Predmet>;
    uzrast: Array<Uzrast>;
    odgovorZaSajt: string;
}

export class Ucenik extends Korisnik {
    tipSkole: string;
    razred: string;
}

export class ZahtevZaRegistraciju extends Nastavnik {
    CV: File;
    CVbase64: string;
    status: string;
}