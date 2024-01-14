import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../servers/korisnik.service';
import { Nastavnik, Ucenik } from '../models/korisnik';
import { NastavnikService } from '../servers/nastavnik.service';
import { Uzrast } from '../models/uzrast';
import { Predmet } from '../models/predmet';
import { Cas, CasSaNastavnikom, CasSaUcenikom, ZahtevZaCas, ZahtevZaCasSaUcenikom } from '../models/cas';
import { UcenikService } from '../servers/ucenik.service';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  constructor(private korser: KorisnikService, private nasser: NastavnikService, private ucenser: UcenikService) { }

  ngOnInit(): void {
    this.trenNastavnik = JSON.parse(localStorage.getItem('trenKor'))

    let pageName = 'nastavnik'
    this.korser.checkToken(pageName);

    this.editujIme = false;
    this.editujPrezime = false;
    this.editujAdresu = false;
    this.editujMejl = false;
    this.editujKontakt = false;
    this.editujUzrast = false;
    this.editujPredmete = false;
    this.editujSliku = false;

    let casoviFlag = localStorage.getItem("casoviFlag")
    if (casoviFlag == "yes") {
      this.stavkaMenija = 1;
      localStorage.setItem("casoviFlag", "no");
      this.casoviNastavnikaSaUcenikom = JSON.parse(localStorage.getItem("casoviNastavnikaSaUcenikom"));
    } else {
      this.stavkaMenija = 0;
      this.getCasoviNastavnika();
    }

    this.getZahteviZaCasNastavnika();
  }


  trenNastavnik: Nastavnik;
  uzrastiNizStringova: string[];
  predmetiNizStringova: string[];

  uceniciNastavnika: Ucenik[] = [];
  casoviUcenika: Cas[] = [];
  casoviUcenikaDosije: CasSaNastavnikom[] = [];
  setPredmetaDosije: Set<string> = new Set;
  setDatumaDosije: Set<string> = new Set;
  mapaPredmetDatumDosije: Map<string, Set<string>> = new Map;

  casoviNastavnika: Cas[] = [];
  // ovo sledece su casovi koji se prikazuju (sortirani i skraceni)
  casoviNastavnikaSaUcenikom: CasSaUcenikom[] = [];
  zahteviZaCasovima: ZahtevZaCas[] = [];
  // ovo sledece su casovi koji se prikazuju (sortirani i skraceni)
  zahteviZaCasovimaSaUcenikom: ZahtevZaCasSaUcenikom[] = [];
  zahteviZaCasovimaFlags: Map<string, number> = new Map;
  casoviMessage: string;
  zahteviMessage: string;
  acceptMessage: string;

  stavkaMenija: number;

  editujIme: boolean;
  editujPrezime: boolean;
  editujAdresu: boolean;
  editujMejl: boolean;
  editujKontakt: boolean;
  editujUzrast: boolean;
  editujPredmete: boolean;
  editujSliku: boolean;

  toggleProfil() {
    this.stavkaMenija = 0;
  }

  toggleCasovi() {
    this.stavkaMenija = 1;

    let casoviPom: CasSaUcenikom[] = [];
    this.casoviNastavnikaSaUcenikom.forEach(cnsu => {
      if (cnsu.status != "finished") {
        casoviPom.push(cnsu);
      }
    });
    this.casoviNastavnikaSaUcenikom = casoviPom;

    this.casoviNastavnikaSaUcenikom.sort(this.sortDatumi);
    this.casoviNastavnika = this.casoviNastavnikaSaUcenikom;

    this.casoviNastavnikaSaUcenikom.splice(5);
  }

  toggleUcenici() {
    this.stavkaMenija = 2;
    this.dosijeFlag = false;

    this.uceniciNastavnika.forEach(un => {
      this.nasser.getCasoviUcenikaINastavnika(this.trenNastavnik.kor_ime, un.kor_ime).subscribe((c: Cas[]) => {
        if (c != null) {
          c.forEach(cas => {
            if (cas.status == "finished")
              this.casoviUcenika.push(cas);
          });
          this.casoviUcenika.sort(this.sortDatumi);
        }
      })
    });
  }

  imgSelected(event: any) {
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])
    fr.onloadend = (event) => {
      this.trenNastavnik.slika = fr.result.toString();
      this.editujSliku = true;
    }
  }

  confirmSliku() {
    if (this.trenNastavnik.slika != '/assets/profilna_default.png' && this.trenNastavnik.slika != null) {
      this.nasser.editSlika(this.trenNastavnik.kor_ime, this.trenNastavnik.slika).subscribe((resp: string) => {
        this.editujSliku = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
      })
    } else {
      this.editujSliku = false;
    }
  }

  editIme() {
    if (this.editujIme == false)
      this.editujIme = true;
  }

  confirmIme() {
    this.nasser.editIme(this.trenNastavnik.kor_ime, this.trenNastavnik.ime).subscribe((resp: string) => {
      this.editujIme = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editPrezime() {
    if (this.editujPrezime == false) {
      this.editujPrezime = true;
    }
  }

  confirmPrezime() {
    this.nasser.editPrezime(this.trenNastavnik.kor_ime, this.trenNastavnik.prezime).subscribe((resp: string) => {
      this.editujPrezime = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editAdresu() {
    if (this.editujAdresu == false) {
      this.editujAdresu = true;
    }
  }

  confirmAdresu() {
    this.nasser.editAdresu(this.trenNastavnik.kor_ime, this.trenNastavnik.adresa).subscribe((resp: string) => {
      this.editujAdresu = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editMejl() {
    if (this.editujMejl == false)
      this.editujMejl = true;
  }

  confirmMejl() {
    this.nasser.editMejl(this.trenNastavnik.kor_ime, this.trenNastavnik.mejl).subscribe((resp: string) => {
      this.editujMejl = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editKontakt() {
    if (this.editujKontakt == false)
      this.editujKontakt = true;
  }

  confirmKontakt() {
    this.nasser.editKontakt(this.trenNastavnik.kor_ime, this.trenNastavnik.kontakt).subscribe((resp: string) => {
      this.editujKontakt = false;
      localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
    })
  }

  editUzrast() {
    if (this.editujUzrast == false)
      this.editujUzrast = true;
  }

  confirmUzrast() {
    if (this.uzrastiNizStringova != null) {
      this.trenNastavnik.uzrast = [];

      this.uzrastiNizStringova.forEach(u => {
        let noviUzrast: Uzrast = {
          uzrast: u
        }
        this.trenNastavnik.uzrast.push(noviUzrast)
      });

      this.uzrastiNizStringova = null;

      this.nasser.editUzrast(this.trenNastavnik.kor_ime, this.trenNastavnik.uzrast).subscribe((resp: string) => {
        this.editujUzrast = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
      })
    } else {
      this.editujUzrast = false;
    }
  }

  editPredmeti() {
    if (this.editujPredmete == false)
      this.editujPredmete = true;
  }

  confirmPredmeti() {
    if (this.predmetiNizStringova != null) {
      this.trenNastavnik.predmeti = [];

      this.predmetiNizStringova.forEach(p => {
        let noviPredmet: Predmet = {
          naziv: p
        }
        this.trenNastavnik.predmeti.push(noviPredmet)
      });

      this.predmetiNizStringova = null;

      this.nasser.editPredmeti(this.trenNastavnik.kor_ime, this.trenNastavnik.predmeti).subscribe((resp: string) => {
        this.editujPredmete = false;
        localStorage.setItem("trenKor", JSON.stringify(this.trenNastavnik));
      })
    } else {
      this.editujPredmete = false;
    }
  }

  // CASOVI - funkcije

  sortDatumi(a, b) {
    if (a.datum_i_vreme > b.datum_i_vreme) {
      return 1;
    } else {
      return -1;
    }
  }

  getCasoviNastavnika() {
    this.nasser.getCasoviNastavnika(this.trenNastavnik.kor_ime).subscribe((c: Cas[]) => {
      if (c != null) {
        this.casoviMessage = "";

        c.forEach(cn => {
          let datum = new Date();
          datum.setDate(datum.getDate() + 3);
          let datumIzNiza = new Date(cn.datum_i_vreme);

          if (datumIzNiza < datum && cn.status != "finished") {
            this.casoviNastavnika.push(cn);
          }
        });

        this.casoviNastavnika.forEach(cn => {
          this.ucenser.getUcenikByUsername(cn.kor_ime_ucenika).subscribe((ucen: Ucenik) => {
            if (ucen != null) {
              let data: CasSaUcenikom = {
                _id: cn._id,
                kor_ime_nastavnika: cn.kor_ime_nastavnika,
                kor_ime_ucenika: cn.kor_ime_ucenika,
                datum_i_vreme: cn.datum_i_vreme,
                deskripcija: cn.deskripcija,
                naziv_predmeta: cn.naziv_predmeta,
                status: cn.status,
                trajanje: cn.trajanje,
                ucenik: ucen,
                datum: cn.datum_i_vreme.toString().substring(0, 10),
                vreme: cn.datum_i_vreme.toString().substring(11, 16)
              }
              this.casoviNastavnikaSaUcenikom.push(data);
              if (this.casoviNastavnika.indexOf(cn) == this.casoviNastavnika.length - 1) {
                this.casoviNastavnikaSaUcenikom.sort(this.sortDatumi);
                this.casoviNastavnikaSaUcenikom.splice(5);
                localStorage.setItem("casoviNastavnikaSaUcenikom", JSON.stringify(this.casoviNastavnikaSaUcenikom));
              }
            }
          })
        });

        this.getUceniciNastavnika(c);
      } else {
        this.casoviMessage = "There are no classes for this Teacher";
      }
    })
  }

  getZahteviZaCasNastavnika() {
    this.nasser.getZahteviZaCasNastavnika(this.trenNastavnik.kor_ime).subscribe((z: ZahtevZaCas[]) => {
      if (z != null) {
        z.forEach(ze => {
          if (ze.status == "waiting") {
            this.zahteviZaCasovima.push(ze)
          }
        });

        this.zahteviZaCasovima.splice(5);

        if (this.zahteviZaCasovima.length == 0) {
          this.zahteviMessage = "NO NEW REQUESTS"
        } else {
          this.zahteviMessage = ""
        }

        this.zahteviZaCasovima.forEach(zzc => {
          this.ucenser.getUcenikByUsername(zzc.kor_ime_ucenika).subscribe((ucen: Ucenik) => {
            if (ucen != null) {
              let data: ZahtevZaCasSaUcenikom = {
                _id: zzc._id,
                kor_ime_nastavnika: zzc.kor_ime_nastavnika,
                kor_ime_ucenika: zzc.kor_ime_ucenika,
                datum_i_vreme: zzc.datum_i_vreme,
                deskripcija: zzc.deskripcija,
                naziv_predmeta: zzc.naziv_predmeta,
                status: zzc.status,
                odgovor: zzc.odgovor,
                trajanje: zzc.trajanje,
                ucenik: ucen,
                datum: zzc.datum_i_vreme.toString().substring(0, 10),
                vreme: zzc.datum_i_vreme.toString().substring(11, 16)
              }
              this.zahteviZaCasovimaSaUcenikom.push(data)
              this.zahteviZaCasovimaFlags[data._id] = 0;
            }
          })
        });
      }
    })
  }

  accept(id) {
    this.acceptMessage = "";

    this.zahteviZaCasovimaSaUcenikom.forEach(zzc => {
      if (zzc._id == id) {
        // provera da slucajno Nastavnik ne prihvati dva zahteva cija se vremena preklapaju
        for (let i = 0; i < this.casoviNastavnika.length; i++) {
          let cnDatum = new Date(this.casoviNastavnika[i].datum_i_vreme);
          let zzcDatum = new Date(zzc.datum_i_vreme);
          if (zzcDatum.getFullYear() === cnDatum.getFullYear() &&
            zzcDatum.getMonth() === cnDatum.getMonth() &&
            zzcDatum.getDay() === cnDatum.getDay()) {

            let sati;
            if (zzc.trajanje == "2 hours") {
              sati = 2;
            } else {
              sati = 1;
            }
            // a - pocetna satnica izabranog casa
            // b - krajnja satnica izabranog casa
            let a = new Date(zzcDatum);
            let b = new Date(zzcDatum);
            b.setHours(b.getHours() + sati);
            // c - pocetna satnica vec postojeceg casa
            // d - krajnja satnica vec postojeceg casa
            let c = new Date(this.casoviNastavnika[i].datum_i_vreme);
            let d = new Date(this.casoviNastavnika[i].datum_i_vreme);
            if (this.casoviNastavnika[i].trajanje == "2 hours") {
              d.setHours(d.getHours() + 2);
            } else {
              d.setHours(d.getHours() + 1);
            }
            // i sad ide provera da li se preklapaju izmedju sebe
            if ((b > c && b <= d) ||
              (a >= c && a < d) ||
              (a < c && b > d)) {
              this.acceptMessage = "You cannot accept this request because you already have a class in that time slot";
              return;
            }

          }

        }

        this.nasser.setAccept(zzc._id, zzc.kor_ime_nastavnika, zzc.kor_ime_ucenika, zzc.naziv_predmeta, zzc.datum_i_vreme, zzc.deskripcija, zzc.trajanje).subscribe((noviCas: Cas) => {
          if (noviCas != null) {

            this.ucenser.getUcenikByUsername(noviCas.kor_ime_ucenika).subscribe((ucen: Ucenik) => {
              if (ucen != null) {
                // vratio sam noviCas koji sam insertovao u bazu
                // zatim treba da dohvatim ucenika da bih imao podatak CasSaUcenikom
                // i to onda hocu da pushujem u niz casova koji se prikazuje u scheduleru
                // to cu onda ubaciti u localStorage i onda izvuci iz localStorage-a prilikom reloadovanja stranice
                let data: CasSaUcenikom = {
                  _id: noviCas._id,
                  kor_ime_nastavnika: noviCas.kor_ime_nastavnika,
                  kor_ime_ucenika: noviCas.kor_ime_ucenika,
                  datum_i_vreme: noviCas.datum_i_vreme,
                  deskripcija: noviCas.deskripcija,
                  naziv_predmeta: noviCas.naziv_predmeta,
                  status: noviCas.status,
                  trajanje: noviCas.trajanje,
                  ucenik: ucen,
                  datum: noviCas.datum_i_vreme.toString().substring(0, 10),
                  vreme: noviCas.datum_i_vreme.toString().substring(11, 16)
                }
                this.casoviNastavnikaSaUcenikom.push(data);

                this.casoviNastavnikaSaUcenikom.sort(this.sortDatumi);
                this.casoviNastavnikaSaUcenikom.splice(5);

                localStorage.setItem("casoviNastavnikaSaUcenikom", JSON.stringify(this.casoviNastavnikaSaUcenikom));
              }
            })

            localStorage.setItem("casoviFlag", "yes")
            location.reload()
          }
        })
      }
    });

  }

  declineFlag(id) {
    this.acceptMessage = "";

    if (this.zahteviZaCasovimaFlags[id] == 0) {
      this.zahteviZaCasovimaFlags[id] = 1;
    }
  }

  decline(id, odgovor) {
    this.nasser.setDecline(id, odgovor).subscribe((resp: string) => {
      if (resp != null) {
        localStorage.setItem("casoviFlag", "yes")
        location.reload()
      }
    })
  }

  // JOIN-ovanje na cas

  intervalIdJoin = setInterval(() => this.checkJoin(), 1000);
  intervalIdFinish = setInterval(() => this.checkFinish(), 1000);
  flag00: boolean = false;
  flag15: boolean = false;
  flag30: boolean = false;
  flag45: boolean = false;

  checkJoin() {
    let sada = new Date();
    // console.log(sada.getMinutes());
    // console.log(sada.getSeconds());

    if ((sada.getMinutes() >= 15 && sada.getMinutes() <= 30 && this.flag15 == false)
      || (sada.getMinutes() >= 45 && this.flag45 == false)) {
      // na svakih 15 do punog sata ili polovine sata, uradi proveru da li treba da se pojavi neki join
      if (sada.getMinutes() >= 15 && sada.getMinutes() <= 30) {
        sada.setMinutes(30);
        sada.setSeconds(0);
        this.flag15 = true;
      }
      else {
        sada.setHours(sada.getHours() + 1)
        sada.setMinutes(0);
        sada.setSeconds(0);
        this.flag45 = true;
      }

      this.casoviNastavnikaSaUcenikom.forEach(c => {
        let datumIzNiza = new Date(c.datum_i_vreme);
        if (sada.getFullYear() === datumIzNiza.getFullYear() &&
          sada.getMonth() === datumIzNiza.getMonth() &&
          sada.getDate() === datumIzNiza.getDate() &&
          sada.getHours() === datumIzNiza.getHours() &&
          sada.getMinutes() === datumIzNiza.getMinutes() &&
          sada.getSeconds() === datumIzNiza.getSeconds()) {
          this.nasser.setCasoviStatus(c._id, "start").subscribe((resp: string) => {
            if (resp != null) {
              c.status = "start";
            }
          });
        }
      });

    } else if ((sada.getMinutes() >= 0 && sada.getMinutes() <= 15 && this.flag45 == true)
      || (sada.getMinutes() >= 30 && sada.getMinutes() <= 45 && this.flag15 == true)) {
      if (sada.getMinutes() >= 0 && sada.getMinutes() <= 15) {
        this.flag45 = false;
      } else {
        this.flag15 = false;
      }

    }
  }

  checkFinish() {
    let sada = new Date();

    if (sada.getMinutes() >= 0 && sada.getMinutes() < 30 && this.flag00 == false) {
      this.flag00 = true;
      this.flag30 = false;

      this.casoviNastavnikaSaUcenikom.forEach(c => {
        let datumIzNiza = new Date(c.datum_i_vreme);
        // postavi sat (ili 2) vremena unapred kada bi se cas zavrsio
        if (c.trajanje == "2 hours") {
          datumIzNiza.setHours(datumIzNiza.getHours() + 2);
        } else {
          datumIzNiza.setHours(datumIzNiza.getHours() + 1);
        }
        // znaci ako je prosao 
        if (sada >= datumIzNiza) {
          this.nasser.setCasoviStatus(c._id, "finished").subscribe((resp: string) => {
            if (resp != null) {
              c.status = "finished";
            }
          });
        }
      });

    } else if (sada.getMinutes() >= 30 && this.flag30 == false) {
      this.flag00 = false;
      this.flag30 = true;

      this.casoviNastavnikaSaUcenikom.forEach(c => {
        let datumIzNiza = new Date(c.datum_i_vreme);
        // postavi sat (ili 2 sata) vremena unapred kada bi se cas zavrsio
        if (c.trajanje == "2 hours") {
          datumIzNiza.setHours(datumIzNiza.getHours() + 2);
        } else {
          datumIzNiza.setHours(datumIzNiza.getHours() + 1);
        }
        // znaci ako je prosao 
        if (sada > datumIzNiza) {
          this.nasser.setCasoviStatus(c._id, "finished").subscribe((resp: string) => {
            if (resp != null) {
              c.status = "finished";
            }
          });
        }
      });
    }
  }

  join(id) {
    this.nasser.setCasoviStatus(id, "started").subscribe((resp: string) => {
      if (resp != null) {
        this.casoviNastavnikaSaUcenikom.forEach(cnsu => {
          if (cnsu._id == id) {
            cnsu.status = "started"
          }
        });
      }
    })
  }

  finish(id) {
    this.nasser.setCasoviStatus(id, "finished").subscribe((resp: string) => {
      if (resp != null) {
        this.casoviNastavnikaSaUcenikom.forEach(cnsu => {
          if (cnsu._id == id) {
            cnsu.status = "finished"
          }
        });
        this.toggleCasovi();
      }
    })
  }

  // Dosijei ucenika

  getUceniciNastavnika(casovi) {

    let setUcenika: Set<String> = new Set;

    casovi.forEach(cas => {
      if (cas.status == "finished") {
        setUcenika.add(cas.kor_ime_ucenika);
      }
    });

    // nakon prosle for petlje imas set ucenika kojima je ovaj nastavnik predavao casove
    // sada ubaci sve te ucenike da bi uzimao njihove dosijee

    let sviUcenici: Ucenik[] = JSON.parse(localStorage.getItem("sviUcenici"));
    sviUcenici.forEach(ucenik => {
      // ako u onom setu postoji korisnicko ime tog ucenika ubaci ga u niz
      if (setUcenika.has(ucenik.kor_ime)) {
        // ubaci ga u glavni niz ucenika kojima je nastavnik predavao
        this.uceniciNastavnika.push(ucenik);

      }
    });

  }

  dosijeFlag: boolean = false;
  dosijeUcenik: Ucenik;

  dosije(kor_ime) {
    this.casoviUcenikaDosije = [];
    this.setPredmetaDosije = new Set;
    this.setDatumaDosije = new Set;
    this.mapaPredmetDatumDosije = new Map;
    this.dosijeFlag = true;

    // uhvati ucenika za koga je kliknut dosije
    for (let i = 0; i < this.uceniciNastavnika.length; i++) {
      if (kor_ime == this.uceniciNastavnika[i].kor_ime) {
        this.dosijeUcenik = this.uceniciNastavnika[i];
        break;
      }
    }

    this.casoviUcenika.forEach(cu => {
      if (kor_ime == cu.kor_ime_ucenika) {
        let sati;
        let datumDo = new Date(cu.datum_i_vreme);
        if (cu.trajanje == "2 hours") {
          sati = 2;
        } else {
          sati = 1;
        }
        datumDo.setHours(datumDo.getHours() + sati);
        let data: CasSaNastavnikom = {
          _id: cu._id,
          kor_ime_nastavnika: cu.kor_ime_nastavnika,
          kor_ime_ucenika: cu.kor_ime_ucenika,
          naziv_predmeta: cu.naziv_predmeta,
          datum_i_vreme: cu.datum_i_vreme,
          deskripcija: cu.deskripcija,
          status: cu.status,
          trajanje: cu.trajanje,
          nastavnik: null,
          datum: cu.datum_i_vreme.toString().substring(0, 10),
          vremeOd: cu.datum_i_vreme.toString().substring(11, 16),
          vremeDo: datumDo.toString().substring(16, 21)
        }
        this.casoviUcenikaDosije.push(data);
      }
    });
    this.casoviUcenikaDosije.sort(this.sortDatumi)
    // casoviUcenikaDosije - ovde imamo casove ucenika za koga je kliknuto dugme dosije

    this.casoviUcenikaDosije.forEach(cud => {
      this.setPredmetaDosije.add(cud.naziv_predmeta);
    });

    this.setPredmetaDosije.forEach(setpd => {
      this.setDatumaDosije = new Set;
      this.casoviUcenikaDosije.forEach(cud => {
        if (setpd == cud.naziv_predmeta) {
          this.setDatumaDosije.add(cud.datum);
        }
      });
      if (this.setDatumaDosije.size > 0) {
        this.mapaPredmetDatumDosije[setpd] = this.setDatumaDosije;
      }
    });

  }

  // LOGOUT

  logout() {
    this.korser.logout();
  }

}
