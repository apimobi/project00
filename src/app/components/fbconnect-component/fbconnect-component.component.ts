import { 
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild,
  ElementRef } from '@angular/core';
import { FacebookService } from '../../services/facebook.service';
import { CalendarEvent } from '../../model/calendar-event';
import { DataService } from '../../services/data.service';
import { ParametersService } from '../../services/parameters.service';


@Component({
  selector: 'app-fbconnect-component',
  templateUrl: './fbconnect-component.component.html',
  styleUrls: ['./fbconnect-component.component.css'],
  host: {
      '[@inOut]': 'translation',
      '[style.display]': "'block'",
      '[style.position]': "'absolute'",
      '[style.width]': "'100%'"
    },
    animations: [
      trigger('inOut', [
        state('void', style({transform: 'translateX(-100%)', opacity: 0 })),
        state('right', style({transform: 'translateX(0)', opacity: 1})),
        state('left', style({transform: 'translateX(0)', opacity: 1})),
        transition('void => left', [
          style({transform: 'translateX(-100%)', opacity: 1}),
          animate(1000)
        ]),
        transition('void => right', [
          style({transform: 'translateX(100%)', opacity: 0.5}),
          animate(1000)
        ]),
        transition('right => void', animate(1000, style({transform: 'translateX(100%)', opacity: 0}))),
        transition('left => void', animate(1000, style({transform: 'translateX(-100%)', opacity: 0})))
      ])
    ]
})
export class FbconnectComponentComponent implements OnInit {

  calendarEvents:CalendarEvent[] = [];
  loaded:boolean = false;
  firstEvent:CalendarEvent;
  translation : string = 'left';
  pageId:number = 2;
  fb:FacebookService;
  public connectEnable = "";
  public loadEnable = "disabled";
  public calendarEnable = "disabled";

  constructor(
        private dataService:DataService,
        private parametersService: ParametersService
            ) {
     if(this.pageId > this.parametersService.getParameter('currentPageId')) 
     {
       if(this.parametersService.getCurrentPage())
       {
          this.parametersService.getCurrentPage().setTransition('left');
       }  
       this.translation = 'right';
     }else{
       if(this.parametersService.getCurrentPage())
       {
          this.parametersService.getCurrentPage().setTransition('right');
       }   
       this.translation = 'left';
     }       
     
   }

  ngOnInit() {
     console.log('Fb connect '+this.translation);
     this.parametersService.setCurrentPageId(this.pageId);
     this.parametersService.setCurrentPage(this); 
  }

  ngOnDestroy() {
     console.log('Destroy Fb connect '+this.translation);
     
  }



  connectMe()
  {
     this.fb = new FacebookService();
     this.fb.logMe(this.showData);
  }

  public showData = (data) => {
    console.log("data : ");
    this.calendarEvents = [];
    for (var key in data) {
       this.calendarEvents.push( new CalendarEvent(data[key]));
    }

    this.dataService.saveEvents(this.calendarEvents);

    this.connectEnable = "disabled";
    this.calendarEnable = "";
    // console.log(">>>>>"+this.calendarEvents[10].name); 
    
  }

  loadFBCover()
  {
    this.fb.getEvent(532899443574151, this.callBackEvent);
  }

  public callBackEvent(response)
  {
     this.loadEnable = "disabled";
     this.calendarEnable = "";
     console.log(" okkkk "+response);
  }

  public setTransition(str:string):void
  {
      this.translation = str;
      console.log('setTransition Fb connect '+this.translation); 
  }

}
