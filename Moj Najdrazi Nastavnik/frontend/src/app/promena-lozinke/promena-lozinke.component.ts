import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private korser: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.questionTrig = 0;
    this.answerTrig = 0;
  }

  username: string;
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;


  questionTrig: number;
  answerTrig: number;

  question: string;
  answer: string;

  message: string;

  changePassword() {
    const regexPattern = new RegExp('^((?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[a-zA-Z](.{5,9}))$')
    if (!regexPattern.test(this.newPassword)) {
      this.message = "Please enter a regular password"
    } else {
      if (this.answerTrig == 0) {
        // ako korisnik zeli da promeni lozinku a pritome zna staru lozinku
        if (this.newPassword != this.newPasswordAgain) {
          this.message = "New Password and New Password again are not equal"
          return
        } else {
          this.korser.setNewPassword(this.username, this.oldPassword, this.newPassword).subscribe((res: string) => {
            if (res != null) {
              this.message = "Password is changed successfully"
              alert(this.message)
              this.router.navigate(['/'])
            } else {
              this.message = "Incorect credentials"
            }
          })
        }
      } else {
        // ako korisnik ne zna staru lozinku ali je zato uspesno odgovorio na pitanje
        if (this.newPassword != this.newPasswordAgain) {
          this.message = "New Password and New Password again are not equal"
          return
        } else {
          this.korser.setNewPasswordWithoutOldPassword(this.username, this.newPassword).subscribe((res: string) => {
            if (res != null) {
              this.message = "Password is changed successfully"
              alert(this.message)
              this.router.navigate(['/'])
            } else {
              this.message = "Incorect credentials"
            }
          })

        }
      }
    }

  }

  triggerQuestion() {
    this.questionTrig = 1;
    this.korser.getQuestion(this.username).subscribe((q: string) => {
      if (q != null) {
        this.question = q;
      } else {
        this.message = "Username doesn't exist"
      }
    })
  }

  backToRegularForm() {
    this.questionTrig = 0;
    this.answerTrig = 0;
    this.message = "";
  }

  confirmAnswer() {
    this.korser.confirmAnswer(this.username, this.answer).subscribe((a: string) => {
      if (a != null) {
        this.answerTrig = 1;
        this.message = "";
      } else {
        this.answerTrig = 0;
        this.message = "Your answer is not correct"
      }
    })
  }

}
