import { Component, OnInit } from '@angular/core';
import { Nastavnik, Ucenik } from '../models/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { NastavnikService } from '../servers/nastavnik.service';
import { Predmet } from '../models/predmet';
import { Ocena } from '../models/ocena';
import { UcenikService } from '../servers/ucenik.service';

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

  izabraniPredmet: string;
  izabraniDatum: Date;
  izabranaDeskripcija: string;
  dupliCas: string;

  formMessage: string;

  message: string;

  getNastavnikByUsername(username){
    this.nasser.getNastavnikByUsername(username).subscribe((nas: Nastavnik)=>{
      if( nas != null){
        this.nastavnik = nas;
        this.predmetiNastavnika = this.nastavnik.predmeti;
        this.izabraniPredmet = this.predmetiNastavnika[0].naziv;
      } else {
        this.message = "Cannot find the teacher"
      }
    })
  }

  getOceneNastavnika(username){
    this.nasser.getOceneNastavnika(username).subscribe((o: Ocena[])=>{
      if(o != null){
        this.oceneNastavnika = o;
      }else{
        this.message = "Cannot find any grades"
      }
    })
  }

  zakaziCas(){
    let today = new Date;
    if(this.izabraniDatum != null){
      let chosenDate = new Date(this.izabraniDatum);
      if(chosenDate > today){
        // datum je regularan

        // sada ide provera da li nastavnik koji je izabran ima nesto zakazano tada
        
        // ako je sve kako treba, upisi zahtev za cas
        this.ucenser.setZahtevZaCas(this.nastavnik.kor_ime, this.trenUcenik.kor_ime, this.izabraniPredmet, this.izabraniDatum, this.izabranaDeskripcija).subscribe((resp: string)=>{
          alert("Your request has been sent, and once the teacher reviews it, you will receive the response.");
          this.router.navigate(['/ucenik'])
        })
      
      }else{
        this.formMessage = "The chosen date has passed, please choose a regular one."
      }
    }else{
      this.formMessage = "Please, choose a date."
    }
  }

  goBack(){
    this.router.navigate(['/ucenik'])
  }
}
