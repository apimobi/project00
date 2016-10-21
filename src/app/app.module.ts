import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import "materialize-css";

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { FacebookService } from './services/facebook.service';
import { ParametersService } from './services/parameters.service';
import { FbconnectComponentComponent } from './components/fbconnect-component/fbconnect-component.component';
import { NavComponent } from './components/nav/nav.component';
import { Calendar } from './components/calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    FbconnectComponentComponent,
    NavComponent,
    Calendar
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule    
  ],
  providers: [
    FacebookService,
    DataService,
    ParametersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
