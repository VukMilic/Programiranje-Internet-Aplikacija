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

}
