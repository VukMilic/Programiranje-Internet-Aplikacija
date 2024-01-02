import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Nastavnik, Ucenik } from '../models/korisnik';
import { Predmet } from '../models/predmet';
import { PredmetNastavnik, PredmetNastavnikOcena } from '../models/predmetNastavnikOcena';
import { NastavnikService } from '../servers/nastavnik.service';
import { UcenikService } from '../servers/ucenik.service';
import { Ocena } from '../models/ocena';

@Component({
  selector: 'app-ucenik',
  templateUrl: './ucenik.component.html',
  styleUrls: ['./ucenik.component.css']
})
export class UcenikComponent implements OnInit {

  constructor(private http: HttpClient, private korser: KorisnikService, private nasser: NastavnikService, private ucenser: UcenikService) { }

  ngOnInit(): void {
    let pageName = 'ucenik'
    this.korser.checkToken(pageName);

    this.trenUcenik = JSON.parse(localStorage.getItem('trenKor'))
    this.getUcenikUzrast();

    this.stavkaMenija = 0;
    this.editujIme = false;
    this.editujPrezime = false;
    this.editujAdresu = false;
    this.editujMejl = false;
    this.editujKontakt = false;
    this.editujTipSkole = false;
    this.izabraniTipSkole = this.trenUcenik.tipSkole;
    this.editujRazred = false;
    this.izabraniRazred = parseInt(this.trenUcenik.razred);
    this.editujSliku = false;
    this.editujTipSrednjeSkole = false;
    this.incFlag = false;

    this.getPredmeti();
    this.getNastavnici();
  }

  trenUcenik: Ucenik;
  nastavniciUcenika: Nastavnik[] = [];
  uzrastUcenika: string;
  message: string;

  stavkaMenija: number;

  predmeti: Predmet[] = [];
  nastavnici: Nastavnik[] = [];
  predmetNastavnik: PredmetNastavnik[] = [];

  searchByPredmet: string;
  searchByIme: string;
  searchByPrezime: string;
  // ovo je glavni niz predmeta i nastavnika
  predNasSearched: PredmetNastavnik[] = [];
  // ovo je glavni niz predmeta, nastavnika i ocena
  predNasOcenaSearched: PredmetNastavnikOcena[] = [];

  ocene: Ocena[] = [];

  editujIme: boolean;
  editujPrezime: boolean;
  editujAdresu: boolean;
  editujMejl: boolean;
  editujKontakt: boolean;
  editujTipSkole: boolean;
  izabraniTipSkole: string;
  editujRazred: boolean;
  izabraniRazred: number;
  editujSliku: boolean;
  editujTipSrednjeSkole: boolean;
  izabraniTipSrednjeSkole: string;
  incFlag: boolean;

  toggleProfil() {
    this.stavkaMenija = 0;
  }

  toggleNastavnici() {
    this.stavkaMenija = 1;
  }

  getPredmeti() {
    this.korser.getPredmeti().subscribe((p: Predmet[]) => {
      if (p != null) {
        this.predmeti = p;
      }
    })
  }

  getNastavnici() {
    this.nasser.getNastavnici().subscribe((n: Nastavnik[]) => {
      if (n != null) {
        this.nastavnici = n;
        this.predmeti.forEach(p => {
          this.nastavnici.forEach(n => {
            n.predmeti.forEach(np => {
              if (p.naziv == np.naziv) {
                let noviPN = {
                  predmet: p,
                  nastavnik: n
                }
                this.predmetNastavnik.push(noviPN)
              }
            });
          });
        });

        this.searchPredNas();
        this.getPredNasUzrast();
        this.getOcene();
      }
    })
  }


