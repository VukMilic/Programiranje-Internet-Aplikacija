import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Predmet } from '../models/predmet';
import { Uzrast } from '../models/uzrast';
import { NastavnikService } from '../servers/nastavnik.service';
import { UcenikService } from '../servers/ucenik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private korser: KorisnikService, private nasser: NastavnikService, private ucenser: UcenikService) { }

  ngOnInit(): void {
    this.tipSkole = "osnovna";
    this.razred = "1";
  }

  username: string
  password: string
  password2: string
  question: string
  answer: string
  firstname: string
  lastname: string
  sex: string
  address: string
  phone: string
  email: string

  // da li je nastavnik ili ucenik
  type: string

  // ucenik dodatna polja
  tipSkole: string;
  razred: string;

  // nastavnik dodatna polja
  selectedCV: any;
  predmeti: Array<Predmet> = [];
  predmetiVanListe: string;
  predmetiNizStringova: string[];
  uzrasti: Array<Uzrast> = [];
  uzrastiNizStringova: string[];
  odgovorZaSajt: string;

  message: string

  selectedImage: any

  imgSelected(event: any) {
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])
    fr.onloadend = (event) => {
      this.selectedImage = fr.result;
    }
  }

  cvSelected(event: any) {
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])
    fr.onloadend = (event) => {
      this.selectedCV = fr.result;
    }
  }

  registerAsStudent() {
    this.type = "ucenik";
  }
  registerAsTeacher() {
    this.type = "nastavnik";
  }

  register() {

    if (this.type == "nastavnik") {
      // -----------------------------------------------------------------------------------------------------------------------------
      // ako se nastavnik registruje

      if(this.predmetiVanListe != null){
        let predmetiNizVanListe = this.predmetiVanListe.split(',');
        predmetiNizVanListe.forEach(p => {
          this.predmetiNizStringova.push(p);        
        });  
      }
      
      if(this.predmetiNizStringova != null){
        this.predmetiNizStringova.forEach(p => {
          let noviPredmet: Predmet = {
            naziv: p
          }
          this.predmeti.push(noviPredmet)
        });  
      } else {
        this.message = "Please choose a subjects you want to teach"
      }
      // ucitan niz predmeta

      if(this.uzrastiNizStringova != null){
        this.uzrastiNizStringova.forEach(u => {
          let noviUzrast: Uzrast = {
            uzrast: u
          }
          this.uzrasti.push(noviUzrast)
        });
      }else{
        this.message = "Please choose a grade which you want to teach"
      }
      // ucitan niz uzrasta

      const regexPattern = new RegExp('^((?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[a-zA-Z](.{5,9}))$')

      if (this.selectedImage == null) {
        this.selectedImage = '/assets/profilna_default.png'
      }

      if (this.username == null) {
        this.message = "Please enter username"
      } else if (this.password == null) {
        this.message = "Please enter password"
      } else if (!regexPattern.test(this.password)) {
        this.message = "Please enter a regular password"
      } else if (this.question == null) {
        this.message = "Please enter question"
      } else if (this.answer == null) {
        this.message = "Please enter answer"
      } else if (this.firstname == null) {
        this.message = "Please enter firstname"
      } else if (this.lastname == null) {
        this.message = "Please enter lastname"
      } else if (this.sex == null) {
        this.message = "Please enter your sex"
      } else if (this.address == null) {
        this.message = "Please enter address"
      } else if (this.phone == null) {
        this.message = "Please enter phone number"
      } else if (this.email == null) {
        this.message = "Please enter email"
      } else {
        // proveri da li se lozinke poklapaju
        if (this.password == this.password2) {
          // proveri da li username vec postoji
          this.korser.findByUsername(this.username).subscribe((res1) => {

            if (res1["message"] == "ok") {
              // proveri da li email vec postoji
              this.korser.findByEmail(this.email).subscribe((res2) => {

                if (res2["message"] == "ok") {
                  this.nasser.register(this.username, this.password, this.question, this.answer, this.firstname, this.lastname, this.sex, this.address, this.phone, this.email, this.selectedImage, this.selectedCV, this.predmeti, this.uzrasti, this.odgovorZaSajt).subscribe((res3) => {
                    if (res3["message"] == "ok") {
                      this.message = "Teacher added"
                      alert(this.message)
                      this.router.navigate(['/'])
                    } else {
                      this.message = "ERROR"
                    }
                  })
                } else {
                  this.message = "Email already exists"
                }

              })

            } else {
              this.message = "Username already exists"
            }

          })
        } else {
          this.message = "Passwords do not match"
        }


      }


    } else {
      // -----------------------------------------------------------------------------------------------------------------------------
      // ako se ucenik registruje

      const regexPattern = new RegExp('^((?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[a-zA-Z](.{5,9}))$')

      if (this.selectedImage == null) {
        this.selectedImage = '/assets/profilna_default.png'
      }

      if (this.username == null) {
        this.message = "Please enter username"
      } else if (this.password == null) {
        this.message = "Please enter password"
      } else if (!regexPattern.test(this.password)) {
        this.message = "Please enter a regular password"
      } else if (this.question == null) {
        this.message = "Please enter question"
      } else if (this.answer == null) {
        this.message = "Please enter answer"
      } else if (this.firstname == null) {
        this.message = "Please enter firstname"
      } else if (this.lastname == null) {
        this.message = "Please enter lastname"
      } else if (this.sex == null) {
        this.message = "Please enter your sex"
      } else if (this.address == null) {
        this.message = "Please enter address"
      } else if (this.phone == null) {
        this.message = "Please enter phone number"
      } else if (this.email == null) {
        this.message = "Please enter email"
      } else {
        // proveri da li se lozinke poklapaju
        if (this.password == this.password2) {
          // proveri da li username vec postoji
          this.korser.findByUsername(this.username).subscribe((res1) => {

            if (res1["message"] == "ok") {
              // proveri da li email vec postoji
              this.korser.findByEmail(this.email).subscribe((res2) => {

                if (res2["message"] == "ok") {
                  this.ucenser.register(this.username, this.password, this.question, this.answer, this.firstname, this.lastname, this.sex, this.address, this.phone, this.email, this.selectedImage, this.tipSkole, this.razred).subscribe((res3) => {
                    if (res3["message"] == "ok") {
                      this.message = "Student added"
                      alert(this.message)
                      this.router.navigate(['/'])
                    } else {
                      this.message = "ERROR"
                    }
                  })
                } else {
                  this.message = "Email already exists"
                }

              })

            } else {
              this.message = "Username already exists"
            }

          })
        } else {
          this.message = "Passwords do not match"
        }


      }


    }
  }

}
