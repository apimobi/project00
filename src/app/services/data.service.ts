import { Injectable, OnInit } from '@angular/core';
import { CalendarEvent } from '../model/calendar-event';

declare const PouchDB:any;


@Injectable()
export class DataService implements OnInit {

  private db:any;
  private remoteCouch:boolean;
  private calendarEvents:CalendarEvent[] = [];


  constructor() { 
     this.db = new PouchDB('todos');
     this.remoteCouch = false;
  }

  ngOnInit() {
     
  }

  public postElt(elt:Object)
  {
    this.db.put(elt, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }

  public getElt(id)
  {
    this.db.get(id).then(function (doc) {
      return doc;
    }).error( function(err){
      return err;
    });
  }

  public getAllElts():Promise<CalendarEvent> {
    
    return this.db.allDocs({include_docs: true, descending: true});//, function(err, doc) {
      // console.log(doc.rows);
      // return doc.rows;
      
      // for (var key in doc.rows) {
      //         console.log("key :"+key);
      //         console.log("> :"+doc.rows[key].doc.title);
      // }  
    // });
  }


  showFirstDoc()
  {
    this.db.get('2016-08-08T10:06:39.520Z').then(function (doc) {
      console.log(doc);
    });
  }

  saveEvents(data):void
  {
    this.calendarEvents = data;
  }

  getEvents():CalendarEvent[]
  {
    return this.calendarEvents;
  }


}
