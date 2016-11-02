import { 
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
 } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';

@Component({
  //moduleId: module.id,
  selector: 'app-page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css'],
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
export class PageNotFound implements OnInit {

  translation : string = 'left';
  pageId:number = 3;
  
  // constructor(private fbService:FacebookService) { }
  constructor(
    private parametersService: ParametersService
    ) {   
      this.parametersService.setCurrentPage(this);
   }

  ngOnInit() {
     
     if(this.pageId > this.parametersService.getParameter('currentPageId')) this.translation = 'right';
     else this.translation = 'left';
     console.log('PageNotFound '+this.translation);
     this.parametersService.setCurrentPageId(this.pageId);  
     
  }

  public setTransition(str:string):void
  {
      this.translation = str;
  }

}
