import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  constructor(private http: HttpClient) { }

  register(username, password, question, answer, firstname, lastname, sex, adress, phone, email, selectedImage, tipSkole, razred){
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

  countStudents(){
    return this.http.get('http://127.0.0.1:4000/ucenici/countStudents')
  }
  
}
