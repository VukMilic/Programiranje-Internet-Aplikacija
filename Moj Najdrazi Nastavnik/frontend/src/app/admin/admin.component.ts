import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Admin, ZahtevZaRegistraciju } from '../models/korisnik';
import { AdminService } from '../servers/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private korser: KorisnikService, private admser: AdminService) { }

  ngOnInit(): void {
    let pageName = 'admin';
    this.korser.checkToken(pageName);

    this.trenAdmin = JSON.parse(localStorage.getItem('trenAdm'));

    this.getSveZateve();
  }

  trenAdmin: Admin;
  sviZahtevi: ZahtevZaRegistraciju[] = [];
  messageZahtevi: string;

  // zahtevi
  getSveZateve(){
    this.admser.getSveZahteve().subscribe((z: ZahtevZaRegistraciju[])=>{
      if(z != null){
        this.sviZahtevi = z;
        this.sviZahtevi.forEach(sz => {
          let reader = new FileReader();
          reader.readAsDataURL(sz.CV);
          reader.onload = function() {
            sz.CVbase64 = reader.result as string;
          }
        });
      }else{
        this.messageZahtevi = "Nema zahteva za registraciju";
      }
    });
  }

  logout(){
    this.korser.logout();
  }
}
