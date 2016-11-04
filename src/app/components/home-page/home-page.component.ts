import { 
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate
 } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';
import { FacebookService } from '../../services/facebook.service';



@Component({
  //moduleId: module.id,
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css'],
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
export class HomePage implements OnInit {

  translation : string = 'left';
  pageId:number = 0;
  
  // constructor(private fbService:FacebookService) { }
  constructor(
    private parametersService: ParametersService,
    private fbService: FacebookService,
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
     
     console.log('HomePage '+this.translation);
     this.parametersService.setCurrentPageId(this.pageId); 
     this.parametersService.setCurrentPage(this); 
     this.fbService.checkStatus();

     
  }

  ngOnDestroy() {
     console.log('HomePage '+this.translation);
     
  }

  public setTransition(str:string):void
  {
      console.log('setTransition HomePage '+this.translation);  
      this.translation = str;
  }


}
