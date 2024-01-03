import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Nastavnik, Ucenik } from '../models/korisnik';
import { NastavnikService } from '../servers/nastavnik.service';
import { Uzrast } from '../models/uzrast';
import { Predmet } from '../models/predmet';
import { Cas, CasSaUcenikom } from '../models/cas';
import { UcenikService } from '../servers/ucenik.service';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  constructor(private korser: KorisnikService, private nasser: NastavnikService, private ucenser: UcenikService) { }

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

    this.getCasoviNastavnika();
  }

  trenNastavnik: Nastavnik;
  uzrastiNizStringova: string[];
  predmetiNizStringova: string[];

  casoviNastavnika: Cas[] = [];
  // ovo sledece su casovi koji se prikazuju (sortirani i skraceni)
  casoviNastavnikaSaUcenikom: CasSaUcenikom[] = [];
  zahteviZaCasovima: Cas[] = [];
  casoviMessage: string;

  stavkaMenija: number;

  editujIme: boolean;
  editujPrezime: boolean;
  editujAdresu: boolean;
  editujMejl: boolean;
  editujKontakt: boolean;
  editujUzrast: boolean;
  editujPredmete: boolean;
  editujSliku: boolean;

  toggleProfil() {
    this.stavkaMenija = 0;
  }

  toggleCasovi(){
    this.stavkaMenija = 1;
    this.casoviNastavnikaSaUcenikom.sort(this.sortDatumi);
  }

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

  // CASOVI - funkcije

  sortDatumi(a, b){
    if (a.datum_i_vreme > b.datum_i_vreme) {
      return 1;
    } else {
      return -1;
    }
  }

  getCasoviNastavnika(){
    this.nasser.getCasoviNastavnika(this.trenNastavnik.kor_ime).subscribe((c: Cas[])=>{
      if (c != null){
        this.casoviMessage = "";
        
        c.forEach(cn => {
          let datum = new Date();
          datum.setDate(datum.getDate() + 3);
          let datumIzNiza = new Date(cn.datum_i_vreme);
          
          if( datumIzNiza < datum){
            this.casoviNastavnika.push(cn);
          }
        });
    
        this.casoviNastavnika.forEach(cn => {
          this.ucenser.getUcenikByUsername(cn.kor_ime_ucenika).subscribe((ucen: Ucenik)=>{
            if(ucen != null){
              let data: CasSaUcenikom = {
                kor_ime_nastavnika: cn.kor_ime_nastavnika,
                kor_ime_ucenika: cn.kor_ime_ucenika,
                datum_i_vreme: cn.datum_i_vreme,
                deskripcija: cn.deskripcija,
                naziv_predmeta: cn.naziv_predmeta,
                ucenik: ucen,
                datum: cn.datum_i_vreme.toString().substring(0,10),
                vreme: cn.datum_i_vreme.toString().substring(11,16)
              }
              this.casoviNastavnikaSaUcenikom.push(data)
            }
          })
        });
      } else {
        this.casoviMessage = "There are no classes for this Teacher";
      }
    })
  }

  // LOGOUT

  logout() {
    this.korser.logout();
  }

}
