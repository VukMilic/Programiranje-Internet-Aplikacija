import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Admin } from '../models/korisnik';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private korser: KorisnikService) { }

  ngOnInit(): void {
    let pageName = 'admin';
    this.korser.checkToken(pageName);

    this.trenAdmin = JSON.parse(localStorage.getItem('trenAdm'))
  }

  trenAdmin: Admin

  logout(){
    this.korser.logout();
  }
}
