import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import "materialize-css";
import { AppComponent } from './app.component';
import { FacebookService } from './services/facebook.service';
import { FbconnectComponentComponent } from './components/fbconnect-component/fbconnect-component.component';


@NgModule({
  declarations: [
    AppComponent,
    FbconnectComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
