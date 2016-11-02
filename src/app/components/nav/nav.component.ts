import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isCollapsed:boolean = true;
  private width;
  private height;
  public navClass = "navClosed";

  constructor(private router: Router,) {

  }

  ngOnInit() {
    
  }

  goTo(page){
      this.router.navigate(['/'+page]);
      this.showMenu();
  }

  showMenu()
  {
      if(this.navClass == "navOpen"){
          this.navClass = "navClosed";
      }else{
          this.navClass = "navOpen";
      }
  }

}