  // funkcije za azuriranje podataka na profilu
  imgSelected(event: any) {
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])
    fr.onloadend = (event) => {
      this.trenUcenik.slika = fr.result.toString();
      this.editujSliku = true;
    }
  }

  confirmSliku() {
    if (this.trenUcenik.slika != '/assets/profilna_default.png' && this.trenUcenik.slika != null) {
      this.ucenser.editSlika(this.trenUcenik.kor_ime, this.trenUcenik.slika).subscribe((resp: string) => {
        this.editujSliku = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
      })
    } else {
      this.editujSliku = false;
    }
  }

  editIme() {
    if (this.editujIme == false)
      this.editujIme = true;
  }

  confirmIme() {
    this.ucenser.editIme(this.trenUcenik.kor_ime, this.trenUcenik.ime).subscribe((resp: string) => {
      this.editujIme = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
    })
  }

  editPrezime() {
    if (this.editujPrezime == false) {
      this.editujPrezime = true;
    }
  }

  confirmPrezime() {
    this.ucenser.editPrezime(this.trenUcenik.kor_ime, this.trenUcenik.prezime).subscribe((resp: string) => {
      this.editujPrezime = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
    })
  }

  editAdresu() {
    if (this.editujAdresu == false) {
      this.editujAdresu = true;
    }
  }

  confirmAdresu() {
    this.ucenser.editAdresa(this.trenUcenik.kor_ime, this.trenUcenik.adresa).subscribe((resp: string) => {
      this.editujAdresu = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
    })
  }

  editMejl() {
    if (this.editujMejl == false)
      this.editujMejl = true;
  }

  confirmMejl() {
    this.ucenser.editMejl(this.trenUcenik.kor_ime, this.trenUcenik.mejl).subscribe((resp: string) => {
      this.editujMejl = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
    })
  }

  editKontakt() {
    if (this.editujKontakt == false)
      this.editujKontakt = true;
  }

  confirmKontakt() {
    this.ucenser.editKontakt(this.trenUcenik.kor_ime, this.trenUcenik.kontakt).subscribe((resp: string) => {
      this.editujKontakt = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
    })
  }

  editTipSkole() {
    if (this.editujTipSkole == false) {
      this.editujTipSkole = true;
      this.message = "";
    }
  }

  confirmTipSkole() {
    let msg;

    if (this.editujTipSrednjeSkole == true)
      msg = this.ucenser.checkTipSkoleSaRazredom(this.izabraniTipSrednjeSkole, this.trenUcenik.razred);
    else
      msg = this.ucenser.checkTipSkoleSaRazredom(this.izabraniTipSkole, this.trenUcenik.razred);

    if (msg == "OK") {
      if (this.editujTipSrednjeSkole == true)
        this.trenUcenik.tipSkole = this.izabraniTipSrednjeSkole;
      else
        this.trenUcenik.tipSkole = this.izabraniTipSkole;
      this.ucenser.editTipSkole(this.trenUcenik.kor_ime, this.trenUcenik.tipSkole).subscribe((resp: string) => {
        this.editujTipSkole = false;
        this.editujTipSrednjeSkole = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
        this.message = "";
      })
    } else {
      this.message = msg;
      this.izabraniTipSkole = this.trenUcenik.tipSkole;
      this.izabraniTipSrednjeSkole = this.trenUcenik.tipSkole;
      this.editujTipSkole = false;
    }
  }

  editRazred() {
    if (this.editujRazred == false)
      this.editujRazred = true;
  }

  razredUp() {
    this.incFlag = true;
    if (parseInt(this.trenUcenik.razred) == 4) {
      if (this.trenUcenik.tipSkole != "osnovna") {
        // ne moze dalje - ne postoji srednja skola sa 5. razredom
        this.message = "You finished your education!"
      }
      else {
        // u slucaju da je broj 4 a da je skola osnovna => samo inkrement uradi
        this.trenUcenik.razred = (parseInt(this.trenUcenik.razred) + 1).toString();
      }
    }
    else if (parseInt(this.trenUcenik.razred) == 8) {
      // ovo mora biti osnovna skola, nema potrebe za proverom
      // e sad treba odraditi inkrement i koju srednju skolu zeli da upise

      this.editujTipSrednjeSkole = true;
      this.trenUcenik.razred = "1";
    }
    else {
      // u slucaju da je neki broj van 4 i 8 => samo inkrement uradi
      this.trenUcenik.razred = (parseInt(this.trenUcenik.razred) + 1).toString();
    }
  }

  confirmRazred() {
    if (this.editujTipSkole == true || this.editujTipSrednjeSkole == true) {
      this.message = "You need to choose a school first"
    } else {
      this.ucenser.editRazred(this.trenUcenik.kor_ime, this.trenUcenik.tipSkole, this.trenUcenik.razred).subscribe((resp: string) => {
        this.editujRazred = false;
        this.incFlag = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenUcenik));
      })
    }
  }

  // funkcija za search
  searchPredNas() {
    this.predNasSearched = this.korser.searchPredNas(this.predmetNastavnik, this.searchByPredmet, this.searchByIme, this.searchByPrezime);
    this.getPredNasUzrast();
    this.getOcene();
  }

  getUcenikUzrast() {
    this.uzrastUcenika = this.ucenser.getUcenikUzrast(this.trenUcenik);
  }

  getPredNasUzrast() {
    this.predNasSearched = this.ucenser.getPredNasUzrast(this.predNasSearched, this.uzrastUcenika);
  }

  getOcene() {
    this.nasser.getOcene().subscribe((o: Ocena[]) => {
      if (o != null) {
        this.ocene = o;
        this.predNasOcenaSearched = [];
        this.predNasSearched.forEach(pns => {
          let sum = 0;
          let avg = 0;
          let cnt = 0;
          this.ocene.forEach(o => {
            if (o.kor_ime_nastavnika == pns.nastavnik.kor_ime) {
              cnt = cnt + 1;
              sum = sum + parseInt(o.ocena);
            }
          });
          avg = sum / cnt;
          let noviPNO: PredmetNastavnikOcena = {
            nastavnik: pns.nastavnik,
            predmet: pns.predmet,
            prosecna_ocena: Number(avg.toFixed(2))
          }

          // ovde sad ubaci predmet, nastavnika i prosecnu ocenu tog nastavnika na tom predmetu
          this.predNasOcenaSearched.push(noviPNO)
        });
      }
    })
  }

  logout() {
    this.korser.logout();
  }

}
