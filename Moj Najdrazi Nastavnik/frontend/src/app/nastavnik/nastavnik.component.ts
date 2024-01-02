import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Nastavnik } from '../models/korisnik';
import { NastavnikService } from '../servers/nastavnik.service';
import { Uzrast } from '../models/uzrast';
import { Predmet } from '../models/predmet';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  constructor(private korser: KorisnikService, private nasser: NastavnikService) { }

  ngOnInit(): void {
    this.trenNastavnik = JSON.parse(localStorage.getItem('trenKor'))

    let pageName = 'nastavnik'
    this.korser.checkToken(pageName);

    this.stavkaMenija = 0;
    this.editujIme = false;
    this.editujPrezime = false;
    this.editujAdresu = false;
    this.editujMejl = false;
    this.editujKontakt = false;
    this.editujUzrast = false;
    this.editujPredmete = false;
    this.editujSliku = false;
  }

  trenNastavnik: Nastavnik;
  uzrastiNizStringova: string[];
  predmetiNizStringova: string[];
  stavkaMenija: number;

  editujIme: boolean;
  editujPrezime: boolean;
  editujAdresu: boolean;
  editujMejl: boolean;
  editujKontakt: boolean;
  editujUzrast: boolean;
  editujPredmete: boolean;
  editujSliku: boolean;

  imgSelected(event: any) {
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])
    fr.onloadend = (event) => {
      this.trenNastavnik.slika = fr.result.toString();
      this.editujSliku = true;
    }
  }

  confirmSliku() {
    if (this.trenNastavnik.slika != '/assets/profilna_default.png' && this.trenNastavnik.slika != null) {
      this.nasser.editSlika(this.trenNastavnik.kor_ime, this.trenNastavnik.slika).subscribe((resp: string) => {
        this.editujSliku = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
      })
    } else {
      this.editujSliku = false;
    }
  }

  toggleProfil() {
    this.stavkaMenija = 0;
  }

  editIme() {
    if (this.editujIme == false)
      this.editujIme = true;
  }

  confirmIme() {
    this.nasser.editIme(this.trenNastavnik.kor_ime, this.trenNastavnik.ime).subscribe((resp: string) => {
      this.editujIme = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editPrezime() {
    if (this.editujPrezime == false) {
      this.editujPrezime = true;
    }
  }

  confirmPrezime() {
    this.nasser.editPrezime(this.trenNastavnik.kor_ime, this.trenNastavnik.prezime).subscribe((resp: string) => {
      this.editujPrezime = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editAdresu() {
    if (this.editujAdresu == false) {
      this.editujAdresu = true;
    }
  }

  confirmAdresu() {
    this.nasser.editAdresu(this.trenNastavnik.kor_ime, this.trenNastavnik.adresa).subscribe((resp: string) => {
      this.editujAdresu = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editMejl() {
    if (this.editujMejl == false)
      this.editujMejl = true;
  }

  confirmMejl() {
    this.nasser.editMejl(this.trenNastavnik.kor_ime, this.trenNastavnik.mejl).subscribe((resp: string) => {
      this.editujMejl = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editKontakt() {
    if (this.editujKontakt == false)
      this.editujKontakt = true;
  }

  confirmKontakt() {
    this.nasser.editKontakt(this.trenNastavnik.kor_ime, this.trenNastavnik.kontakt).subscribe((resp: string) => {
      this.editujKontakt = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editUzrast() {
    if (this.editujUzrast == false)
      this.editujUzrast = true;
  }

  confirmUzrast() {
    if (this.uzrastiNizStringova != null) {
      this.trenNastavnik.uzrast = [];

      this.uzrastiNizStringova.forEach(u => {
        let noviUzrast: Uzrast = {
          uzrast: u
        }
        this.trenNastavnik.uzrast.push(noviUzrast)
      });

      this.uzrastiNizStringova = null;

      this.nasser.editUzrast(this.trenNastavnik.kor_ime, this.trenNastavnik.uzrast).subscribe((resp: string) => {
        this.editujUzrast = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
      })
    } else {
      this.editujUzrast = false;
    }
  }

  editPredmeti() {
    if (this.editujPredmete == false)
      this.editujPredmete = true;
  }

  confirmPredmeti() {
    if (this.predmetiNizStringova != null) {
      this.trenNastavnik.predmeti = [];

      this.predmetiNizStringova.forEach(p => {
        let noviPredmet: Predmet = {
          naziv: p
        }
        this.trenNastavnik.predmeti.push(noviPredmet)
      });

      this.predmetiNizStringova = null;

      this.nasser.editPredmeti(this.trenNastavnik.kor_ime, this.trenNastavnik.predmeti).subscribe((resp: string) => {
        this.editujPredmete = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
      })
    } else {
      this.editujPredmete = false;
    }
  }

  logout() {
    this.korser.logout();
  }

}
