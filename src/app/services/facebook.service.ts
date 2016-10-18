import { Injectable, OnInit } from '@angular/core';

declare const FB:any;


@Injectable()
export class FacebookService implements OnInit {

  public _self = this;
  callBackData:Function;
  
  constructor() { 
    // FB.getLoginStatus(response => {
    //         console.log(" >>>>>>>  getLoginStatus");
    //         this.statusChangeCallback(response);
    //     });
    
    FB.init({
            appId      : '1058892964177610',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
    });
    console.log('prout');
  }

  ngOnInit() {
     
  }

 public logMe(callBack:Function){

    this.callBackData = callBack;
    FB.login(this.callBackLogin,
                {scope: 'public_profile,email,user_likes,user_friends,user_events,user_location,rsvp_event'});    
    console.log('nooooooooooooooooo');
  }

 public callBackLogin = (resp) => {
    console.log("callBackLogin"+resp);
    for (var key in resp) {
      console.log("key :"+key);
      console.log("> :"+resp[key]);
      if(key == "authResponse")
      {
         for (var elt in resp[key]) {
            console.log("--key :"+elt);  
            console.log("-- :"+resp[key][elt]);
         }  
      }
      
    }

    var reference = this._self;
    console.log(" okkk :"+this._self);
    
    if(resp["status"] == "connected"){
      console.log("get events");
      FB.api(
          "/"+resp["authResponse"]["userID"]+"/events?fields=id,name,cover,photos,start_time,end_time", 
            function(response){
                reference.testEvents(response);
            }
       );
    }
 }

 public testEvents (response)
 {
      console.log("!!!!!!!!!!!!!!!!!!!!!handleUserEvents");
      // 
      let tabEvents = [];
      if (response && !response.error) {
           for (var key in response.data) {
              // console.log("key :"+key);
              // console.log("> :"+response.data[key].description);
              // console.log("> start :"+response.data[key].start_time);
              tabEvents.push(response.data[key]);
           }   
      }
      this.callBackData(tabEvents); 
     
 }

 public getEvent(id, callBackFunction)
 {
    FB.api(
        "/10154034010888439",
        function (response) {
          if (response && !response.error) {
            console.log("event : "+response);
            for (var key in response) {
                console.log("key : "+key+" : "+response[key]);
            }
          }
        }
     );
  }
}
