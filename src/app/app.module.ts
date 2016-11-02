import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { FacebookService } from './services/facebook.service';
import { ParametersService } from './services/parameters.service';
import { FbconnectComponentComponent } from './components/fbconnect-component/fbconnect-component.component';
import { NavComponent } from './components/nav/nav.component';
import { Calendar } from './components/calendar/calendar.component';
import { HomePage } from './components/home-page/home-page.component'

import { AppRoutingModule }     from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    FbconnectComponentComponent,
    NavComponent,
    Calendar,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule ,
    AppRoutingModule
  ],
  providers: [
    FacebookService,
    DataService,
    ParametersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
