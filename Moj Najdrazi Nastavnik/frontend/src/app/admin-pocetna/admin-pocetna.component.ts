import { Component, OnInit } from '@angular/core';
import { AdminService } from '../servers/admin.service';
import { Admin } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private admser: AdminService, private router: Router) { }

  ngOnInit(): void {
  }
  
  username: string
  password: string

  message: string

  login(){
    this.admser.login(this.username, this.password).subscribe((adm: Admin)=>{
      if(adm != null){
        localStorage.setItem('token', 'admin');
        localStorage.setItem('trenAdm', JSON.stringify(adm))
        this.router.navigate(['/admin'])
      }else{
        this.message = "Incorrect credentials"
      }
    })
  }

}
