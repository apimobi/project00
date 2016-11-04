import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbconnectComponentComponent } from './components/fbconnect-component/fbconnect-component.component';
import { HomePage } from './components/home-page/home-page.component'
import { NavComponent } from './components/nav/nav.component';
import { Calendar } from './components/calendar/calendar.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'connect', component: FbconnectComponentComponent },
  { path: 'calendar', component: Calendar }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}