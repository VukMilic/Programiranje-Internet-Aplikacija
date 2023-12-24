import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Korisnik, Nastavnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { UcenikService } from '../servers/ucenik.service';
import { NastavnikService } from '../servers/nastavnik.service';
import { Predmet } from '../models/predmet';
import { PredmetNastavnik } from '../models/predmetNastavnikOcena';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private korser: KorisnikService, private router: Router, private ucenser: UcenikService, private nasser: NastavnikService) { }

  ngOnInit(): void {
    this.countStudents();
    this.countTeachers();
    this.getPredmeti();
    this.getNastavnici();

    this.numOfClassesWeek = "0";
    this.numOfClassesMonth = "0";
    
  }

  username: string
  password: string

  message: string

  numOfStudents: string;
  numOfTeachers: string;
  numOfClassesWeek: string;
  numOfClassesMonth: string;

  predmeti: Predmet[] = [];
  nastavnici: Nastavnik[] = [];
  predmetNastavnik: PredmetNastavnik[] = [];

  searchByPredmet: string;
  searchByIme: string;
  searchByPrezime: string;
  predNasSearched: PredmetNastavnik[] = [];

  login() {
    this.korser.login(this.username, this.password).subscribe((kor: Korisnik) => {
      if (kor != null) {
        if (kor.tip == "nastavnik") {
          localStorage.setItem('token', 'nastavnik');
          localStorage.setItem('trenKor', JSON.stringify(kor))
          this.router.navigate(['/nastavnik'])
        } else if (kor.tip == "ucenik") {
          localStorage.setItem('token', 'ucenik');
          localStorage.setItem('trenKor', JSON.stringify(kor))
          this.router.navigate(['/ucenik'])
        } else {
          localStorage.setItem('token', 'admin');
          localStorage.setItem('trenAdm', JSON.stringify(kor))
          this.router.navigate(['/admin'])
        }
      } else {
        this.message = "Incorrect credentials"
      }
    })
  }

  countStudents() {
    this.ucenser.countStudents().subscribe((num: string) => {
      if (num != null) {
        this.numOfStudents = num;
      }
      else
        this.numOfStudents = "0";
    })
  }

  countTeachers(){
    this.nasser.countTeachers().subscribe((num: string) => {
      if (num != null) {
        this.numOfTeachers = num;
      }
      else
        this.numOfTeachers = "0";
    })
  }

  getPredmeti(){
    this.korser.getPredmeti().subscribe((p: Predmet[])=>{
      if(p != null){
        this.predmeti = p;
      }
    })
  }

  getNastavnici(){
    this.nasser.getNastavnici().subscribe((n: Nastavnik[])=>{
      if(n != null){
        this.nastavnici = n;
        this.predmeti.forEach(p => {
          this.nastavnici.forEach(n => {
            n.predmeti.forEach(np => {
              if(p.naziv == np.naziv){
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
      }
    })  
  }

  // funkcija za search
  searchPredNas(){
    this.predNasSearched = this.korser.searchPredNas(this.predmetNastavnik, this.searchByPredmet, this.searchByIme, this.searchByPrezime)
  }

  // funkcije za sortiranje
  sortPredDown(a, b){
    if (a.predmet.naziv > b.predmet.naziv) {
      return 1;
    } else {
      return -1;
    }
  }
  predmetDown(){
    this.predNasSearched.sort(this.sortPredDown);
  }
  sortPredUp(a, b){
    if (a.predmet.naziv < b.predmet.naziv) {
      return 1;
    } else {
      return -1;
    }
  }
  predmetUp(){
    this.predNasSearched.sort(this.sortPredUp);
  }
  sortImeDown(a, b){
    if (a.nastavnik.ime > b.nastavnik.ime) {
      return 1;
    } else {
      return -1;
    }
  }
  imeDown(){
    this.predNasSearched.sort(this.sortImeDown)
  }
  sortImeUp(a, b){
    if (a.nastavnik.ime < b.nastavnik.ime) {
      return 1;
    } else {
      return -1;
    }
  }
  imeUp(){
    this.predNasSearched.sort(this.sortImeUp)
  }
  sortPrezimeDown(a, b){
    if (a.nastavnik.prezime > b.nastavnik.prezime) {
      return 1;
    } else {
      return -1;
    }
  }
  prezimeDown(){
    this.predNasSearched.sort(this.sortPrezimeDown)
  }
  sortPrezimeUp(a, b){
    if (a.nastavnik.prezime < b.nastavnik.prezime) {
      return 1;
    } else {
      return -1;
    }
  }
  prezimeUp(){
    this.predNasSearched.sort(this.sortPrezimeUp)
  }
}
