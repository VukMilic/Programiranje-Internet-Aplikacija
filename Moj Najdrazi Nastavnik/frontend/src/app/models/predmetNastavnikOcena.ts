import { Nastavnik } from "./korisnik";
import { Predmet } from "./predmet";

export class PredmetNastavnik{
    predmet: Predmet;
    nastavnik: Nastavnik;
}

export class PredmetNastavnikOcena extends PredmetNastavnik{
    prosecna_ocena: number;
}
