import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../../services/facebook.service';
import { CalendarEvent } from '../../model/calendar-event';
import { DataService } from '../../services/data.service';
import { ParametersService } from '../../services/parameters.service';


@Component({
  selector: 'app-fbconnect-component',
  templateUrl: './fbconnect-component.component.html',
  styleUrls: ['./fbconnect-component.component.css']
})
export class FbconnectComponentComponent implements OnInit {

  calendarEvents:CalendarEvent[] = [];
  loaded:boolean = false;
  firstEvent:CalendarEvent;
  translation : string = 'left';
  pageId:number = 2;
  fb:FacebookService;

  constructor(
        private dataService:DataService,
        private parametersService: ParametersService
            ) {
      this.parametersService.setCurrentPage(this);
   }

  ngOnInit() {
  }

  connectMe()
  {
     this.fb = new FacebookService();
     this.fb.logMe(this.showData);
  }

  public showData = (data) => {
    console.log("data : ");
    // this.calendarEvents = [];
    for (var key in data) {
       this.calendarEvents.push( new CalendarEvent(data[key]));
    }

    this.dataService.saveEvents(this.calendarEvents);
    // console.log(">>>>>"+this.calendarEvents[10].name); 
    
  }

}
