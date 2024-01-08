import { Component, OnInit } from '@angular/core';
import { Nastavnik, Ucenik } from '../models/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { NastavnikService } from '../servers/nastavnik.service';
import { Predmet } from '../models/predmet';
import { Ocena } from '../models/ocena';
import { UcenikService } from '../servers/ucenik.service';
import { Cas } from '../models/cas';

@Component({
  selector: 'app-nastavnik-detalji',
  templateUrl: './nastavnik-detalji.component.html',
  styleUrls: ['./nastavnik-detalji.component.css']
})
export class NastavnikDetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private nasser: NastavnikService, private ucenser: UcenikService, private router: Router) { }

  ngOnInit(): void {
    const kor_ime = this.route.snapshot.paramMap.get('kor_ime');
    this.trenUcenik = JSON.parse(localStorage.getItem("trenKor"));

    this.getNastavnikByUsername(kor_ime);
    this.getOceneNastavnika(kor_ime);

    this.dupliCas = null;
  }

  nastavnik: Nastavnik = null;
  trenUcenik: Ucenik;
  predmetiNastavnika: Predmet[] = [];
  oceneNastavnika: Ocena[] = [];
  prosecnaOcena: number;
  casoviNastavnika: Cas[];

  izabraniPredmet: string;
  izabraniDatum: Date;
  izabranaDeskripcija: string;
  dupliCas: string;

  formMessage: string;
  formMessageTimes: string[] = [];

  message: string;

  getNastavnikByUsername(username) {
    this.nasser.getNastavnikByUsername(username).subscribe((nas: Nastavnik) => {
      if (nas != null) {
        this.nastavnik = nas;
        this.predmetiNastavnika = this.nastavnik.predmeti;
        this.izabraniPredmet = this.predmetiNastavnika[0].naziv;

        this.nasser.getCasoviNastavnika(nas.kor_ime).subscribe((casovi: Cas[]) => {
          if (casovi != null) {
            this.casoviNastavnika = casovi;
            this.casoviNastavnika.sort(this.sortDatumi);
          }
        })
      } else {
        this.message = "Cannot find the teacher"
      }
    })
  }

  getOceneNastavnika(username) {
    this.nasser.getOceneNastavnika(username).subscribe((o: Ocena[]) => {
      if (o != null) {
        this.oceneNastavnika = o;
      } else {
        this.message = "Cannot find any grades"
      }
    })
  }

  sortDatumi(a, b) {
    if (a.datum_i_vreme > b.datum_i_vreme) {
      return 1;
    } else {
      return -1;
    }
  }

  clearForm() {
    this.dupliCas = null
  }

  zakaziCas() {
    // this.returnMessage = "On the chosen date this teacher is free in the following times:";
    // // a = "08:00"
    // let a = new Date(this.izabraniDatum);
    // a.setHours(8);
    // a.setMinutes(0);

    // this.casoviNastavnika.forEach(cn => {
    //   let cnDatum = new Date(cn.datum_i_vreme);
    //   if (chosenDate.getFullYear() === cnDatum.getFullYear() &&
    //     chosenDate.getMonth() === cnDatum.getMonth() &&
    //     chosenDate.getDay() === cnDatum.getDay()) {

    //     // b = "10:30" npr
    //     // c = "11:30" npr
    //     let b = new Date(cnDatum)
    //     let c = new Date(cnDatum)
    //     if (cn.trajanje == "2 hours") {
    //       c.setHours(cnDatum.getHours() + 2)
    //     } else {
    //       c.setHours(cnDatum.getHours() + 1)
    //     }
    //     // ako je a + 1 sat manje ili jednako od b znaci da ima dovoljno prostora da se zakaze jedan cas u tom periodu
    //     a.setHours(a.getHours() + 1)
    //     if(a <= b){
    //       a.setHours(a.getHours() - 1)
    //       this.returnMessageTimes.push(a.toString() + " - " + b.toString())
    //     }
    //     // i ako je imalo prostora i ako nije, svakako se ide na sledeci termin koji pocinje na c (kada se zavrsio ovaj prethodni)
    //     a = new Date(c);
    //   }
    // });
    if (this.izabraniDatum != null) {

      let chosenDate = new Date(this.izabraniDatum);
      let sati = 0;

      // provera da li je izabran vikend
      if (chosenDate.getDay() == 0 || chosenDate.getDay() == 6) {
        this.formMessage = "Please choose a work day!"
        this.clearForm();
        return;
      }

      // provera da li su minuti 00 ili 30
      if (chosenDate.getMinutes() != 30 && chosenDate.getMinutes() != 0) {
        this.formMessage = "Class can only be scheduled every half hour! (00 or 30 min)"
        this.clearForm();
        return;
      }

      if (this.dupliCas != null) {
        this.dupliCas = "2 hours"
        sati = 2;
      } else {
        this.dupliCas = "1 hour"
        sati = 1;
      }

      // provera da li je izabrana satnica unutar 10:00 - 18:00 ( a - b )
      if (chosenDate.getHours() < 10 ||
        (chosenDate.getHours() + sati) > 18 ||
        ((chosenDate.getHours() + sati) == 18 && chosenDate.getMinutes() == 30)) {
        this.formMessage = "Please choose a period between 10:00 AM and 06:00 PM!"
        this.clearForm();
        return;
      }

      let sada = new Date;

      // provera da li je datum vec prosao
      if (chosenDate <= sada) {
        this.formMessage = "The chosen date has passed, please choose a regular one."
        this.clearForm();
        return;
      }

      let a = new Date(this.izabraniDatum);
      a.setHours(10);
      a.setMinutes(0);

      // provera da li je nastavnik zauzet taj ceo dan
      for (let i = 0; i < this.casoviNastavnika.length; i++) {
        let cnDatum = new Date(this.casoviNastavnika[i].datum_i_vreme);
        if (chosenDate.getFullYear() === cnDatum.getFullYear() &&
          chosenDate.getMonth() === cnDatum.getMonth() &&
          chosenDate.getDay() === cnDatum.getDay()) {

          // b = "10:30" npr
          // c = "11:30" npr
          let b = new Date(cnDatum)
          let c = new Date(cnDatum)
          if (this.casoviNastavnika[i].trajanje == "2 hours") {
            c.setHours(cnDatum.getHours() + 2)
          } else {
            c.setHours(cnDatum.getHours() + 1)
          }
          // ako je a + 1 sat manje ili jednako od b znaci da ima dovoljno prostora da se zakaze jedan cas u tom periodu
          a.setHours(a.getHours() + 1)
          if (a <= b) {
            break;
          }
          // idemo na sledeci termin koji pocinje na c (kada se zavrsio ovaj prethodni)
          a = new Date(c);
          
          if(a.getHours() == 18 || (a.getHours() == 17 && a.getMinutes() == 30)){
            this.formMessage = "On the selected date, this teacher is occupied all day."
            this.clearForm();
            return;
          }
        }
      };

      // provera da li nastavnik koji je izabran ima nesto zakazano tada
      for (let i = 0; i < this.casoviNastavnika.length; i++) {
        let cnDatum = new Date(this.casoviNastavnika[i].datum_i_vreme);
        if (chosenDate.getFullYear() === cnDatum.getFullYear() &&
          chosenDate.getMonth() === cnDatum.getMonth() &&
          chosenDate.getDay() === cnDatum.getDay()) {
          // a - pocetna satnica izabranog casa
          // b - krajnja satnica izabranog casa
          let a = new Date(chosenDate);
          let b = new Date(chosenDate);
          b.setHours(b.getHours() + sati);
          // c - pocetna satnica vec postojeceg casa
          // d - krajnja satnica vec postojeceg casa
          let c = new Date(this.casoviNastavnika[i].datum_i_vreme);
          let d = new Date(this.casoviNastavnika[i].datum_i_vreme);
          if (this.casoviNastavnika[i].trajanje == "2 hours") {
            d.setHours(d.getHours() + 2);
          } else {
            d.setHours(d.getHours() + 1);
          }
          // i sad ide provera da li se preklapaju izmedju sebe
          if ((b > c && b <= d) ||
            (a >= c && a < d) ||
            (a < c && b > d)) {
            this.formMessage = "The chosen time slot is already reserved!"
            this.clearForm();
            return;
          }
        }
      }


      // ako je sve kako treba, upisi zahtev za cas
      this.ucenser.setZahtevZaCas(this.nastavnik.kor_ime, this.trenUcenik.kor_ime, this.izabraniPredmet, this.izabraniDatum, this.izabranaDeskripcija, this.dupliCas).subscribe((resp: string) => {
        alert("Your request has been sent, and once the teacher reviews it, you will receive the response.");
        this.router.navigate(['/ucenik'])
      })



    } else {
      this.formMessage = "Please choose a date."
      this.clearForm();
    }
  }

  goBack() {
    this.router.navigate(['/ucenik'])
  }
}
