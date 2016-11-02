import { 
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild,
  ElementRef
 } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';
import { DataService } from '../../services/data.service';
import { CalendarEvent } from '../../model/calendar-event';


@Component({
  // moduleId: module.id,
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
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


export class Calendar implements OnInit {

  @ViewChild('overlay4') overlay4: ElementRef

  translation : string = 'left';
  pageId:number = 1;
  calendarEvents:CalendarEvent[] = [];
  today:Date;
  days:Array<Object> = [];
  month:string;
  year:number;
  lastDayMonth:number;
  tab_month:Array<String> = ['January', 'February',  'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  week0:Array<Object> = [];
  week1:Array<Object> = [];
  week2:Array<Object> = [];
  week3:Array<Object> = [];
  week4:Array<Object> = [];
  week5:Array<Object> = [];
  totalCols:number = 5;
  idMonth:number = 0;
  currentEvent:CalendarEvent = null;


  constructor(
    private dataService:DataService,
    private parametersService: ParametersService
    ) {

   }

  ngOnInit() {
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
     console.log('Calendar '+this.translation);
     this.parametersService.setCurrentPageId(this.pageId);
     this.calendarEvents =  this.dataService.getEvents(); 
     this.initCalendar('2016/10/01');
  }

  public setTransition(str:string):void
  {
      this.translation = str;
  }

  public nextMonth()
  {  
      this.idMonth ++;
      let today = new Date();
      let goToMonth:number = today.getMonth() + this.idMonth;

      this.updateCalendar(goToMonth);
      
  }

  public prevMonth()
  {  
      this.idMonth --;
      let today = new Date();
      let goToMonth:number = today.getMonth() + this.idMonth;

      this.updateCalendar(goToMonth);
      
  }

  public showEvent(id, week)
  {
      console.log('showEvent '+id);
      this.currentEvent = this[week][id];
  }

  public hideEvent()
  {
      console.log('hideEvent ');
      this.currentEvent = null;
  }


  initCalendar(updateDate)
  {
      this.days = [];

      this.today = new Date(updateDate);
      this.month = ""+this.tab_month[this.today.getMonth()];
      this.year = this.today.getFullYear();

      var lastd;
      var firstd;

      firstd = new Date(this.year.valueOf(), this.today.getMonth(), 1);

      console.log(firstd.getDay());
      console.log(firstd.getDate());
      console.log(this.tab_month[firstd.getMonth()]);

      var diff = firstd.getDay();
      var d : any = {};
      var i :number = 0;
      if(diff!= 1)
      {
        lastd = new Date(this.year.valueOf(), this.today.getMonth(), 0);
        this.lastDayMonth = lastd.getDate();
        console.log('this.lastDayMonth '+lastd.getDate());
        console.log('this.lastDayMonth '+lastd.getMonth());
        console.log('this.lastDayMonth '+lastd.getYear());

        let start_date:number = this.lastDayMonth-diff+2;

        if(diff == 0) start_date = this.lastDayMonth-5;

        for(i=start_date; i<=this.lastDayMonth; i++)
        {
          d = {};
          
          var date =  new Date(this.year.valueOf(), this.today.getMonth()-1, i);
          console.log(">>>> day "+date.getDate()+" i "+i);
          d.day = date.getDay();
          d.date = date.getDate();
          d.month = this.tab_month[date.getMonth()];
          d.year = date.getFullYear();
          this.days.push(d);
        }
      }

      i = 1;
      lastd = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
      this.lastDayMonth = lastd.getDate();
      for(i=1; i<=this.lastDayMonth; i++)
      {
        d = {};
        // product.destinations = [];
        var date =  new Date(this.year.valueOf(), this.today.getMonth(), i);
        d.day = date.getDay();
        d.date = date.getDate();
        d.month = this.tab_month[date.getMonth()];
        d.year = date.getFullYear();
        
        if(i < this.calendarEvents.length)
        {
           d.cover = this.calendarEvents[i].cover;
        }else{
           d.cover = "https://lh4.ggpht.com/wKrDLLmmxjfRG2-E-k5L5BUuHWpCOe4lWRF7oVs1Gzdn5e5yvr8fj-ORTlBF43U47yI=w300-rw";
        }
        this.days.push(d);
      }

    this.orderByWeek(this.days);

    console.log("days : "+ this.days[0]['date']);

  }

  orderByWeek(data)
  {
     this.week0 = [];
     this.week1 = [];
     this.week2 = [];
     this.week3 = [];
     this.week4 = [];
     this.week5 = [];
     
     let max:number = data.length;
     var idWeek:number = 0;
     
     for(let i=0; i<=max; i++)
      {
          if(i%7 == 0 && i!=0)
          {
            idWeek++;
          }
          if(data[i])this['week'+idWeek].push(data[i]);
      }

      this.totalCols = 6;
      if(this.week5.length == 0) this.totalCols = 5;
      if(this.week4.length == 0) this.totalCols = 4;

      console.log('this.week5.length : '+this.week5);
      console.log('this.totalCols : '+this.totalCols);
      
  }

  updateCalendar(id)
  {
     console.log('ouiiiiiiiiii '+id);
     this.initCalendar('2016/'+(id)+'/1');
  }


}
