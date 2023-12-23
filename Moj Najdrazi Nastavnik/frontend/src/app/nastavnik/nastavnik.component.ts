import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Nastavnik } from '../models/korisnik';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  constructor(private korser: KorisnikService) { }

  ngOnInit(): void {
    this.trenNastavnik = JSON.parse(localStorage.getItem('trenKor'))
    
    let pageName = 'nastavnik'
    this.korser.checkToken(pageName);
  }

  trenNastavnik: Nastavnik;

  logout(){
    this.korser.logout();
  }

}
