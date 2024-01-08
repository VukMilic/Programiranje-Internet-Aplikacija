import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { AdminComponent } from './admin/admin.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { RegisterComponent } from './register/register.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { NastavnikDetaljiComponent } from './nastavnik-detalji/nastavnik-detalji.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'adminPocetna', component: AdminPocetnaComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'ucenik', component: UcenikComponent},
  {path: 'nastavnik', component: NastavnikComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'promenaLozinke', component: PromenaLozinkeComponent},
  {path: 'nastavnik-detalji/:kor_ime', component: NastavnikDetaljiComponent},
  {path: 'nastavnik/:casovi', component: NastavnikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
