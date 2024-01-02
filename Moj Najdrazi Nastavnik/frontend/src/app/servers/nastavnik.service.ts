import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  constructor(private http: HttpClient) { }

  register(username, password, question, answer, firstname, lastname, sex, address, phone, email, selectedImage, selectedCV, predmeti, uzrasti, odgovorZaSajt){
    
    let data = {
      username: username,
      password: password,
      question: question,
      answer: answer,
      firstname: firstname,
      lastname: lastname,
      sex: sex,
      address: address,
      phone: phone,
      email: email,
      selectedImage: selectedImage,
      selectedCV: selectedCV,
      predmeti: predmeti,
      uzrasti: uzrasti,
      odgovorZaSajt: odgovorZaSajt
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/register', data)
  }

  countTeachers(){
    return this.http.get('http://127.0.0.1:4000/nastavnici/countTeachers')
  }

  getNastavnici(){
    return this.http.get('http://127.0.0.1:4000/nastavnici/getNastavnici')
  }

  getNastavnikByUsername(username){
    let data = {
      username: username
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/getNastavnikByUsername', data)
  }

  getOceneNastavnika(username){
    let data = {
      username: username
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/getOceneNastavnika', data)
  }

  getOcene(){
    return this.http.get('http://127.0.0.1:4000/nastavnici/getOcene')
  }

  editIme(username, name){
    let data = {
      username: username,
      name: name
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editIme', data)
  }

  editPrezime(username, surname){
    let data = {
      username: username,
      surname: surname
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editPrezime', data)
  }

  editAdresu(username, address){
    let data = {
      username: username,
      address: address
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editAdresu', data)
  }

  editMejl(username, email){
    let data = {
      username: username,
      email: email
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editMejl', data)
  }

  editKontakt(username, phone){
    let data = {
      username: username,
      phone: phone
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editKontakt', data)
  }

  editUzrast(username, uzrast){
    let data = {
      username: username,
      uzrast: uzrast
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editUzrast', data)
  }

  editPredmeti(username, predmeti){
    let data = {
      username: username,
      predmeti: predmeti
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editPredmeti', data)
  }

  editSlika(username, slika){
    let data = {
      username: username,
      slika: slika
    }

    return this.http.post('http://127.0.0.1:4000/nastavnici/editSlika', data)
  }

}
