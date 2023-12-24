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

    this.getPredmeti();
    this.getNastavnici();
  }

  trenUcenik: Ucenik;
  nastavniciUcenika: Nastavnik[] = [];
  uzrastUcenika: string;

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

  // funkcija za search
  searchPredNas() {
    this.predNasSearched = this.korser.searchPredNas(this.predmetNastavnik, this.searchByPredmet, this.searchByIme, this.searchByPrezime);
    this.getPredNasUzrast();
    this.getOcene();
  }

  getUcenikUzrast(){
    this.uzrastUcenika = this.ucenser.getUcenikUzrast(this.trenUcenik);
  }

  getPredNasUzrast(){
    this.predNasSearched = this.ucenser.getPredNasUzrast(this.predNasSearched, this.uzrastUcenika);
  }

  getOcene(){
    this.nasser.getOcene().subscribe((o: Ocena[])=>{
      if(o != null){
        this.ocene = o;
        this.predNasOcenaSearched = [];
        this.predNasSearched.forEach(pns => {
          let sum = 0;
          let avg = 0;
          let cnt = 0;
          this.ocene.forEach(o => {
            if(o.kor_ime_nastavnika == pns.nastavnik.kor_ime){
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
