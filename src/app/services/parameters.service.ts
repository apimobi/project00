import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ParametersService implements OnInit {


  public currentPageId:number = 1;
  public nextPageId:number = 1;
  public currentPage:any;
  
  constructor() { }

  ngOnInit() {
     
  }

  public getParameter(str:string):any
  {
      return this[str];
  }

  public setCurrentPageId(id:number):void
  {
      this.currentPageId = id
  }

  public setNexPageId(id:number):void
  {
      this.nextPageId = id
  }

  public setCurrentPage(page:any):void
  {
      this.currentPage = page;
  }

  public getCurrentPage():any
  {
      return this.currentPage;
  }
}
