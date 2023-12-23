import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    AdminPocetnaComponent,
    UcenikComponent,
    NastavnikComponent,
    AdminComponent,
    RegisterComponent,
    PromenaLozinkeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
