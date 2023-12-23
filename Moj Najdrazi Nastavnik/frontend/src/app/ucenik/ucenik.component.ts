import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Ucenik } from '../models/korisnik';

@Component({
  selector: 'app-ucenik',
  templateUrl: './ucenik.component.html',
  styleUrls: ['./ucenik.component.css']
})
export class UcenikComponent implements OnInit {

  constructor(private http: HttpClient, private korser: KorisnikService) { }

  ngOnInit(): void {
    let pageName = 'ucenik'
    this.korser.checkToken(pageName);

    this.trenUcenik = JSON.parse(localStorage.getItem('trenKor'))
  }

  trenUcenik: Ucenik;

  logout(){
    this.korser.logout();
  }

}
