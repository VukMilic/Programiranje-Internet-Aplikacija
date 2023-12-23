import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PredmetNastavnik } from '../models/predmetNastavnik';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username, password) {
    let data = {
      username: username,
      password: password
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/login', data)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  findByUsername(username) {
    let data = {
      username: username
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/findByUsername', data)
  }

  findByEmail(email) {
    let data = {
      email: email
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/findByEmail', data)
  }

  register(username, password, firstname, lastname, adress, phone, email, picture) {
    let data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      phone: phone,
      email: email,
      picture: picture
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/register', data)
  }

  getQuestion(username) {
    let data = {
      username: username
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/getQuestion', data)
  }

  confirmAnswer(username, answer) {
    let data = {
      username: username,
      answer: answer
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/confirmAnswer', data)
  }

  setNewPassword(username, oldPassword, newPassword) {
    let data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/setNewPassword', data)
  }

  setNewPasswordWithoutOldPassword(username, newPassword) {
    let data = {
      username: username,
      newPassword: newPassword
    }

    return this.http.post('http://127.0.0.1:4000/korisnici/setNewPasswordWithoutOldPassword', data)
  }

  getPredmeti() {
    return this.http.get('http://127.0.0.1:4000/predmeti/getPredmeti')
  }

  searchPredNas(predmetNastavnik, searchByPredmet, searchByIme, searchByPrezime): PredmetNastavnik[] {
    let predNasSearched: PredmetNastavnik[] = [];
    let predNasSearchedPom: PredmetNastavnik[] = [];

    // in case that searchByPredmet is not null
    if (searchByPredmet) {

      // first include all predNas with that searchByPredmet
      // and then exclude predNas that don't have searchByIme and searchByPrezime
      predmetNastavnik.forEach(pn => {
        if (pn.predmet.naziv.includes(searchByPredmet)) {
          predNasSearched.push(pn);
          predNasSearchedPom.push(pn);
        }
      });

      if (searchByIme != null) {
        predNasSearchedPom.forEach(pns => {
          if (!pns.nastavnik.ime.includes(searchByIme)) {
            const index = predNasSearched.indexOf(pns);
            if (index > -1)
              predNasSearched.splice(index, 1);
          }
        })
      }

      // moras da presipas posle svakog skracivanja niza (vrv compiler ima neku optimizaciju)
      predNasSearchedPom = [];
      predNasSearched.forEach(pns => {
        predNasSearchedPom.push(pns)
      });

      if (searchByPrezime != null) {
        predNasSearchedPom.forEach(pns => {
          if (!pns.nastavnik.prezime.includes(searchByPrezime)) {
            const index = predNasSearched.indexOf(pns);
            if (index > -1)
              predNasSearched.splice(index, 1);
          }
        })
      }

    } else if (searchByIme) {

      // first include predNas with that searchByIme
      // and then exclude the predNas without searchByPrezime
      predmetNastavnik.forEach(pn => {
        if (pn.nastavnik.ime.includes(searchByIme)) {
          predNasSearched.push(pn);
          predNasSearchedPom.push(pn);
        }
      });

      if (searchByPrezime != null) {
        predNasSearchedPom.forEach(pns => {
          if (!pns.nastavnik.prezime.includes(searchByPrezime)) {
            const index = predNasSearched.indexOf(pns);
            if (index > -1)
              predNasSearched.splice(index, 1);
          }
        })
      }
    } else if (searchByPrezime) {

      //include predNas with that searchByPrezime
      predmetNastavnik.forEach(pn => {
        if (pn.nastavnik.prezime.includes(searchByPrezime)) {
          predNasSearched.push(pn);
        }
      });

    } else {
      // if all search fields are empty, copy all predmetNastavnik into predNasSearched
      predNasSearched = predmetNastavnik;
    }

    return predNasSearched;
  }

  checkToken(pageName){
    let token = localStorage.getItem('token');
    if(token == null){
      // ako korisnik nije ulogovan
      this.router.navigate(['/']);
    
    } else if( token != pageName){
      // ucenik moze da pristupi samo stranici ucenika (isto vazi za nastavnika kao i admina)
      switch(token){
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'nastavnik':
          this.router.navigate(['/nastavnik']);
          break;
        case 'ucenik':
          this.router.navigate(['/ucenik']);
          break;
        default: break;
      }
    }

  }

}
