import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PredmetNastavnikOcena } from '../models/predmetNastavnikOcena';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  constructor(private http: HttpClient) { }

  register(username, password, question, answer, firstname, lastname, sex, adress, phone, email, selectedImage, tipSkole, razred) {
    let data = {
      username: username,
      password: password,
      question: question,
      answer: answer,
      firstname: firstname,
      lastname: lastname,
      sex: sex,
      adress: adress,
      phone: phone,
      email: email,
      selectedImage: selectedImage,
      tipSkole: tipSkole,
      razred: razred
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/register', data)
  }

  countStudents() {
    return this.http.get('http://127.0.0.1:4000/ucenici/countStudents')
  }

  getUcenikUzrast(trenUcenik) {
    if (trenUcenik.tipSkole == "osnovna") {
      if (parseInt(trenUcenik.razred) < 5) {
        return "Osnovna skola 1-4. razred"
      } else {
        return "Osnovna skola 5-8. razred"
      }
    } else {
      return "Srednja skola"
    }
  }

  checkTipSkoleSaRazredom(tipSkole, razred) {
    let message;
    switch (tipSkole) {
      case "srednja-gimnazija":
      case "srednja-umetnicka":
      case "srednja-strucna":
        if (parseInt(razred) > 4)
          message = "Cannot choose that type of school with the chosen type of grade";
        else
          message = "OK";
        break;
      default:
        message = "OK";
        break;
    }

    return message;
  }

  getPredNasUzrast(predNasSearched, uzrastUcenika) {
    let predNasSearchedPom: PredmetNastavnikOcena[] = [];
    predNasSearched.forEach(pns => {
      for (let i = 0; i < pns.nastavnik.uzrast.length; i++) {
        if (pns.nastavnik.uzrast[i].uzrast == uzrastUcenika) {
          predNasSearchedPom.push(pns);
          break;
        }
      }
    });

    return predNasSearchedPom;
  }

  editSlika(username, slika) {
    let data = {
      username: username,
      slika: slika
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editSlika', data)
  }

  editIme(username, name) {
    let data = {
      username: username,
      name: name
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editIme', data)
  }

  editPrezime(username, surname) {
    let data = {
      username: username,
      surname: surname
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editPrezime', data)
  }

  editAdresa(username, address) {
    let data = {
      username: username,
      address: address
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editAdresa', data)
  }

  editMejl(username, email) {
    let data = {
      username: username,
      email: email
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editMejl', data)
  }

  editKontakt(username, phone) {
    let data = {
      username: username,
      phone: phone
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editKontakt', data)
  }

  editTipSkole(username, tipSkole) {
    let data = {
      username: username,
      tipSkole: tipSkole
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editTipSkole', data)
  }

  editRazred(username, tipSkole, razred) {
    let data = {
      username: username,
      tipSkole: tipSkole,
      razred: razred
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/editRazred', data)
  }
  
  setZahtevZaCas(kor_ime_nastavnika, kor_ime_ucenika, naziv_predmeta, datum_i_vreme, deskripcija){
    let data = {
      kor_ime_nastavnika: kor_ime_nastavnika,
      kor_ime_ucenika: kor_ime_ucenika,
      naziv_predmeta: naziv_predmeta,
      datum_i_vreme: datum_i_vreme,
      deskripcija: deskripcija
    }

    return this.http.post('http://127.0.0.1:4000/casovi/setZahtevZaCas', data)
  }

  getUcenikByUsername(username){
    let data = {
      username: username
    }

    return this.http.post('http://127.0.0.1:4000/ucenici/getUcenikByUsername', data)
  }

}
