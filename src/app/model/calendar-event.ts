export class CalendarEvent {

  _id: string;
  fbId:number;
  name: string;
  completed: boolean;
  _rev:string;
  date:Date;
  start_time:Date;
  end_time:Date;
  cover:string;


  constructor(data:any)
  {
    //   this._id = data._id;
      this.name = data.name;
    //   this.completed = data.completed;
      this.start_time = new Date(data.start_time);
      console.log(data);
      // this.end_time = new Date(data.end_time);
      if(data.cover)
      {
         this.cover = data.cover.source;
      }else{
         this.cover = "https://lh4.ggpht.com/wKrDLLmmxjfRG2-E-k5L5BUuHWpCOe4lWRF7oVs1Gzdn5e5yvr8fj-ORTlBF43U47yI=w300-rw"; 
      }
      
  }
}
