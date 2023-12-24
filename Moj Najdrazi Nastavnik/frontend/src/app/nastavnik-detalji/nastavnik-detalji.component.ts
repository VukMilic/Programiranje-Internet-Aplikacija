import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../models/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { NastavnikService } from '../servers/nastavnik.service';
import { Predmet } from '../models/predmet';
import { Ocena } from '../models/ocena';

@Component({
  selector: 'app-nastavnik-detalji',
  templateUrl: './nastavnik-detalji.component.html',
  styleUrls: ['./nastavnik-detalji.component.css']
})
export class NastavnikDetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private nasser: NastavnikService, private router: Router) { }

  ngOnInit(): void {
    const kor_ime = this.route.snapshot.paramMap.get('kor_ime');

    this.getNastavnikByUsername(kor_ime);
    this.getOceneNastavnika(kor_ime);
  }

  nastavnik: Nastavnik = null;
  predmetiNastavnika: Predmet[] = [];
  oceneNastavnika: Ocena[] = [];
  prosecnaOcena: number;

  message: string;

  getNastavnikByUsername(username){
    this.nasser.getNastavnikByUsername(username).subscribe((nas: Nastavnik)=>{
      if( nas != null){
        this.nastavnik = nas;
        this.predmetiNastavnika = this.nastavnik.predmeti
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

  goBack(){
    this.router.navigate(['/ucenik'])
  }
}
