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
    if(trenUcenik.tipSkole == "osnovna"){
      if(parseInt(trenUcenik.razred) < 5){
        return "Osnovna skola 1-4. razred"
      } else {
        return "Osnovna skola 5-8. razred"
      }
    } else {
      return "Srednja skola"
    }
  }

  getPredNasUzrast(predNasSearched, uzrastUcenika){
    let predNasSearchedPom: PredmetNastavnikOcena[] = [];
    predNasSearched.forEach(pns => {
      for (let i = 0; i < pns.nastavnik.uzrast.length; i++) {
        if(pns.nastavnik.uzrast[i].uzrast == uzrastUcenika){
          predNasSearchedPom.push(pns);
          break;
        }        
      }
    });

    return predNasSearchedPom;
  }

}
